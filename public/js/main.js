function validateStep(step) {
  const currentStepElement = document.querySelector(
    `.form-step[data-step="${step}"]`,
  );
  if (!currentStepElement) return true;

  const inputs = currentStepElement.querySelectorAll(
    'input[required], select[required], textarea[required]',
  );
  let isValid = true;

  inputs.forEach(input => {
    let fieldValid = input.checkValidity();

    // --- Início das Validações Customizadas ---
    if (input.value) {
      // Só valida se houver valor

      // Validação de Email
      if (input.id === 'solEmail' && !isValidEmail(input.value)) {
        fieldValid = false;
      }

      // Validação de Placa
      if (
        (input.id === 'veiPlaca' ||
          input.id === 'endossoVeiculoPlacaAtual' ||
          input.id === 'endossoVeiculoPlacaNova') &&
        !/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(input.value.toUpperCase())
      ) {
        fieldValid = false;
      }

      // --- Validações de Documentos ---

      // Campo condicional: CPF ou CNPJ dependendo do tipo de pessoa
      if (input.id === 'seguradoDocumento') {
        const tipoPessoa = currentStepElement.querySelector(
          '#seguradoTipoPessoa',
        )?.value;
        if (tipoPessoa === 'pf' && !validaCPF(input.value)) {
          fieldValid = false;
        } else if (tipoPessoa === 'pj' && !validaCNPJ(input.value)) {
          fieldValid = false;
        }
      }

      // Campos que podem ser CPF ou CNPJ (detecção automática)
      if (
        input.id === 'endossoDocumento' ||
        input.id === 'segundaViaDocumento' ||
        input.id === 'finRegDocumento'
      ) {
        if (
          !(onlyDigits(input.value).length <= 11
            ? validaCPF(input.value)
            : validaCNPJ(input.value))
        ) {
          fieldValid = false;
        }
      }

      // Campos que são sempre CPF
      if (
        [
          'segCPF',
          'seguradoPPECPF',
          'aux1CPF',
          'aux2CPF',
          'endossoCondutor1CPF',
          'endossoCondutor2CPF',
        ].includes(input.id)
      ) {
        if (!validaCPF(input.value)) {
          fieldValid = false;
        }
      }

      // Campos que são sempre CNPJ
      if (['cnpj', 'segCNPJ'].includes(input.id)) {
        if (!validaCNPJ(input.value)) {
          fieldValid = false;
        }
      }
    }
    // --- Fim das Validações Customizadas ---

    if (!fieldValid) {
      console.log('Campo inválido encontrado:', {
        id: input.id,
        element: input,
        required: input.required,
        visible: input.offsetParent !== null,
      });
      isValid = false;
    }
    input.classList.toggle('is-invalid', !fieldValid);
  });

  // Validação especial para a etapa 'solicitante' (colaborador)
  if (activeSteps[step]?.template === 'solicitante') {
    const codigoInput = document.getElementById('colaboradorCodigo');
    const colaborador = colaboradoresData.find(
      c => c.codigo.toUpperCase() === codigoInput.value.trim().toUpperCase(),
    );

    if (!colaborador) {
      isValid = false;
      codigoInput.classList.add('is-invalid');
      // Also clear the name field in case user corrected a valid code to an invalid one
      document.getElementById('estipNome').value = '';
      document.getElementById('colaboradorNomeDisplay').textContent = '';
    } else {
      // It's valid, ensure fields are correctly populated before proceeding
      document.getElementById('estipNome').value = colaborador.name;
      document.getElementById('colaboradorNomeDisplay').textContent =
        `Olá, ${colaborador.name}!`;
      codigoInput.classList.remove('is-invalid');
    }
  }

  // Validação especial para a etapa 'estipulante'
  if (activeSteps[step]?.template === 'estipulante') {
    const resultadoDiv = document.getElementById('resultadoEstipulante');
    if (!resultadoDiv.querySelector('select')) {
      isValid = false;
      const cnpjInput = document.getElementById('cnpj');
      if (cnpjInput) {
        cnpjInput.classList.add('is-invalid');
      }
      resultadoDiv.innerHTML = `<div class="alert alert-danger">É necessário buscar e selecionar uma apólice válida para o estipulante.</div>`;
    }
  }

  return isValid;
}

