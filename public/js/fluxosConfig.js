const fluxosConfig = {
  // =================================================================
  // Fluxos para o COLABORADOR
  // =================================================================
  colaborador: {
    nova: {
      description: 'Preencha os dados para Nova Transmissão',
      steps: [
        { label: 'Colaborador', template: 'solicitante' },
        { label: 'Segurado', template: 'segurado' },
        { label: 'Produtos', template: 'produtos_coberturas' },
        { label: 'Auxiliares', template: 'auxiliares' },
        { label: 'Info & Consent.', template: 'consentimento' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
    renovacao: {
      description: 'Siga as etapas para solicitar a Renovação',
      steps: [
        { label: 'Colaborador', template: 'solicitante' }, 
        { label: 'Apólice', template: 'renovacao_apolice' },
        { label: 'Produtos', template: 'produtos_coberturas' },
        { label: 'Auxiliares', template: 'auxiliares' },
        { label: 'Confirmar', template: 'renovacao_confirmar' },
      ],
    },
    endosso: {
      description: 'Siga as etapas para solicitar o Endosso',
      steps: [
        { label: 'Colaborador', template: 'solicitante' },
        { label: 'Dados', template: 'endosso_dados' },
        // As etapas seguintes do endosso são dinâmicas e controladas em nextStep().
      ],
    },
    segunda_via: {
      description: 'Solicite 2ª Via de Documentos ou Posição Financeira',
      steps: [
        { label: 'Colaborador', template: 'solicitante' },
        { label: 'Dados', template: 'segunda_via_docs' },
      ],
    },
    financeiro_regularizacao: {
      description: 'Solicite Regularização Financeira',
      steps: [
        { label: 'Colaborador', template: 'solicitante' },
        { label: 'Dados', template: 'financeiro_regularizacao' },
      ],
    },
    aviso_sinistro: {
      description: 'Preencha os dados para Aviso de Sinistro',
      steps: [
        { label: 'Colaborador', template: 'solicitante' },
        { label: 'Aviso Segurado', template: 'aviso_sinistro' },
        { label: 'Segurado Docs', template: 'aviso_sinistro_documentos' },
        { label: 'Aviso Terceiro', template: 'aviso_sinistro_terceiro' },
        { label: 'Terceiro Docs', template: 'aviso_sinistro_documentos_terceiro' },
        { label: 'Aviso Ocorrência', template: 'aviso_sinistro_ocorrencia' },
        { label: 'Info & Consent.', template: 'consentimento' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
    cotacao: {
      description: 'Solicite uma cotação',
      steps: [
        { label: 'Cliente', template: 'cliente' },
        { label: 'Cotação', template: 'produtos_coberturas' },
        { label: 'Auxiliares', template: 'auxiliares' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
  },

  // =================================================================
  // Fluxos para o ESTIPULANTE
  // =================================================================
  estipulante: {
    nova: {
      description: 'Preencha os dados para Nova Transmissão',
      steps: [
        // No fluxo 'nova' para estipulante, os dados dele são coletados na etapa de produtos.
        { label: 'Estipulante', template: 'estipulante_seguradoras' },
        { label: 'Segurado', template: 'segurado' },
        { label: 'Produtos', template: 'produtos_coberturas' },
        { label: 'Auxiliares', template: 'auxiliares' },
        { label: 'Info & Consent.', template: 'consentimento' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
    renovacao: {
      description: 'Siga as etapas para solicitar a Renovação',
      steps: [
        { label: 'Estipulante', template: 'estipulante_seguradoras' },
        { label: 'Segurado', template: 'segurado' },
        { label: 'Apólice', template: 'renovacao_apolice' },
        { label: 'Produtos', template: 'produtos_coberturas' },
        { label: 'Auxiliares', template: 'auxiliares' },
        { label: 'Confirmar', template: 'renovacao_confirmar' },
      ],
    },
    endosso: {
      description: 'Siga as etapas para solicitar o Endosso',
      steps: [
        { label: 'Estipulante', template: 'estipulante_seguradoras' },
        { label: 'Dados', template: 'endosso_dados' },
      ],
    },
    segunda_via: {
      description: 'Solicite 2ª Via de Documentos ou Posição Financeira',
      steps: [
        { label: 'Estipulante', template: 'estipulante_seguradoras' },
        { label: 'Dados', template: 'segunda_via_docs' },
      ],
    },
    financeiro_regularizacao: {
      description: 'Solicite Regularização Financeira',
      steps: [
        { label: 'Estipulante', template: 'estipulante_seguradoras' },
        { label: 'Dados', template: 'financeiro_regularizacao' },
      ],
    },
    aviso_sinistro: {
      description: 'Preencha os dados para Aviso de Sinistro',
      steps: [
        { label: 'Estipulante', template: 'estipulante_seguradoras' },
        { label: 'Aviso Segurado', template: 'aviso_sinistro' },
        { label: 'Segurado Docs', template: 'aviso_sinistro_documentos' },
        { label: 'Aviso Terceiro', template: 'aviso_sinistro_terceiro' },
        { label: 'Terceiro Docs', template: 'aviso_sinistro_documentos_terceiro' },
        { label: 'Aviso Ocorrência', template: 'aviso_sinistro_ocorrencia' },
        { label: 'Info & Consent.', template: 'consentimento' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
  },

  // =================================================================
  // Fluxos para o PARCEIRO
  // =================================================================
  parceiro: {
    nova: {
      description: 'Encontre a apólice ideal para seu cliente',
      steps: [
        { label: 'Parceiro', template: 'parceiro_busca_cobertura' },
        { label: 'Segurado', template: 'segurado' },
        { label: 'Veículo', template: 'veiculo' },
        { label: 'Auxiliares', template: 'auxiliares' },
        { label: 'Info & Consent.', template: 'consentimento' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
    aviso_sinistro: {
      description: 'Preencha os dados para Aviso de Sinistro',
      steps: [
        { label: 'Parceiro', template: 'parceiro_busca_cobertura' },
        { label: 'Aviso Segurado', template: 'aviso_sinistro' },
        { label: 'Segurado Docs', template: 'aviso_sinistro_documentos' },
        { label: 'Aviso Terceiro', template: 'aviso_sinistro_terceiro' },
        { label: 'Terceiro Docs', template: 'aviso_sinistro_documentos_terceiro' },
        { label: 'Aviso Ocorrência', template: 'aviso_sinistro_ocorrencia' },
        { label: 'Info & Consent.', template: 'consentimento' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
    segunda_via: {
      description: 'Solicite 2ª Via de Documentos ou Posição Financeira',
      steps: [
        { label: 'Parceiro', template: 'parceiro_busca_cobertura' },
        { label: 'Dados', template: 'segunda_via_docs' },
      ],
    },
    endosso: {
      description: 'Siga as etapas para solicitar o Endosso',
      steps: [
        { label: 'Parceiro', template: 'parceiro_busca_cobertura' },
        { label: 'Dados', template: 'endosso_dados' },
      ],
    },
    renovacao: {
      description: 'Siga as etapas para solicitar a Renovação',
      steps: [
        { label: 'Parceiro', template: 'parceiro_busca_cobertura' },
        { label: 'Segurado', template: 'segurado' },
        { label: 'Apólice', template: 'renovacao_apolice' },
        { label: 'Produtos', template: 'produtos_coberturas' },
        { label: 'Auxiliares', template: 'auxiliares' },
        { label: 'Confirmar', template: 'renovacao_confirmar' },
      ],
    },
    financeiro_regularizacao: {
      description: 'Solicite Regularização Financeira',
      steps: [
        { label: 'Parceiro', template: 'parceiro_busca_cobertura' },
        { label: 'Dados', template: 'financeiro_regularizacao' },
      ],
    },
  },
  
  // =================================================================
  // Fluxos para o SEGURADO
  // =================================================================
  segurado: {
    cotacao: {
      description: 'Solicite uma cotação',
      steps: [
        { label: 'Segurado', template: 'cliente' },
        { label: 'Cotação', template: 'produtos_coberturas' },
        { label: 'Auxiliares', template: 'auxiliares' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
    aviso_sinistro: {
      description: 'Preencha os dados para Aviso de Sinistro',
      steps: [
        { label: 'Aviso Segurado', template: 'aviso_sinistro' },
        { label: 'Segurado Docs', template: 'aviso_sinistro_documentos' },
        { label: 'Aviso Terceiro', template: 'aviso_sinistro_terceiro' },
        { label: 'Terceiro Docs', template: 'aviso_sinistro_documentos_terceiro' },
        { label: 'Aviso Ocorrência', template: 'aviso_sinistro_ocorrencia' },
        { label: 'Info & Consent.', template: 'consentimento' },
        { label: 'Enviar', template: 'enviar' },
      ],
    },
    segunda_via: {
      description: 'Solicite 2ª Via de Documentos ou Posição Financeira',
      steps: [
        { label: 'Segurado', template: 'cliente' },
        { label: 'Dados', template: 'segunda_via_docs' },
      ],
    },
    endosso: {
      description: 'Siga as etapas para solicitar o Endosso',
      steps: [
        { label: 'Segurado', template: 'cliente' },
        { label: 'Dados', template: 'endosso_dados' },
      ],
    },
    financeiro_regularizacao: {
      description: 'Solicite Regularização Financeira',
      steps: [
        { label: 'Segurado', template: 'cliente' },
        { label: 'Dados', template: 'financeiro_regularizacao' },
      ],
    },
  },
};
