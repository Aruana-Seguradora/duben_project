/**
 * Aplica regras de visibilidade declarativas com base em atributos data-rule.
 * Procura por todos os elementos com `data-rule` e anexa listeners.
 * A regra é definida como "id_do_alvo:valor_do_gatilho".
 * Ex: data-rule="containerAlvo:checked" em um checkbox.
 * Ex: data-rule="outroInput:outro" em um select.
 */
function initializeDeclarativeRules() {
  const ruleTriggers = document.querySelectorAll('[data-rule]');

  const applyRule = (triggerElement) => {
    // Lida com múltiplos gatilhos no mesmo elemento, separados por ';'
    const rules = triggerElement.dataset.rule.split(';');

    rules.forEach(rule => {
      const parts = rule.split(':');
      if (parts.length !== 2) return;

      const targetId = parts[0];
      const triggerValue = parts[1];
      const targetElement = document.getElementById(targetId);

      if (!targetElement) return;

      let isTriggered = false;
      // Verifica a condição de disparo da regra
      if (triggerElement.type === 'radio') {
        if (triggerValue === 'checked') {
          isTriggered = triggerElement.checked;
        } else {
          isTriggered = triggerElement.checked && triggerElement.value === triggerValue;
        }
      } else if (triggerElement.type === 'checkbox') {
        isTriggered = triggerElement.checked; // Para checkboxes, 'checked' é o gatilho implícito
      } else { // Para selects e outros inputs
        isTriggered = triggerElement.value === triggerValue;
      }

      // Aplica a visibilidade
      targetElement.style.display = isTriggered ? '' : 'none';

      // Gerencia o atributo 'required' dos inputs dentro do alvo
      const inputs = targetElement.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        // Armazena o estado original de 'required' para não perder a informação
        if (!input.hasAttribute('data-required-original')) {
          input.setAttribute('data-required-original', input.required);
        }

        const wasOriginallyRequired = input.getAttribute('data-required-original') === 'true';
        input.required = isTriggered && wasOriginallyRequired;

        // Limpa o estado de erro se o campo for escondido
        if (!isTriggered) {
          input.classList.remove('is-invalid');
        }
      });
    });
  };

  // Anexa o listener e executa a regra uma vez para definir o estado inicial
  ruleTriggers.forEach(trigger => {
    trigger.addEventListener('change', () => applyRule(trigger));
    applyRule(trigger); // Garante o estado correto na renderização inicial
  });
}