function toggleConditionalField(show, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.style.display = show ? 'block' : 'none';
    const input = container.querySelector('input, select');
    if (input) {
      input.required = show;
    }
  }
}

function nextStep() {
  if (!validateStep(currentStep)) return;

  const currentStepConfig = activeSteps[currentStep];
  let needsDynamicRender = false;

  const estipuQuestion = document.getElementById('estipuQuestion')?.value;
  formDataStorage.estipuQuestion = estipuQuestion;

  // REFACTORED LOGIC: Directly look up the flow from the new config structure
  if (currentStepConfig.template === 'tipo_solicitacao_selecao') {
    needsDynamicRender = true;
    const tipoSolicitacao = document.getElementById('tipoSolicitacao').value;
    const tipoSolicitante = formDataStorage.tipoSolicitante;

    currentFluxo = tipoSolicitacao;
    formDataStorage.tipoSolicitacao = tipoSolicitacao;

    // Direct lookup using the new nested structure
    const flowConfig = fluxosConfig[tipoSolicitante]?.[tipoSolicitacao];

    if (flowConfig && flowConfig.steps) {
      // Replace the rest of the steps with the ones from the config
      activeSteps.splice(currentStep + 1, Infinity, ...flowConfig.steps);
    } else {
      // Fallback or error handling if a flow is not defined for the combination
      console.error(
        `Fluxo não definido para solicitante: ${tipoSolicitante} e solicitação: ${tipoSolicitacao}`,
      );
      // Clear subsequent steps to prevent unexpected behavior
      activeSteps.splice(currentStep + 1, Infinity);
    }
  } else if (currentFluxo === 'endosso') {
    let stepsToAdd = [];
    if (currentStepConfig.template === 'endosso_dados') {
      needsDynamicRender = true;
      const tipoEndosso = document.getElementById('endossoTipo').value;
      activeSteps.splice(currentStep + 1);

      if (tipoEndosso === 'substituicao_veiculo') {
        stepsToAdd.push({ label: 'Veículo', template: 'endosso_veiculo' });
      } else if (tipoEndosso === 'inclusao_condutor') {
        stepsToAdd.push({
          label: 'Condutores',
          template: 'endosso_qa_inicial',
        });
      } else if (tipoEndosso === 'alteracao_endereco') {
        stepsToAdd.push({
          label: 'Contato',
          template: 'endosso_alteracao_contato',
        });
      } else if (tipoEndosso === 'correcao_cadastral') {
        stepsToAdd.push({
          label: 'Correção',
          template: 'endosso_correcao_cadastral',
        });
      } else if (tipoEndosso === 'cancel_req') {
        stepsToAdd.push({ label: 'Carta', template: 'carta_cancelamento' });
      }

      stepsToAdd.push({ label: 'Enviar', template: 'enviar' });
      activeSteps.push(...stepsToAdd);
    } else if (currentStepConfig.template === 'endosso_qa_inicial') {
      needsDynamicRender = true;
      const qaInicial = document.getElementById('endossoQaInicial').value;
      activeSteps.splice(currentStep + 1);

      let proximaEtapaTemplate = '';
      switch (qaInicial) {
        case '0':
          proximaEtapaTemplate = 'endosso_acao_qa0';
          break;
        case '1':
          proximaEtapaTemplate = 'endosso_acao_qa1';
          break;
        case '2':
          proximaEtapaTemplate = 'endosso_acao_qa2';
          break;
      }
      if (proximaEtapaTemplate) {
        activeSteps.push({ label: 'Ação', template: proximaEtapaTemplate });
      }
    } else if (currentStepConfig.template.startsWith('endosso_acao_qa')) {
      needsDynamicRender = true;
      const acao = document.getElementById('endossoAcao').value;
      activeSteps.splice(currentStep + 1);

      const acoesRetirada1 = [
        'retirar_atual',
        'retirar_incluir_novo',
        'retirar_1_manter_1',
        'retirar_1_incluir_1',
      ];
      const acoesRetirada2 = [
        'retirar_2_ficar_sem',
        'retirar_2_incluir_1',
        'retirar_2_incluir_2',
      ];

      if (acoesRetirada1.includes(acao)) {
        stepsToAdd.push({
          label: 'Retirada',
          template: 'endosso_retirada_1_condutor',
        });
      } else if (acoesRetirada2.includes(acao)) {
        stepsToAdd.push({
          label: 'Retirada',
          template: 'endosso_retirada_2_condutores',
        });
      }

      if (
        [
          'add_1',
          'retirar_incluir_novo',
          'manter_add_outro',
          'retirar_1_incluir_1',
          'retirar_2_incluir_1',
        ].includes(acao)
      ) {
        stepsToAdd.push({
          label: 'Dados Condutor',
          template: 'endosso_dados_condutor_1',
        });
      } else if (['add_2', 'retirar_2_incluir_2'].includes(acao)) {
        stepsToAdd.push({
          label: 'Dados Condutores',
          template: 'endosso_dados_condutor_2',
        });
      }

      stepsToAdd.push({ label: 'Enviar', template: 'enviar' });
      activeSteps.push(...stepsToAdd);
    }
  }

  if (needsDynamicRender) {
    const formDataBeforeRender = {};
    const allInputs = document
      .getElementById('multiStepForm')
      .querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
      if (input.id) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          formDataBeforeRender[input.id] = input.checked;
        } else {
          formDataBeforeRender[input.id] = input.value;
        }
      }
    });

    renderForm();

    Object.keys(formDataBeforeRender).forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        const value = formDataBeforeRender[id];
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = value;
        } else {
          input.value = value;
        }
        // Trigger change event for selects to re-apply conditional logic
        if (input.tagName === 'SELECT') {
          const event = new Event('change');
          input.dispatchEvent(event);
        }
      }
    });
  }

  if (currentStep < activeSteps.length - 1) {
    currentStep++;
    updateProgress();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    updateProgress();
  }
}

