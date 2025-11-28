<?php

namespace Database\Seeders;

use App\Models\RequestType;
use Illuminate\Database\Seeder;

class RequestTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $requestTypes = [
            [
                'key' => 'quotation',
                'name' => 'Cotação',
                'description' => 'Solicitação de cotação de seguro',
            ],
            [
                'key' => 'document_copy',
                'name' => '2ª Via de Documento/Posição Financeira',
                'description' => 'Solicitação de segunda via de documento ou posição financeira',
            ],
            [
                'key' => 'financial_regularization',
                'name' => 'Financeiro Regularização',
                'description' => 'Solicitação de regularização financeira',
            ],
            [
                'key' => 'claim_notice',
                'name' => 'Aviso de Sinistro',
                'description' => 'Solicitação de aviso de sinistro',
            ],
            [
                'key' => 'renewal',
                'name' => 'Renovação',
                'description' => 'Solicitação de renovação de apólice',
            ],
        ];

        foreach ($requestTypes as $type) {
            RequestType::firstOrCreate(
                ['key' => $type['key']],
                $type
            );
        }
    }
}