function addListenersAndMasks() {
  const form = document.getElementById('multiStepForm');

  // Impede o envio do formulário ao pressionar Enter em um input
  form.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
      event.preventDefault();
    }
  });

  // Para evitar listeners duplicados, removemos o antigo antes de adicionar um novo
  if (window.formSubmitHandler) {
    form.removeEventListener('submit', window.formSubmitHandler);
  }

  window.formSubmitHandler = async function (e) {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    const select = document.getElementById('tipoSolicitacao');
    const tipoText = select.options[select.selectedIndex].text;
    if (!confirm(`Confirmar envio da solicitação de ${tipoText}?`)) return;

    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

    const formData = new FormData();

    // Funções auxiliares para popular o FormData
    const appendValue = (key, id) => {
      const el = document.getElementById(id);
      if (el && el.value) formData.append(key, el.value);
    };
    const appendFile = (key, id) => {
      const el = document.getElementById(id);
      if (el && el.files[0]) formData.append(key, el.files[0]);
    };
    const appendChecked = (key, id) => {
      const el = document.getElementById(id);
      formData.append(key, el ? el.checked : false);
    };
    const appendRadio = (key, name) => {
      const el = document.querySelector(`input[name="${name}"]:checked`);
      if (el) formData.append(key, el.value);
    };
    const appendInt = (key, id) => {
      const el = document.getElementById(id);
      if (el && el.value) formData.append(key, parseInt(el.value, 10) || 0);
    };
    const appendMultiSelect = (key, id) => {
      const el = document.getElementById(id);
      if (el) {
        for (const option of el.selectedOptions) {
          formData.append(key + ':', option.value);
        }
      }
    };

    // Adiciona dados que não estão em campos de input
    formData.append('tipo', currentFluxo);
    formData.append('tipoSolicitante', formDataStorage.tipoSolicitante || '');

    switch (currentFluxo) {
      case 'nova':
        const rcfPolicySelect = document.getElementById('rcf_policy_select');
        const appPolicySelect = document.getElementById('app_policy_select');
        const rcfData =
          rcfPolicySelect && rcfPolicySelect.value
            ? JSON.parse(rcfPolicySelect.value)
            : {};
        const appData =
          appPolicySelect && appPolicySelect.value
            ? JSON.parse(appPolicySelect.value)
            : {};

        appendValue('solicitanteNome', 'estipNome');
        appendValue('estipulanteCNPJ', 'cnpj');
        formData.append('estipulanteApoliceRCF', rcfData.apolice || '');
        formData.append('estipulantePremioRCF', rcfData.premio || '');
        formData.append(
          'estipulanteDanoMaterialRCF',
          rcfData.dano_material_DM || '',
        );
        formData.append(
          'estipulanteDanoCorporalRCF',
          rcfData.dano_corporal_DC || '',
        );
        formData.append('estipulanteProLaboreRCF', rcfData.pro_labore || '');
        formData.append('estipulanteFatorRCF', rcfData.fator || '');
        formData.append('estipulanteApoliceAPP', appData.apolice || '');
        formData.append('estipulantePremioAPP', appData.premio || '');
        formData.append(
          'estipulanteIpaCondutorAPP',
          appData.ipa_condutor || '',
        );
        formData.append('estipulanteMaCondutorAPP', appData.ma_condutor || '');
        formData.append('estipulanteProLaboreAPP', appData.pro_labore || '');
        formData.append('estipulanteFatorAPP', appData.fator || '');
        formData.append(
          'estipulanteIpaPassageiroAPP',
          appData.ipa_passageiro || '',
        );
        formData.append(
          'estipulanteMaPassageiroAPP',
          appData.ma_passageiro || '',
        );

        appendValue('produtos', 'produtos');
        const valorRCFSelect = document.getElementById('valorRCF_select');
        if (valorRCFSelect && valorRCFSelect.value === 'outro') {
          appendInt('valorRCF', 'valorRCF_outro');
        } else {
          appendInt('valorRCF', 'valorRCF_select');
        }
        const valorAPPSelect = document.getElementById('valorAPP_select');
        if (valorAPPSelect && valorAPPSelect.value === 'outro') {
          appendInt('valorAPP', 'valorAPP_outro');
        } else {
          appendInt('valorAPP', 'valorAPP_select');
        }

        appendValue('qtdParcelas', 'qtdParcelas');
        appendMultiSelect('segTrabalhadas', 'segTrabalhadas');
        appendValue('seguradoNome', 'seguradoNome');
        appendValue('seguradoNomeSocial', 'seguradoNomeSocial');
        appendValue('seguradoTipoPessoa', 'seguradoTipoPessoa');
        appendValue('seguradoDocumento', 'seguradoDocumento');
        appendValue('seguradoDataNascimento', 'seguradoDataNascimento');
        appendValue('seguradoEstadoCivil', 'seguradoEstadoCivil');
        appendValue('seguradoSexo', 'seguradoSexo');
        appendValue('seguradoTipoIdentidade', 'seguradoTipoIdentidade');
        appendValue('seguradoNumIdentidade', 'seguradoNumIdentidade');
        appendValue('seguradoOrgaoEmissor', 'seguradoOrgaoEmissor');
        appendValue('seguradoDataEmissao', 'seguradoDataEmissao');
        appendRadio('seguradoEstrangeiro', 'seguradoEstrangeiro');
        appendValue('seguradoPais', 'seguradoPais');
        appendValue('seguradoTempoPais', 'seguradoTempoPais');
        appendValue('seguradoPaisResidencia', 'seguradoPaisResidencia');
        appendValue('seguradoAtividadePrincipal', 'seguradoAtividadePrincipal');
        appendValue('seguradoFaixaRenda', 'seguradoFaixaRenda');
        appendRadio('seguradoPPE', 'seguradoPPE');
        appendValue('seguradoPPENome', 'seguradoPPENome');
        appendValue('seguradoPPECPF', 'seguradoPPECPF');
        appendValue(
          'seguradoPPEGrauRelacionamento',
          'seguradoPPEGrauRelacionamento',
        );
        appendValue('seguradoCEP', 'segurado_cep');
        appendValue('seguradoLogradouro', 'segurado_logradouro');
        appendValue('seguradoNumero', 'segurado_numero');
        appendValue('seguradoBairro', 'segurado_bairro');
        appendValue('seguradoCidade', 'segurado_cidade');
        appendValue('seguradoEstado', 'segurado_estado');
        appendValue('seguradoEmail', 'emailSeg');
        appendValue('seguradoTelefone', 'telSeg');
        appendValue('seguradoEmailAdicional', 'emailSegAux');
        appendValue('seguradoTelefoneAdicional', 'telSegAux');
        appendFile('seguradoCNH', 'cnhSeg');
        appendFile('seguradoComprovanteResidencia', 'comprovanteResidenciaSeg');

        appendValue('veiculoPlaca', 'veiPlaca');
        appendValue('veiculoChassi', 'veiChassi');
        appendValue('veiculoRenavam', 'veiRenavam');
        appendValue('veiculoFabricante', 'veiFab');
        appendValue('veiculoModelo', 'veiModelo');
        appendValue('veiculoAno', 'veiAno');
        appendValue('veiculoUso', 'veiUso');
        appendInt('veiculoLotacao', 'veiLotacao');
        appendFile('veiculoCRLV', 'veiCNH');
        appendRadio('tigoClube', 'tigoClube');
        appendFile('tigoClubeAdesao', 'tigoClubeAdesao');

        appendChecked('adicionarAuxiliar', 'addAuxiliar');
        appendValue('auxiliar1Nome', 'aux1Nome');
        appendValue('auxiliar1CPF', 'aux1CPF');
        appendFile('auxiliar1CNH', 'aux1CNH');
        appendChecked('adicionarAuxiliar2', 'addAuxiliar2');
        appendValue('auxiliar2Nome', 'aux2Nome');
        appendValue('auxiliar2CPF', 'aux2CPF');
        appendFile('auxiliar2CNH', 'aux2CNH');

        appendValue('infoAdicionais', 'infoAdicionais');
        appendChecked('termos', 'termos');

        break;
      case 'renovacao':
        appendValue('numeroApoliceAnterior', 'renovApolice');
        appendValue('dataVencimentoAnterior', 'renovVencimento');
        appendValue('seguradoraAnterior', 'renovSeguradora');
        appendValue('outraSeguradoraAnterior', 'outraSeguradoraNome');
        appendValue('seguradoNome', 'seguradoNome');
        appendValue('seguradoNomeSocial', 'seguradoNomeSocial');
        appendValue('seguradoTipoPessoa', 'seguradoTipoPessoa');
        appendValue('seguradoDocumento', 'seguradoDocumento');
        appendValue('seguradoDataNascimento', 'seguradoDataNascimento');
        appendValue('seguradoEstadoCivil', 'seguradoEstadoCivil');
        appendValue('seguradoSexo', 'seguradoSexo');
        appendValue('seguradoTipoIdentidade', 'seguradoTipoIdentidade');
        appendValue('seguradoNumIdentidade', 'seguradoNumIdentidade');
        appendValue('seguradoOrgaoEmissor', 'seguradoOrgaoEmissor');
        appendValue('seguradoDataEmissao', 'seguradoDataEmissao');
        appendRadio('seguradoEstrangeiro', 'seguradoEstrangeiro');
        appendValue('seguradoPais', 'seguradoPais');
        appendValue('seguradoTempoPais', 'seguradoTempoPais');
        appendValue('seguradoPaisResidencia', 'seguradoPaisResidencia');
        appendValue('seguradoAtividadePrincipal', 'seguradoAtividadePrincipal');
        appendValue('seguradoFaixaRenda', 'seguradoFaixaRenda');
        appendRadio('seguradoPPE', 'seguradoPPE');
        appendValue('seguradoPPENome', 'seguradoPPENome');
        appendValue('seguradoPPECPF', 'seguradoPPECPF');
        appendValue(
          'seguradoPPEGrauRelacionamento',
          'seguradoPPEGrauRelacionamento',
        );
        appendValue('seguradoCEP', 'segurado_cep');
        appendValue('seguradoLogradouro', 'segurado_logradouro');
        appendValue('seguradoNumero', 'segurado_numero');
        appendValue('seguradoBairro', 'segurado_bairro');
        appendValue('seguradoCidade', 'segurado_cidade');
        appendValue('seguradoEstado', 'segurado_estado');
        appendFile('seguradoCNH', 'cnhSeg');
        appendFile('seguradoComprovanteResidencia', 'comprovanteResidenciaSeg');
        appendChecked('confirmado', 'renovConfirm');
        break;
      case 'aviso_sinistro':
        appendValue('corretor', 'sinistroCorretor');
        appendValue('nomeSegurado', 'sinistroNomeSegurado');
        appendValue('emailSegurado', 'sinistroEmailSegurado');
        appendValue('numeroApolice', 'sinistroNumeroApolice');
        appendValue('marcaVeiculo', 'sinistroMarcaVeiculo');
        appendValue('modeloVeiculo', 'sinistroModeloVeiculo');
        appendInt('anoFabricacaoVeiculo', 'sinistroAnoFabricacaoVeiculo');
        appendInt('anoModeloVeiculo', 'sinistroAnoModeloVeiculo');
        appendValue('placaSegurado', 'sinistroPlacaSegurado');
        appendValue('categoriaDano', 'sinistroCategoriaDano');
        appendValue('nomeTerceiro', 'sinistroNomeTerceiro');
        appendValue('enderecoTerceiro', 'sinistroEnderecoTerceiro');
        appendValue('telefoneTerceiro', 'sinistroTelefoneTerceiro');
        appendValue('emailTerceiro', 'sinistroEmailTerceiro');
        formData.append('paisSinistro', 'Brasil'); // Campo readonly
        appendValue('estadoSinistro', 'sinistroEstado');
        appendValue('cidadeSinistro', 'sinistroCidade');
        appendValue('cepSinistro', 'sinistroCep');
        appendValue('numeroLocalSinistro', 'sinistroNumeroLocal');
        appendValue('enderecoEvento', 'sinistroEnderecoEvento');
        appendValue('dataHoraOcorrencia', 'sinistroDataHoraOcorrencia');
        appendValue('descricaoSinistro', 'sinistroDescricao');
        appendValue('numeroBoletim', 'sinistroNumeroBoletim');
        appendValue('dataHoraBoletim', 'sinistroDataHoraBoletim');
        appendRadio('responsabilidadeSegurado', 'sinistroResponsabilidade');
        appendValue('motivoResponsabilidade', 'sinistroMotivoResponsabilidade');
        break;
      case 'endosso':
        appendValue('nomeOuRazao', 'endossoNome');
        appendValue('documento', 'endossoDocumento');
        appendValue('seguradora', 'endossoSeguradora');
        appendValue('outraSeguradora', 'endossoOutraSeguradoraNome');
        appendValue('apoliceAPP', 'endossoApoliceAPP');
        appendValue('apoliceRCF', 'endossoApoliceRCF');
        const tipoSolicitacao = document.getElementById('endossoTipo')?.value;
        if (tipoSolicitacao)
          formData.append('tipoSolicitacao', tipoSolicitacao);

        switch (tipoSolicitacao) {
          case 'substituicao_veiculo':
            appendValue('placaAtual', 'endossoVeiculoPlacaAtual');
            appendValue('placaNova', 'endossoVeiculoPlacaNova');
            appendValue('chassi', 'endossoVeiculoChassi');
            appendValue('renavam', 'endossoVeiculoRenavam');
            appendValue('fabricante', 'endossoVeiculoFab');
            appendValue('modelo', 'endossoVeiculoModelo');
            appendValue('ano', 'endossoVeiculoAno');
            appendInt('lotacao', 'endossoVeiculoLotacao');
            appendFile('crlv', 'endossoVeiculoCRLV');
            break;
          case 'inclusao_condutor':
            appendValue('qaInicial', 'endossoQaInicial');
            appendValue('acaoCondutor', 'endossoAcao');
            appendValue('condutor1RetirarNome', 'endossoCondutor1RetirarNome');
            appendValue('condutor1RetirarCPF', 'endossoCondutor1RetirarCPF');
            appendValue('condutor2RetirarNome', 'endossoCondutor2RetirarNome');
            appendValue('condutor2RetirarCPF', 'endossoCondutor2RetirarCPF');
            appendValue('condutor1Nome', 'endossoCondutor1Nome');
            appendValue('condutor1CPF', 'endossoCondutor1CPF');
            appendFile('condutor1CNH', 'endossoCondutor1CNH');
            appendValue('condutor2Nome', 'endossoCondutor2Nome');
            appendValue('condutor2CPF', 'endossoCondutor2CPF');
            appendFile('condutor2CNH', 'endossoCondutor2CNH');
            break;
          case 'alteracao_endereco':
            appendValue('novoEndereco', 'endossoNovoEndereco');
            appendValue('novoEmail', 'endossoNovoEmail');
            appendValue('novoTelefone', 'endossoNovoTelefone');
            appendFile('comprovanteEndereco', 'endossoNovoEnderecoComp');
            break;
          case 'correcao_cadastral':
            appendRadio('tipoPessoa', 'tipoPessoa');
            appendValue('segNomePF', 'segNomePF');
            appendValue('segCPF', 'segCPF');
            appendValue('segRazao', 'segRazao');
            appendValue('segCNPJ', 'segCNPJ');
            appendFile('cnhSegurado', 'endossoCorrecaoCNH');
            break;
          case 'cancel_req':
            appendFile('endossoCartaCancel', 'endossoCartaCancel');
            break;
        }
        break;
      case 'segunda_via':
        appendValue('nomeOuRazao', 'segundaViaNome');
        appendValue('documento', 'segundaViaDocumento');
        appendValue('tipoDocumento', 'segundaViaTipoDoc');
        appendValue('outroDocumento', 'segundaViaOutroNome');
        appendValue('responsavel', 'segundaViaResponsavel');
        appendValue('observacoes', 'segundaViaObs');
        break;
      case 'financeiro_regularizacao':
        appendValue('nomeOuRazao', 'finRegNome');
        appendValue('documento', 'finRegDocumento');
        appendValue('dataVencimento', 'finRegDataVencimento');
        appendValue('parcelaAberta', 'finRegParcela');
        appendValue('apoliceRCF', 'finRegApoliceRCF');
        appendValue('motivoInadimplencia', 'finRegMotivo');
        appendValue('responsavel', 'finRegResponsavel');
        appendValue('observacoes', 'finRegObs');
        break;
      default:
        alert('Tipo de solicitação não configurado para envio.');
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        return;
    }

    console.log('Enviando para o servidor:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch('/submit-form', {
        method: 'POST',
        body: formData,
      });

      console.log(response.status, response.statusText);

      if (response.ok) {
        console.log(
          `Formulário do fluxo '${currentFluxo}' enviado com sucesso!`,
        );
        document.getElementById('multiStepForm').style.display = 'none';
        document.getElementById('successMessageText').textContent =
          `Recebemos sua ${tipoText}. Entraremos em contato em breve.`;
        document.getElementById('successMessage').classList.add('active');
      }
    } catch (error) {
      console.error('Falha ao enviar o formulário:', error);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  };

  form.addEventListener('submit', window.formSubmitHandler);

  handleColaboradorValidation();

  // --- Configuração dos Listeners ---
  const produtosSelect = document.getElementById('produtos');
  if (produtosSelect) {
    produtosSelect.addEventListener('change', () => {
      applyProductsVisibility();
      toggleObservacaoAPP();
    });
  }
  
  const codigo = document.getElementById('codigo');
  if (codigo) {
    codigo.addEventListener('blur', buscar);
    codigo.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        buscar();
      }
    });
  }

  const seguradoCepInput = document.getElementById('segurado_cep');
  if (seguradoCepInput) {
    seguradoCepInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        buscarCep();
      }
    });
  }

  // Remove erro on-input
  document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => input.classList.remove('is-invalid'));
    input.addEventListener('change', () =>
      input.classList.remove('is-invalid'),
    );
  });

  // --- Inicialização da UI ---
  // Chama todas as funções de visibilidade para garantir o estado correto ao renderizar
  applyProductsVisibility();
  handleDadosEstipVisibility();
  toggleObservacaoAPP();
  
  // NOVO: Inicializa todas as regras declarativas
  initializeDeclarativeRules();

  const segTrabalhadasSelect = document.getElementById('segTrabalhadas');
  if (segTrabalhadasSelect) {
    new MultiSelectTag('segTrabalhadas', {
      maxSelection: 6,
      placeholder: 'Seguradoras',
    });
  }
}