let colaboradoresData = [];

async function fetchColaboradores() {
  try {
    const response = await fetch('./data/db.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    colaboradoresData = data.colaboradores || [];
  } catch (error) {
    console.error('Falha ao buscar dados dos colaboradores:', error);
    colaboradoresData = []; // Ensure it's an empty array on failure
  }
}

function handleColaboradorValidation() {
  const codigoInput = document.getElementById('colaboradorCodigo');
  if (!codigoInput) return;

  codigoInput.addEventListener('blur', () => {
    const codigo = codigoInput.value.trim().toUpperCase();
    const nomeDisplay = document.getElementById('colaboradorNomeDisplay');
    const nomeInput = document.getElementById('estipNome'); // The readonly input

    if (!nomeDisplay || !nomeInput) return;

    const colaborador = colaboradoresData.find(
      c => c.codigo.toUpperCase() === codigo,
    );

    if (colaborador) {
      nomeInput.value = colaborador.name;
      nomeDisplay.textContent = `Olá, ${colaborador.name}!`;
      codigoInput.classList.remove('is-invalid');
      codigoInput.classList.add('is-valid');
      nomeInput.classList.add('is-valid');
    } else {
      nomeInput.value = '';
      nomeDisplay.textContent = '';
      codigoInput.classList.add('is-invalid');
      codigoInput.classList.remove('is-valid');
      nomeInput.classList.remove('is-valid');
    }
  });
}

function resetForm() {
  document.getElementById('multiStepForm').reset(); // Resets form fields
  document.getElementById('successMessage').classList.remove('active');

  document.getElementById('initialStep').style.display = 'block';
  document.querySelector('.form-content').style.display = 'none';
  document.querySelector('.progress-container').innerHTML = '';

  // Reset the new initial dropdown
  const tipoSolicitanteSelect = document.getElementById('tipoSolicitante');
  if (tipoSolicitanteSelect) {
    tipoSolicitanteSelect.value = '';
  }

  document.getElementById('formDescription').textContent =
    'Selecione quem está solicitando para começar';

  // Reset state variables
  currentStep = 0;
  currentFluxo = '';
  activeSteps = [];
  formDataStorage = {};
}

// =================================================================
// 7. CHAMADA AO CSV DE ESTIPULANTES
// =================================================================

async function buscar() {
  let codigo = '';
  if (document.getElementById('codigo')) {
    codigo = document.getElementById('codigo').value;
  }

  const resultadoDiv = document.getElementById('resultadoEstipulante');

  if (!codigo) {
    resultadoDiv.innerHTML = `<div class="alert alert-warning">Digite um Código válido.</div>`;
    return;
  }

  resultadoDiv.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Buscando...</span></div>`;

  try {
    // 1. Buscar e processar ambos os CSVs em paralelo
    const [rcfResponse, appResponse] = await Promise.all([
      fetch('./data/estipulantes_rcf.csv').catch(e => e),
      fetch('./data/estipulantes_app.csv').catch(e => e),
    ]);

    let achados_rcf = [];
    let achados_app = [];
    let estipulanteNome = '';

    // Processa RCF
    if (rcfResponse.ok) {
      const texto_rcf = await rcfResponse.text();
      const csv_rcf = Papa.parse(texto_rcf, {
        header: true,
        skipEmptyLines: true,
      }).data;
      achados_rcf = csv_rcf.filter(l => l.codigo === codigo);
    } else {
      console.error('Falha ao carregar estipulantes_rcf');
    }

    // Processa APP
    if (appResponse.ok) {
      const texto_app = await appResponse.text();
      const csv_app = Papa.parse(texto_app, {
        header: true,
        skipEmptyLines: true,
        delimiter: ';',
      }).data;
      achados_app = csv_app.filter(l => l.codigo === codigo);
    } else {
      console.error('Falha ao carregar estipulantes_app');
    }

    if (achados_rcf.length === 0 && achados_app.length === 0) {
      resultadoDiv.innerHTML = `<div class="alert alert-danger">Estipulante não encontrado para o Código informado.</div>`;
      return;
    }

    // Pega o nome do estipulante de qualquer um dos resultados
    estipulanteNome =
      achados_rcf.length > 0
        ? achados_rcf[0].estipulante
        : achados_app[0].estipulante;

    let html = `
            <div class="row mb-3">
                <div class="col-12 col-sm-auto d-flex flex-wrap align-items-baseline">
                    <span class="fw-bold text-break">${estipulanteNome}</span>
                </div>
            </div>
        `;

    // Monta o dropdown de RCF
    if (achados_rcf.length > 0) {
      html += `
                <div class="mb-3">
                    <label for="rcf_policy_select" class="form-label"><strong>RCF - Dano Material (DM)</strong></label>
                    <select id="rcf_policy_select" class="form-select">
                        <option value=''>Nenhuma</option>
                        ${achados_rcf.map(p => `<option value='${JSON.stringify(p)}'>${p.apolice} - ${p.premio}</option>`).join('')}
                    </select>
                </div>`;
    }

    // Monta o dropdown de APP
    if (achados_app.length > 0) {
      html += `
                <div class="mb-3">
                    <label for="app_policy_select" class="form-label"><strong>APP</strong></label>
                    <select id="app_policy_select" class="form-select">
                        <option value=''>Nenhuma</option>
                        ${achados_app.map(p => `<option value='${JSON.stringify(p)}'>${p.apolice} - ${p.premio}</option>`).join('')}
                    </select>
                </div>`;
    }

    resultadoDiv.innerHTML = html;
  } catch (error) {
    console.error('Erro ao buscar dados do estipulante:', error);
    resultadoDiv.innerHTML = `<div class="alert alert-danger">Erro ao carregar os dados. Tente novamente.</div>`;
  }
}

// =================================================================
// 8. BUSCA VEICULO POR PLACA (API EXTERNA)
// =================================================================

// Validação (antigo padrão + Mercosul)
const PLATE_REGEX = /^(?:[A-Z]{3}\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/i;

// cache na aba (evita pagar por requisições repetidas na mesma sessão)
const plateCache = new Map();
let lastPlateSuccess = null;

function normalizePlate(str) {
  return (str || '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
}

function isValidPlate(placa) {
  return PLATE_REGEX.test(placa);
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val ?? '';
}

function fillFromApiData(apiData) {
  const dv = apiData?.dados?.informacoes_veiculo?.dados_veiculo ?? {};
  setVal('veiChassi', dv.chassi);
  setVal('veiFab', dv.marca);
  setVal('veiModelo', dv.modelo);
  setVal(
    'veiAno',
    dv.ano_modelo ?? dv.ano_fabricacao ?? dv.ano_frabricacao ?? '',
  );
}

function buscaVeiculo() {
  const veiculoInput = document.getElementById('veiPlaca');
  if (!veiculoInput) return;
  if (veiculoInput.dataset.listenerAttached) return;

  // quando o usuário alterar a placa, marcamos como "desatualizado"
  veiculoInput.addEventListener('input', () => {
    const placaAtual = normalizePlate(veiculoInput.value);
    if (placaAtual !== lastPlateSuccess) {
      // opcional: limpar campos para sinalizar que precisa consultar de novo
      setVal('veiChassi', '');
      setVal('veiFab', '');
      setVal('veiModelo', '');
      setVal('veiAno', '');
    }
  });

  veiculoInput.addEventListener('blur', async () => {
    const placa = normalizePlate(veiculoInput.value);
    if (!isValidPlate(placa)) return;

    const parent = veiculoInput.parentElement;
    const oldFeedback = parent.querySelector('.form-text');
    if (oldFeedback) oldFeedback.remove();

    const feedbackEl = document.createElement('div');
    feedbackEl.className = 'form-text text-muted ms-2';
    feedbackEl.textContent = 'Buscando dados...';
    parent.appendChild(feedbackEl);

    try {
      // 1) tenta pegar do cache do front
      if (plateCache.has(placa)) {
        const cached = plateCache.get(placa);
        fillFromApiData(cached);
        lastPlateSuccess = placa;
        feedbackEl.remove();
        return;
      }

      const response = await fetch(
        `/consulta_placa?placa=${encodeURIComponent(placa)}`,
      );
      const data = await response.json();

      if (response.ok && data?.status === 'ok') {
        plateCache.set(placa, data);
        fillFromApiData(data);
        lastPlateSuccess = placa;
        feedbackEl.remove();
      } else {
        feedbackEl.textContent =
          data?.mensagem || data?.message || 'Placa não encontrada.';
        feedbackEl.className = 'form-text text-danger ms-2';
      }
    } catch (error) {
      console.error('Falha na requisição para buscar veículo:', error);
      feedbackEl.textContent = 'Erro na consulta.';
      feedbackEl.className = 'form-text text-danger ms-2';
    }
  });

  veiculoInput.dataset.listenerAttached = 'true';
}

// NEW function to start the flow
function iniciarFluxo(tipoSolicitante) {
  if (!tipoSolicitante) {
    resetForm();
    return;
  }

  formDataStorage.tipoSolicitante = tipoSolicitante;

  // Define the first step of the form
  activeSteps = [
    { label: 'Solicitação', template: 'tipo_solicitacao_selecao' },
  ];
  currentStep = 0;

  // Hide initial selection and show the form
  document.getElementById('initialStep').style.display = 'none';
  document.querySelector('.form-content').style.display = 'block';
  document.getElementById('formDescription').textContent =
    'Selecione o tipo de solicitação';

  renderForm();
  updateProgress();
}

// MODIFIED event listener and initialization
document.getElementById('tipoSolicitante').addEventListener('change', e => {
  iniciarFluxo(e.target.value);
});

function inicializarFormulario() {
  fetchColaboradores();
  resetForm();
}

inicializarFormulario();
