<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class DubenController extends Controller
{
    /**
     * Display the main form page.
     */
    public function index(): Response|ResponseFactory
    {
        $htmlPath = public_path('duben/index.html');

        if (!file_exists($htmlPath)) {
            abort(404, 'Page not found');
        }

        $html = file_get_contents($htmlPath);

        // Ajustar caminhos dos assets para funcionar com Laravel
        $html = str_replace('./css/', '/duben/css/', $html);
        $html = str_replace('./js/', '/duben/js/', $html);
        $html = str_replace('./img/', '/duben/img/', $html);
        $html = str_replace('./data/', '/duben/data/', $html);

        // Adicionar token CSRF no head para uso em requisições AJAX
        $csrfToken = csrf_token();
        $csrfMeta = "<meta name=\"csrf-token\" content=\"{$csrfToken}\">";
        $html = str_replace('</head>', "{$csrfMeta}\n    </head>", $html);

        // Adicionar script para configurar axios/fetch com CSRF token
        $csrfScript = "
    <script>
        // Configurar token CSRF para requisições fetch
        const csrfToken = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content');
        const originalFetch = window.fetch;
        window.fetch = function(url, options = {}) {
            if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
                options.headers = options.headers || {};
                if (!(options.body instanceof FormData)) {
                    options.headers['X-CSRF-TOKEN'] = csrfToken;
                    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
                } else {
                    // Para FormData, adicionar como campo
                    options.body.append('_token', csrfToken);
                }
            }
            return originalFetch(url, options);
        };

        // Processar query params para iniciar o formulário automaticamente
        (function() {
            const urlParams = new URLSearchParams(window.location.search);
            const tipoSolicitante = urlParams.get('tipoSolicitante');

            if (tipoSolicitante && ['colaborador', 'estipulante', 'segurado'].includes(tipoSolicitante)) {
                // Aguardar o DOM estar pronto e o formulário estar inicializado
                document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                        const tipoSolicitanteSelect = document.getElementById('tipoSolicitante');
                        if (tipoSolicitanteSelect && typeof iniciarFluxo === 'function') {
                            tipoSolicitanteSelect.value = tipoSolicitante;
                            iniciarFluxo(tipoSolicitante);
                        }
                    }, 100);
                });
            }
        })();
    </script>";
        $html = str_replace('</body>', "{$csrfScript}\n  </body>", $html);

        return response($html)->header('Content-Type', 'text/html');
    }

    /**
     * Consulta placa via API externa.
     */
    public function consultaPlaca(Request $request): JsonResponse
    {
        $request->validate([
            'placa' => 'required|string',
        ]);

        $placa = $request->get('placa');
        $email = env('CONSULTA_PLACA_EMAIL');
        $apiKey = env('CONSULTA_PLACA_TOKEN');

        if (!$email || !$apiKey) {
            return response()->json([
                'error' => 'Configuração da API não encontrada'
            ], 500);
        }

        try {
            $basic = base64_encode("{$email}:{$apiKey}");
            $url = "https://api.consultarplaca.com.br/v2/consultarPlaca?placa=" . urlencode($placa);

            $response = Http::withHeaders([
                'Authorization' => "Basic {$basic}",
                'Accept' => 'application/json',
            ])->get($url);

            $contentType = $response->header('Content-Type', '');

            if (str_contains($contentType, 'application/json')) {
                return response()->json($response->json(), $response->status());
            }

            return response($response->body(), $response->status())
                ->header('Content-Type', $contentType);

        } catch (\Exception $e) {
            \Log::error('Erro ao consultar placa: ' . $e->getMessage());
            return response()->json([
                'error' => 'Falha ao consultar serviço externo'
            ], 502);
        }
    }

    /**
     * Submit form data to external URL.
     */
    public function submitForm(Request $request): JsonResponse
    {
        $targetUrl = env('DUBEN_TARGET_URL');

        if (!$targetUrl) {
            return response()->json([
                'error' => 'URL de destino não configurada'
            ], 500);
        }

        try {
            $payload = $request->except(['_token', '_method']);

            // Processar arquivos se houver
            $files = $request->allFiles();
            $byField = [];

            foreach ($files as $fieldName => $file) {
                if (is_array($file)) {
                    foreach ($file as $f) {
                        $this->processFile($f, $fieldName, $byField);
                    }
                } else {
                    $this->processFile($file, $fieldName, $byField);
                }
            }

            // Substituir campos de arquivo no payload
            foreach ($byField as $field => $value) {
                unset($payload[$field]);
                $payload[$field] = $value;
            }

            \Log::info('Encaminhando payload para: ' . $targetUrl, $payload);

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($targetUrl, $payload);

            $contentType = $response->header('Content-Type', '');

            if (str_contains($contentType, 'application/json')) {
                return response()->json($response->json(), $response->status());
            }

            return response($response->body(), $response->status())
                ->header('Content-Type', $contentType);

        } catch (\Exception $e) {
            \Log::error('Erro ao encaminhar formulário: ' . $e->getMessage());
            return response()->json([
                'error' => 'Erro interno do servidor ao processar formulário.'
            ], 500);
        }
    }

    /**
     * Process uploaded file.
     */
    private function processFile($file, string $fieldName, array &$byField): void
    {
        $cleanFileName = \Str::ascii($file->getClientOriginalName());
        $cleanFileName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $cleanFileName);

        $fileContent = base64_encode(file_get_contents($file->getRealPath()));

        $asObj = [
            'filename' => $cleanFileName,
            'contentType' => $file->getMimeType() ?? 'application/octet-stream',
            'content' => $fileContent,
        ];

        if (!isset($byField[$fieldName])) {
            $byField[$fieldName] = $asObj;
        } elseif (is_array($byField[$fieldName])) {
            $byField[$fieldName][] = $asObj;
        } else {
            $byField[$fieldName] = [$byField[$fieldName], $asObj];
        }
    }
}