function applyProductsVisibility() {
  const produtosSelect = document.getElementById('produtos');
  if (!produtosSelect) return;
  const selectedProduct = produtosSelect.value;

  const fieldsContainer = document.getElementById('rcf_app_fields');
  if (!fieldsContainer) return;

  const coberturaRCF = document.getElementById('coberturaRCF');
  const coberturaAPP = document.getElementById('coberturaAPP');
  const qtdParcelas = document.getElementById('qtdParcelas');
  // const segTrabalhadas = document.getElementById('segTrabalhadas');

  const isAuto = selectedProduct === 'auto';

  fieldsContainer.style.display = isAuto ? 'none' : 'block';

  if (qtdParcelas) qtdParcelas.required = !isAuto;

  if (!isAuto) {
    const showRCF = selectedProduct === 'rcf' || selectedProduct === 'rcf_app';
    const showAPP = selectedProduct === 'app' || selectedProduct === 'rcf_app';

    if (coberturaRCF) {
      coberturaRCF.style.display = showRCF ? 'block' : 'none';
      document.getElementById('valorRCF_select').required = showRCF;
    }
    
    if (coberturaAPP) {
      coberturaAPP.style.display = showAPP ? 'block' : 'none';
      document.getElementById('valorAPP_select').required = showAPP;
    }
  } else {
    if (coberturaRCF) document.getElementById('valorRCF_select').required = false;
    if (coberturaAPP) document.getElementById('valorAPP_select').required = false;
  }
}

function toggleObservacaoAPP() {
  const observacaoAPP = document.getElementById('observacaoAPP');
  if (!observacaoAPP) return;

  const produtos = document.getElementById('produtos')?.value;
  if (
    currentFluxo === 'nova' &&
    (produtos === 'app' || produtos === 'rcf_app')
  ) {
    observacaoAPP.style.display = 'block';
  } else {
    observacaoAPP.style.display = 'none';
  }
}

function handleDadosEstipVisibility() {
  const dadosEstipDiv = document.getElementById('dados_estip');
  if (!dadosEstipDiv) return;

  const tipoSolicitante = formDataStorage.tipoSolicitante;
  const estipuQuestion = formDataStorage.estipuQuestion;

  const isEstipulante = tipoSolicitante === 'estipulante';
  const isColaboradorComEstip = tipoSolicitante === 'colaborador' && estipuQuestion === 'Sim';

  console.log(estipuQuestion);

  if (isEstipulante || isColaboradorComEstip) {
    dadosEstipDiv.classList.remove('d-none');
  } else {
    dadosEstipDiv.classList.add('d-none');
  }
}

async function buscarCep() {
  const cepInput = document.getElementById('segurado_cep');
  if(!cepInput) return;

  const cep = cepInput.value.replace(/\D/g, '');

  cepInput.classList.remove('is-invalid');
  const errorDiv = cepInput.closest('.input-group')?.querySelector('.invalid-feedback');
  if (errorDiv) errorDiv.textContent = 'Informe um CEP válido.';

  const addressFields = {
    logradouro: document.getElementById('segurado_logradouro'),
    bairro: document.getElementById('segurado_bairro'),
    cidade: document.getElementById('segurado_cidade'),
    estado: document.getElementById('segurado_estado'),
  };

  Object.values(addressFields).forEach(field => { if(field) field.value = ''; });

  if (cep.length !== 8) return;

  Object.values(addressFields).forEach(field => {
    if(field) {
      field.placeholder = 'Carregando...';
      field.disabled = true;
    }
  });
  cepInput.disabled = true;

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) {
      cepInput.classList.add('is-invalid');
      if (errorDiv) errorDiv.textContent = 'CEP não encontrado.';
      return;
    }

    if(addressFields.logradouro) addressFields.logradouro.value = data.logradouro;
    if(addressFields.bairro) addressFields.bairro.value = data.bairro;
    if(addressFields.cidade) addressFields.cidade.value = data.localidade;
    if(addressFields.estado) addressFields.estado.value = data.uf;

  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    cepInput.classList.add('is-invalid');
    if (errorDiv) errorDiv.textContent = 'Erro ao buscar CEP.';
  } finally {
    Object.values(addressFields).forEach(field => {
      if(field) {
        field.placeholder = '';
        field.disabled = false;
      }
    });
    cepInput.disabled = false;
  }
}

/**
 * Aplica regras de visibilidade condicional com base no tipo de solicitante.
 * Lê o atributo `data-visible-when-solicitante`.
 */
function applyConditionalVisibility() {
  const tipoSolicitante = formDataStorage.tipoSolicitante;
  if (!tipoSolicitante) return;

  const conditionalElements = document.querySelectorAll(
    '[data-visible-when-solicitante]',
  );

  conditionalElements.forEach(element => {
    const allowedTypes = element.dataset.visibleWhenSolicitante
      .split(',')
      .map(s => s.trim());

    const shouldBeVisible = allowedTypes.includes(tipoSolicitante);
    element.style.display = shouldBeVisible ? '' : 'none';

    const inputs = element.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (!input.hasAttribute('data-required-original')) {
        input.setAttribute('data-required-original', input.required);
      }
      const wasOriginallyRequired =
        input.getAttribute('data-required-original') === 'true';
      input.required = shouldBeVisible && wasOriginallyRequired;
      if (!shouldBeVisible) {
        input.classList.remove('is-invalid');
      }
    });
  });
}