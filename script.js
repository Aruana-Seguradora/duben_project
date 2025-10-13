// =================================================================
// 1. TEMPLATES PARA CADA ETAPA
// =================================================================
const stepTemplates = {
  tipo_solicitante: `
    <div class="form-step" data-step="0">
      <h4 class="mb-4">Identificação</h4>
      <div class="mb-3">
        <label for="tipoSolicitante" class="form-label">Você é? *</label>
        <select id="tipoSolicitante" class="form-select" required>
          <option value="">Selecione</option>
          <option value="segurado">Segurado</option>
          <option value="estipulante">Estipulante</option>
          <option value="colaborador">Colaborador</option>
        </select>
        <div class="invalid-feedback">Informe o tipo de solicitante.</div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="resetForm()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  tipo: `
    <div class="form-step" data-step="0">
      <h4 class="mb-4">Tipo de Solicitação</h4>
      <p>Você selecionou: <strong><span id="tipoSelecionado">Nova Transmissão</span></strong>.</p>
      <p class="text-muted">Clique em próximo para continuar ou volte para alterar o tipo.</p>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="resetForm()">
          <i class="bi bi-arrow-left"></i> Alterar Tipo
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  tipo_para_nova: `
    <div class="form-step">
      <h4 class="mb-4">Tipo de Solicitação</h4>
      <p>Você selecionou: <strong><span id="tipoSelecionado">Nova Transmissão</span></strong>.</p>
      <p class="text-muted">Clique em próximo para continuar ou volte para alterar o tipo.</p>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  produtos: `
    <div class="form-step" data-step="1">
      <h4 class="mb-4">Produtos desejados</h4>
      <div class="mb-3">
        <label class="form-label">Selecione *</label>
        <select id="produtos" class="form-select" required>
          <option value="">Selecione</option>
          <option value="rcf_app">RCF e APP</option>
          <option value="rcf">Somente RCF</option>
          <option value="app">Somente APP</option>
        </select>
        <div class="invalid-feedback">Informe os produtos desejados.</div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  coberturas: `
    <div class="form-step" data-step="2">
      <h4 class="mb-4">Coberturas</h4>
      <div id="coberturaRCF" class="mb-3">
        <label for="valorRCF_select" class="form-label">Valor RCF (R$) *</label>
        <div id="rcfApoliceInfo" class="text-muted mb-2"></div>
        <select id="valorRCF_select" class="form-select" required>
          <option value="">Selecione</option>
          <option value="50000">R$ 50.000</option>
          <option value="100000">R$ 100.000</option>
          <option value="150000">R$ 150.000</option>
          <option value="outro">Outro Valor</option>
        </select>
        <input type="number" class="form-control mt-2" id="valorRCF_outro" step="1000" style="display: none;" placeholder="Digite o valor desejado" />
        <div class="invalid-feedback">Informe o valor de RCF.</div>
      </div>
      <div id="coberturaAPP" class="mb-3">
        <label for="valorAPP_select" class="form-label">Valor APP por pessoa (R$) *</label>
        <div id="appApoliceInfo" class="text-muted mb-2"></div>
        <select id="valorAPP_select" class="form-select" required>
          <option value="">Selecione</option>
          <option value="5000">R$ 5.000</option>
          <option value="10000">R$ 10.000</option>
          <option value="outro">Outro Valor</option>
        </select>
        <input type="number" class="form-control mt-2" id="valorAPP_outro" step="1000" style="display: none;" placeholder="Digite o valor desejado" />
        <div class="invalid-feedback">Informe o valor de APP.</div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  parcelas: `
    <div class="form-step" data-step="3">
      <h4 class="mb-4">Parcelamento</h4>
      <div id="observacaoAPP" class="alert alert-info">
        <strong>Atenção:</strong> O produto APP (Acidentes Pessoais de Passageiros) é sempre pago à vista. O parcelamento se aplica apenas ao RCF.
      </div>
      <div class="row">
        <div class="col-md-12 mb-3">
          <label for="qtdParcelas" class="form-label">Quantidade de parcelas *</label>
          <select id="qtdParcelas" class="form-select" required>
            <option value="">Selecione</option>
            <option>1x</option> <option>2x</option> <option>3x</option> <option>4x</option> <option>5x</option> <option>6x</option> <option>7x</option> <option>8x</option> <option>9x</option> <option>10x</option> 
          </select>
          <div class="invalid-feedback">Informe a quantidade de parcelas.</div>
        </div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  segurado: `
    <div class="form-step" data-step="5">
      <h4 class="mb-4">Dados do Segurado</h4>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nome *</label>
          <input id="seguradoNome" class="form-control" required />
          <div class="invalid-feedback">Informe o nome.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Nome Social</label>
          <input id="seguradoNomeSocial" class="form-control" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="seguradoTipoPessoa" class="form-label">Tipo de pessoa *</label>
          <select id="seguradoTipoPessoa" class="form-select" required>
            <option value="">Selecione</option>
            <option value="pf">Pessoa Física</option>
            <option value="pj">Pessoa Jurídica</option>
          </select>
          <div class="invalid-feedback">Informe o tipo</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">CPF/CNPJ *</label>
          <input id="seguradoDocumento" class="form-control" placeholder="CPF ou CNPJ" required />
          <div class="invalid-feedback">Documento inválido.</div>
        </div>
      </div>
      <div class="row">
          <div class="col-md-4 mb-3">
              <label class="form-label">Data de Nascimento *</label>
              <input id="seguradoDataNascimento" type="date" class="form-control" required />
              <div class="invalid-feedback">Informe a data de nascimento.</div>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Estado Civil *</label>
              <select id="seguradoEstadoCivil" class="form-select" required>
                  <option value="">Selecione</option>
                  <option>Solteiro(a)</option>
                  <option>Casado(a)</option>
                  <option>Divorciado(a)</option>
                  <option>Viúvo(a)</option>
              </select>
              <div class="invalid-feedback">Informe o estado civil.</div>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Sexo *</label>
              <select id="seguradoSexo" class="form-select" required>
                  <option value="">Selecione</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
              </select>
              <div class="invalid-feedback">Informe o sexo.</div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-4 mb-3">
              <label class="form-label">Tipo Identidade *</label>
              <select id="seguradoTipoIdentidade" class="form-select" required>
                  <option value="">Selecione</option>
                  <option>CNH</option>
                  <option>CREA</option>
                  <option>MILITAR</option>
                  <option>CREA</option>
                  <option>ORDEM ADVOG BRASIL</option>
                  <option>PASSAPORTE</option>
                  <option>RG</option>
                  <option>OUTROS</option>
              </select>
              <div class="invalid-feedback">Informe o tipo de identidade.</div>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Nº Identidade *</label>
              <input id="seguradoNumIdentidade" class="form-control" required />
              <div class="invalid-feedback">Informe o nº da identidade.</div>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Órgão Emissor *</label>
              <input id="seguradoOrgaoEmissor" class="form-control" required />
              <div class="invalid-feedback">Informe o órgão emissor.</div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6 mb-3">
              <label class="form-label">Data de Emissão *</label>
              <input id="seguradoDataEmissao" type="date" class="form-control" required />
              <div class="invalid-feedback">Informe a data de emissão.</div>
          </div>
          <div class="col-md-6 mb-3">
              <label class="form-label">Estrangeiro? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="seguradoEstrangeiro" id="seguradoEstrangeiroSim" value="sim" required />
                      <label class="form-check-label" for="seguradoEstrangeiroSim">Sim</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="seguradoEstrangeiro" id="seguradoEstrangeiroNao" value="nao" required checked />
                      <label class="form-check-label" for="seguradoEstrangeiroNao">Não</label>
                  </div>
              </div>
          </div>
      </div>
      <div id="seguradoBlocoEstrangeiro" style="display: none;">
          <div class="row">
              <div class="col-md-4 mb-3">
                  <label class="form-label">País</label>
                  <input id="seguradoPais" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                  <label class="form-label">Tempo no País</label>
                  <input id="seguradoTempoPais" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                  <label class="form-label">País de Residência</label>
                  <input id="seguradoPaisResidencia" class="form-control" />
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6 mb-3">
              <label class="form-label">Atividade Principal</label>
              <input id="seguradoAtividadePrincipal" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
              <label class="form-label">Faixa de Renda Mensal</label>
              <input id="seguradoFaixaRenda" class="form-control" />
          </div>
      </div>
      <div class="row">
          <div class="col-md-12 mb-3">
              <label class="form-label">Pessoa Politicamente Exposta? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="seguradoPPE" id="seguradoPPESim" value="sim" required />
                      <label class="form-check-label" for="seguradoPPESim">Sim</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="seguradoPPE" id="seguradoPPENao" value="nao" required checked />
                      <label class="form-check-label" for="seguradoPPENao">Não</label>
                  </div>
              </div>
          </div>
      </div>
      <div id="seguradoBlocoPPE" style="display: none;">
          <div class="row">
              <div class="col-md-4 mb-3">
                  <label class="form-label">Nome</label>
                  <input id="seguradoPPENome" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                  <label class="form-label">CPF</label>
                  <input id="seguradoPPECPF" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                  <label class="form-label">Grau de Relacionamento</label>
                  <input id="seguradoPPEGrauRelacionamento" class="form-control" />
              </div>
          </div>
      </div>

      <h5 class="mt-4">Endereço do Segurado</h5>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="segurado_cep" class="form-label">CEP *</label>
          <input id="segurado_cep" class="form-control" placeholder="00000-000" required>
          <div class="invalid-feedback">Informe um CEP válido.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 mb-3">
          <label class="form-label">Logradouro</label>
          <input id="segurado_logradouro" class="form-control" readonly>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Número</label>
          <input id="segurado_numero" class="form-control">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Bairro</label>
          <input id="segurado_bairro" class="form-control" readonly>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Cidade</label>
          <input id="segurado_cidade" class="form-control" readonly>
        </div>
        <div class="col-md-2 mb-3">
          <label class="form-label">Estado</label>
          <input id="segurado_estado" class="form-control" readonly>
        </div>
      </div>
      
      <div class="mb-3">
        <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
        <input id="cnhSeg" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
        <div class="invalid-feedback">Faça o upload da CNH.</div>
      </div>

      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  solicitante: `
    <div class="form-step" data-step="5">
      <h4 class="mb-4">Dados do Colaborador</h4>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nome *</label>
          <input id="estipNome" class="form-control" required />
          <div class="invalid-feedback">Informe o nome.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Nome Social</label>
          <input id="estipNomeSocial" class="form-control" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="estipTipoPessoa" class="form-label">Tipo de pessoa *</label>
          <select id="estipTipoPessoa" class="form-select" required>
            <option value="">Selecione</option>
            <option value="pf">Pessoa Física</option>
            <option value="pj">Pessoa Jurídica</option>
          </select>
          <div class="invalid-feedback">Informe o tipo</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">CPF/CNPJ *</label>
          <input id="estipDocumento" class="form-control" placeholder="CPF ou CNPJ" required />
          <div class="invalid-feedback">Documento inválido.</div>
        </div>
      </div>
      <div class="row">
          <div class="col-md-4 mb-3">
              <label class="form-label">Data de Nascimento *</label>
              <input id="estipDataNascimento" type="date" class="form-control" required />
              <div class="invalid-feedback">Informe a data de nascimento.</div>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Estado Civil *</label>
              <select id="estipEstadoCivil" class="form-select" required>
                  <option value="">Selecione</option>
                  <option>Solteiro(a)</option>
                  <option>Casado(a)</option>
                  <option>Divorciado(a)</option>
                  <option>Viúvo(a)</option>
              </select>
              <div class="invalid-feedback">Informe o estado civil.</div>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Sexo *</label>
              <select id="estipSexo" class="form-select" required>
                  <option value="">Selecione</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
              </select>
              <div class="invalid-feedback">Informe o sexo.</div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-4 mb-3">
              <label class="form-label">Tipo Identidade *</label>
              <select id="tipoIdentidade" class="form-select" required>
                  <option value="">Selecione</option>
                  <option>CNH</option>
                  <option>CREA</option>
                  <option>MILITAR</option>
                  <option>CREA</option>
                  <option>ORDEM ADVOG BRASIL</option>
                  <option>PASSAPORTE</option>
                  <option>RG</option>
                  <option>OUTROS</option>
              </select>
              <div class="invalid-feedback">Informe o tipo de identidade.</div>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Nº Identidade *</label>
              <input id="estipNumIdentidade" class="form-control" required />
              <div class="invalid-feedback">Informe o nº da identidade.</div>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Órgão Emissor *</label>
              <input id="estipOrgaoEmissor" class="form-control" required />
              <div class="invalid-feedback">Informe o órgão emissor.</div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6 mb-3">
              <label class="form-label">Data de Emissão *</label>
              <input id="estipDataEmissao" type="date" class="form-control" required />
              <div class="invalid-feedback">Informe a data de emissão.</div>
          </div>
          <div class="col-md-6 mb-3">
              <label class="form-label">Estrangeiro? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="estipEstrangeiro" id="estipEstrangeiroSim" value="sim" required />
                      <label class="form-check-label" for="estipEstrangeiroSim">Sim</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="estipEstrangeiro" id="estipEstrangeiroNao" value="nao" required checked />
                      <label class="form-check-label" for="estipEstrangeiroNao">Não</label>
                  </div>
              </div>
          </div>
      </div>
      <div id="estipBlocoEstrangeiro" style="display: none;">
          <div class="row">
              <div class="col-md-4 mb-3">
                  <label class="form-label">País</label>
                  <input id="estipPais" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                  <label class="form-label">Tempo no País</label>
                  <input id="estipTempoPais" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                  <label class="form-label">País de Residência</label>
                  <input id="estipPaisResidencia" class="form-control" />
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-6 mb-3">
              <label class="form-label">Atividade Principal</label>
              <input id="estipAtividadePrincipal" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
              <label class="form-label">Faixa de Renda Mensal</label>
              <input id="estipFaixaRenda" class="form-control" />
          </div>
      </div>
      <div class="row">
          <div class="col-md-12 mb-3">
              <label class="form-label">Pessoa Politicamente Exposta? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="estipPPE" id="estipPPESim" value="sim" required />
                      <label class="form-check-label" for="estipPPESim">Sim</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="estipPPE" id="estipPPENao" value="nao" required checked />
                      <label class="form-check-label" for="estipPPENao">Não</label>
                  </div>
              </div>
          </div>
      </div>
      <div id="estipBlocoPPE" style="display: none;">
          <div class="row">
              <div class="col-md-4 mb-3">
                  <label class="form-label">Nome</label>
                  <input id="estipPPENome" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                  <label class="form-label">CPF</label>
                  <input id="estipPPECPF" class="form-control" />
              </div>
              <div class="col-md-4 mb-3">
                  <label class="form-label">Grau de Relacionamento</label>
                  <input id="estipPPEGrauRelacionamento" class="form-control" />
              </div>
          </div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  veiculo: `
    <div class="form-step" data-step="5">
      <h4 class="mb-4">Dados do veículo</h4>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label class="form-label">Placa *</label>
          <input id="veiPlaca" class="form-control" placeholder="ABC1D23" required />
          <div class="invalid-feedback">Placa inválida.</div>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Chassi *</label>
          <input id="veiChassi" class="form-control" minlength="5" required />
          <div class="invalid-feedback">Informe o chassi.</div>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Renavam *</label>
          <input id="veiRenavam" class="form-control" required />
          <div class="invalid-feedback">Informe o Renavam.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label class="form-label">Fabricante *</label>
          <input id="veiFab" class="form-control" required />
          <div class="invalid-feedback">Informe o fabricante.</div>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Modelo *</label>
          <input id="veiModelo" class="form-control" required />
          <div class="invalid-feedback">Informe o modelo.</div>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Ano *</label>
          <input id="veiAno" type="number" class="form-control" min="1980" max="2099" required />
          <div class="invalid-feedback">Informe o ano.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Uso *</label>
          <select id="veiUso" class="form-select" required>
            <option value="">Selecione</option>
            <option>Particular</option> <option>Comercial</option> <option>Aplicativo</option>
          </select>
          <div class="invalid-feedback">Informe o uso.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Lotação *</label>
          <input id="veiLotacao" type="number" class="form-control" min="1" required />
          <div class="invalid-feedback">Informe a lotação.</div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Upload CLRV (PDF/JPG/PNG) *</label>
        <input id="veiCNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
        <div class="invalid-feedback">Faça o upload do CLRV.</div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  auxiliares: `
    <div class="form-step" data-step="6">
      <h4 class="mb-4">Condutores Auxiliares</h4>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="addAuxiliar" onchange="toggleAuxiliares(this.checked)">
        <label class="form-check-label" for="addAuxiliar">
          Adicionar condutor auxiliar
        </label>
      </div>

      <div id="auxiliaresContainer" style="display: none;">
        <div class="auxiliar-block mb-3">
          <h5>Condutor Auxiliar 1</h5>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nome Completo *</label>
              <input id="aux1Nome" class="form-control" />
              <div class="invalid-feedback">Informe o nome.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF *</label>
              <input id="aux1CPF" class="form-control" placeholder="000.000.000-00" />
              <div class="invalid-feedback">CPF inválido.</div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
            <input id="aux1CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
            <div class="invalid-feedback">Faça o upload da CNH.</div>
          </div>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="addAuxiliar2" onchange="toggleAuxiliar2(this.checked)">
          <label class="form-check-label" for="addAuxiliar2">
            Adicionar um segundo condutor auxiliar
          </label>
        </div>

        <div id="auxiliar2Container" style="display: none;" class="auxiliar-block mb-3">
          <h5>Condutor Auxiliar 2</h5>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nome Completo *</label>
              <input id="aux2Nome" class="form-control" />
              <div class="invalid-feedback">Informe o nome.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF *</label>
              <input id="aux2CPF" class="form-control" placeholder="000.000.000-00" />
              <div class="invalid-feedback">CPF inválido.</div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
            <input id="aux2CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
            <div class="invalid-feedback">Faça o upload da CNH.</div>
          </div>
        </div>
      </div>

      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  estipulante: `
    <div class="form-step" data-step="6">
      <h4 class="mb-4">Dados do Estipulante</h4>
      <div class="row">
        <div class="col-md-12 mb-3">
          <label for="cnpj" class="form-label">CNPJ *</label>
          <input id="cnpj" class="form-control" placeholder="00.000.000/0000-00" required>
           <div class="invalid-feedback">Informe um CNPJ válido.</div>
        </div>
      </div>

      <div id="resultadoEstipulante" class="mt-3">
        <!-- Os dados do estipulante serão exibidos aqui -->
      </div>

      <h5 class="mt-4">Endereço do Estipulante</h5>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="cep" class="form-label">CEP *</label>
          <input id="cep" class="form-control" placeholder="00000-000" required>
          <div class="invalid-feedback">Informe um CEP válido.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 mb-3">
          <label class="form-label">Logradouro</label>
          <input id="logradouro" class="form-control" readonly>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Número</label>
          <input id="numero" class="form-control">
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Bairro</label>
          <input id="bairro" class="form-control" readonly>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Cidade</label>
          <input id="cidade" class="form-control" readonly>
        </div>
        <div class="col-md-2 mb-3">
          <label class="form-label">Estado</label>
          <input id="estado" class="form-control" readonly>
        </div>
      </div>
      
      <div class="mb-3">
        <label class="form-label">Upload Comprovante Residência (PDF/JPG/PNG) *</label>
        <input id="comprovante" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
        <div class="invalid-feedback">Faça o upload do Comprovante.</div>
      </div>

      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  consentimento: `
    <div class="form-step" data-step="7">
      <h4 class="mb-3">Informações adicionais</h4>
      <div class="mb-3">
        <textarea id="infoAdicionais" class="form-control" rows="4" placeholder="Observações relevantes (ex.: restrições, perícia, etc.)"></textarea>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="termos" required />
        <label class="form-check-label" for="termos">
          Li e concordo com os termos e condições. *
        </label>
        <div class="invalid-feedback">Você deve aceitar os termos.</div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>`,
  enviar: `
    <div class="form-step" data-step="8">
      <h4 class="mb-3">Enviar solicitação</h4>
      <p class="text-muted">Revise seus dados. Ao clicar em “Finalizar”, confirmaremos o envio.</p>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="submit" class="btn btn-success">
          <i class="bi bi-check-circle"></i> Finalizar
        </button>
      </div>
    </div>`,
  // --- TEMPLATES PARA OUTROS FLUXOS (Exemplos) ---
  renovacao_apolice: `
    <div class="form-step" data-step="1">
      <h4 class="mb-4">Dados da Apólice Anterior</h4>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="renovApolice" class="form-label">Número da Apólice *</label>
          <input id="renovApolice" class="form-control" required placeholder="Ex: 938-..." />
          <div class="invalid-feedback">Informe a apólice anterior.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="renovVencimento" class="form-label">Data de Vencimento *</label>
          <input type="date" id="renovVencimento" class="form-control" required />
          <div class="invalid-feedback">Informe a data de vencimento.</div>
        </div>
      </div>
      <div class="mb-3">
        <label for="renovSeguradora" class="form-label">Seguradora Vencendo *</label>
        <select id="renovSeguradora" class="form-select" required>
          <option value="">Selecione</option>
          <option value="aruana">Aruana</option>
          <option value="outra">Outra</option>
        </select>
        <div class="invalid-feedback">Informe a seguradora.</div>
      </div>
      <div class="mb-3" id="outraSeguradoraContainer" style="display: none;">
        <label for="outraSeguradoraNome" class="form-label">Nome da outra seguradora *</label>
        <input type="text" id="outraSeguradoraNome" class="form-control" />
        <div class="invalid-feedback">Por favor, informe o nome da outra seguradora.</div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
      </div>
    </div>`,
      endosso_dados: `
        <div class="form-step" data-step="1">
          <h4 class="mb-4">Dados para Endosso</h4>
          
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nome Completo ou Razão Social *</label>
              <input id="endossoNome" class="form-control" required />
              <div class="invalid-feedback">Informe o nome ou a razão social.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF ou CNPJ *</label>
              <input id="endossoDocumento" class="form-control" placeholder="CPF ou CNPJ" required />
              <div class="invalid-feedback">Documento inválido.</div>
            </div>
          </div>

          <div class="mb-3">
            <label for="endossoSeguradora" class="form-label">Seguradora *</label>
            <select id="endossoSeguradora" class="form-select" required>
              <option value="">Selecione</option>
              <option value="aruana">Aruana</option>
              <option value="mbm">MBM</option>
              <option value="outra">Outra</option>
            </select>
            <div class="invalid-feedback">Informe a seguradora.</div>
          </div>
          <div class="mb-3" id="endossoOutraSeguradoraContainer" style="display: none;">
            <label for="endossoOutraSeguradoraNome" class="form-label">Nome da outra seguradora *</label>
            <input type="text" id="endossoOutraSeguradoraNome" class="form-control" />
            <div class="invalid-feedback">Informe o nome da outra seguradora.</div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Número da apólice APP</label>
              <input id="endossoApoliceAPP" class="form-control" />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Número Apólice RCF</label>
              <input id="endossoApoliceRCF" class="form-control" />
            </div>
          </div>

          <div class="mb-3">
            <label for="endossoTipo" class="form-label">Tipo de solicitação *</label>
            <select id="endossoTipo" class="form-select" required>
              <option value="">Selecione</option>
              <option value="substituicao_veiculo">Substituição de veículo / Correção de dados do veículo</option>
              <option value="inclusao_condutor">Inclusão ou exclusão de condutor auxiliar</option>
              <option value="alteracao_endereco">Alteração de endereço, e-mail ou telefone</option>
              <option value="correcao_cadastral">Correção de dados cadastrais (nome, CPF, etc.)</option>
            </select>
            <div class="invalid-feedback">Selecione o tipo de solicitação.</div>
          </div>

          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,
      endosso_veiculo: `
        <div class="form-step" data-step="2">
          <h4 class="mb-4">Dados do Veículo para Substituição</h4>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Placa na Apólice *</label>
              <input id="endossoVeiculoPlacaAtual" class="form-control" required />
              <div class="invalid-feedback">Informe a placa atual.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Placa Nova *</label>
              <input id="endossoVeiculoPlacaNova" class="form-control" required />
              <div class="invalid-feedback">Informe a nova placa.</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">CHASSI *</label>
              <input id="endossoVeiculoChassi" class="form-control" required />
              <div class="invalid-feedback">Informe o chassi.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">RENAVAM *</label>
              <input id="endossoVeiculoRenavam" class="form-control" required />
              <div class="invalid-feedback">Informe o RENAVAM.</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Fabricante *</label>
              <input id="endossoVeiculoFab" class="form-control" required />
              <div class="invalid-feedback">Informe o fabricante.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Modelo *</label>
              <input id="endossoVeiculoModelo" class="form-control" required />
              <div class="invalid-feedback">Informe o modelo.</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Ano - Fabricação/Modelo *</label>
              <input id="endossoVeiculoAno" class="form-control" placeholder="Ex: 2023/2024" required />
              <div class="invalid-feedback">Informe o ano.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Lotação *</label>
              <input id="endossoVeiculoLotacao" type="number" class="form-control" required />
              <div class="invalid-feedback">Informe a lotação.</div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload CRLV (PDF/JPG/PNG) *</label>
            <input id="endossoVeiculoCRLV" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
            <div class="invalid-feedback">Faça o upload do CRLV.</div>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()"><i class="bi bi-arrow-right"></i> Próximo</button>
          </div>
        </div>`,
      endosso_qa_inicial: `
        <div class="form-step" data-step="2">
          <h4 class="mb-4">Inclusão/Exclusão de Condutor</h4>
          <div class="mb-3">
            <label for="endossoQaInicial" class="form-label">Quantos condutores auxiliares existem na apólice atualmente? *</label>
            <select id="endossoQaInicial" class="form-select" required>
              <option value="">Selecione</option>
              <option value="0">Nenhum (0)</option>
              <option value="1">1 condutor</option>
              <option value="2">2 condutores</option>
            </select>
            <div class="invalid-feedback">Selecione a quantidade atual.</div>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,
      endosso_acao_qa0: `
        <div class="form-step" data-step="3">
          <h4 class="mb-4">Ação Desejada (Nenhum condutor auxiliar)</h4>
          <div class="mb-3">
            <label for="endossoAcao" class="form-label">O que você deseja fazer? *</label>
            <select id="endossoAcao" class="form-select" required>
              <option value="">Selecione</option>
              <option value="add_1">Adicionar 1 auxiliar</option>
              <option value="add_2">Adicionar 2 auxiliares</option>
            </select>
            <div class="invalid-feedback">Selecione uma ação.</div>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,
      endosso_acao_qa1: `
        <div class="form-step" data-step="3">
          <h4 class="mb-4">Ação Desejada (1 condutor auxiliar)</h4>
          <div class="mb-3">
            <label for="endossoAcao" class="form-label">O que você deseja fazer? *</label>
            <select id="endossoAcao" class="form-select" required>
              <option value="">Selecione</option>
              <option value="retirar_atual">Retirar o atual (ficar sem)</option>
              <option value="retirar_incluir_novo">Retirar o atual e incluir novo</option>
              <option value="manter_add_outro">Manter o atual e adicionar outro</option>
            </select>
            <div class="invalid-feedback">Selecione uma ação.</div>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,
      endosso_acao_qa2: `
        <div class="form-step" data-step="3">
          <h4 class="mb-4">Ação Desejada (2 condutores auxiliares)</h4>
          <div class="mb-3">
            <label for="endossoAcao" class="form-label">O que você deseja fazer? *</label>
            <select id="endossoAcao" class="form-select" required>
              <option value="">Selecione</option>
              <option value="retirar_1_manter_1">Retirar 1 e manter o outro</option>
              <option value="retirar_1_incluir_1">Retirar 1 e incluir 1 novo</option>
              <option value="retirar_2_ficar_sem">Retirar 2 e ficar sem</option>
              <option value="retirar_2_incluir_1">Retirar 2 e incluir 1 novo</option>
              <option value="retirar_2_incluir_2">Retirar 2 e incluir 2 novos</option>
            </select>
            <div class="invalid-feedback">Selecione uma ação.</div>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,
      endosso_alteracao_contato: `
        <div class="form-step" data-step="2">
          <h4 class="mb-4">Alteração de Contato</h4>
          <p class="text-muted">Preencha apenas os campos que deseja alterar.</p>
          <div class="mb-3">
            <label class="form-label">Novo Endereço</label>
            <input id="endossoNovoEndereco" class="form-control" />
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Novo E-mail</label>
              <input id="endossoNovoEmail" type="email" class="form-control" />
              <div class="invalid-feedback">E-mail inválido.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Novo Telefone</label>
              <input id="endossoNovoTelefone" class="form-control" placeholder="(00) 00000-0000" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload Comprovante de Endereço (PDF/JPG/PNG) *</label>
            <input id="endossoNovoEnderecoComp" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
            <div class="invalid-feedback">Faça o upload do comprovante de endereço.</div>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,
      endosso_correcao_cadastral: `
        <div class="form-step" data-step="2">
          <h4 class="mb-4">Correção de Dados Cadastrais</h4>
          <div class="mb-3">
            <label class="form-label">Tipo de pessoa *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoPessoa" id="pf" value="pf" required checked />
                <label class="form-check-label" for="pf">Pessoa Física</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoPessoa" id="pj" value="pj" required />
                <label class="form-check-label" for="pj">Pessoa Jurídica</label>
              </div>
            </div>
            <div class="invalid-feedback">Escolha PF ou PJ.</div>
          </div>
          <div id="blocoPF">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nome completo *</label>
                <input id="segNomePF" class="form-control" />
                <div class="invalid-feedback">Informe o nome.</div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">CPF *</label>
                <input id="segCPF" class="form-control" placeholder="000.000.000-00" />
                <div class="invalid-feedback">CPF inválido.</div>
              </div>
            </div>
          </div>
          <div id="blocoPJ" style="display: none">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Razão Social *</label>
                <input id="segRazao" class="form-control" />
                <div class="invalid-feedback">Informe a razão social.</div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">CNPJ *</label>
                <input id="segCNPJ" class="form-control" placeholder="00000000000000" />
                <div class="invalid-feedback">CNPJ inválido.</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload CNH do Segurado (PDF/JPG/PNG) *</label>
            <input id="endossoCorrecaoCNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
            <div class="invalid-feedback">Faça o upload da CNH.</div>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,

  renovacao_confirmar: `
    <div class="form-step" data-step="2">
      <h4 class="mb-4">Confirmar Dados</h4>
      <p class="text-muted">Verifique os dados da apólice anterior e do segurado antes de confirmar.</p>
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Dados da Apólice Anterior</h5>
          <p><strong>Número da Apólice:</strong> <span id="displayRenovApolice"></span></p>
          <p><strong>Vencimento:</strong> <span id="displayRenovVencimento"></span></p>
          <p><strong>Seguradora:</strong> <span id="displayRenovSeguradora"></span></p>
          <p id="displayRenovOutraSeguradora" style="display: none;"><strong>Nome da Outra Seguradora:</strong> <span id="displayRenovOutraSeguradoraNome"></span></p>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Dados do Segurado</h5>
          <p><strong>Tipo de Pessoa:</strong> <span id="displaySegTipoPessoa"></span></p>
          <p><strong>Nome/Razão Social:</strong> <span id="displaySegNomeRazao"></span></p>
          <p><strong>CPF/CNPJ:</strong> <span id="displaySegDocumento"></span></p>
        </div>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="renovConfirm" required />
        <label class="form-check-label" for="renovConfirm">Os dados estão corretos. *</label>
        <div class="invalid-feedback">Você deve confirmar que os dados estão corretos.</div>
      </div>
      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
        <button type="submit" class="btn btn-success"><i class="bi bi-check-circle"></i> Finalizar Renovação</button>
      </div>
    </div>`,
          endosso_dados_condutor_1: `
            <div class="form-step" data-step="4">
              <h4 class="mb-4">Dados do Novo Condutor Auxiliar</h4>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label class="form-label">Nome Completo *</label>
                  <input id="endossoCondutor1Nome" class="form-control" required />
                  <div class="invalid-feedback">Informe o nome do condutor.</div>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">CPF *</label>
                  <input id="endossoCondutor1CPF" class="form-control" placeholder="00000000000" required />
                  <div class="invalid-feedback">CPF inválido.</div>
                </div>
              </div>
              <div class="btn-group-navigation">
                <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
                <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
              </div>
            </div>`,
          endosso_dados_condutor_2: `
            <div class="form-step" data-step="4">
              <h4 class="mb-4">Dados dos Novos Condutores Auxiliares</h4>
              <p class="text-muted">Condutor 1</p>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label class="form-label">Nome Completo *</label>
                  <input id="endossoCondutor1Nome" class="form-control" required />
                  <div class="invalid-feedback">Informe o nome do condutor 1.</div>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">CPF *</label>
                  <input id="endossoCondutor1CPF" class="form-control" placeholder="000000000-00" required />
                  <div class="invalid-feedback">CPF inválido.</div>
                </div>
              </div>
              <hr>
              <p class="text-muted">Condutor 2</p>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label class="form-label">Nome Completo *</label>
                  <input id="endossoCondutor2Nome" class="form-control" required />
                  <div class="invalid-feedback">Informe o nome do condutor 2.</div>
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">CPF *</label>
                  <input id="endossoCondutor2CPF" class="form-control" placeholder="00000000000" required />
                  <div class="invalid-feedback">CPF inválido.</div>
                </div>
              </div>
              <div class="btn-group-navigation">
                <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
                <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
              </div>
            </div>`,
      segunda_via_docs: `
        <div class="form-step" data-step="1">
          <h4 class="mb-4">2ª Via de Documentos/Posição Financeira</h4>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nome Completo ou Razão Social *</label>
              <input id="segundaViaNome" class="form-control" required />
              <div class="invalid-feedback">Informe o nome ou a razão social.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF ou CNPJ *</label>
              <input id="segundaViaDocumento" class="form-control" placeholder="CPF ou CNPJ" required />
              <div class="invalid-feedback">Documento inválido.</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="segundaViaTipoDoc" class="form-label">Tipo de Documento *</label>
            <select id="segundaViaTipoDoc" class="form-select" required>
              <option value="">Selecione</option>
              <option value="kit_proposta">Kit proposta e cobrança</option>
              <option value="kit_apolice">Kit apólice e posição financeira</option>
              <option value="posicao_financeira">Posição Financeira</option>
              <option value="boletos">Boletos em aberto</option>
              <option value="outra">Outra</option>
            </select>
          </div>
          <div class="mb-3" id="segundaViaOutroContainer" style="display: none;">
            <label for="segundaViaOutroNome" class="form-label">Especifique o documento *</label>
            <input type="text" id="segundaViaOutroNome" class="form-control" />
            <div class="invalid-feedback">Especifique o tipo de documento.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Responsável pelo Pedido *</label>
            <input id="segundaViaResponsavel" class="form-control" required />
            <div class="invalid-feedback">Informe o nome do responsável.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Observações complementares</label>
            <textarea id="segundaViaObs" class="form-control" rows="3"></textarea>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="submit" class="btn btn-success"><i class="bi bi-check-circle"></i> Enviar Solicitação</button>
          </div>
        </div>`,
      financeiro_regularizacao: `
        <div class="form-step" data-step="1">
          <h4 class="mb-4">Financeiro Regularização</h4>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nome Completo ou Razão Social *</label>
              <input id="finRegNome" class="form-control" required />
              <div class="invalid-feedback">Informe o nome ou a razão social.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF ou CNPJ *</label>
              <input id="finRegDocumento" class="form-control" placeholder="CPF ou CNPJ" required />
              <div class="invalid-feedback">Documento inválido.</div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Data de vencimento em aberto *</label>
            <input type="date" id="finRegDataVencimento" class="form-control" required />
            <div class="form-text text-muted">Os pedidos de atualização de parcelas dependem de avaliação da Seguradora. Após a data máxima descrita no boleto, a apólice encontra-se automaticamente na esteira de envio ao processo de cancelamento.</div>
            <div class="invalid-feedback">Informe a data de vencimento em aberto.</div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Parcela em Aberto *</label>
              <input type="text" id="finRegParcela" class="form-control" required />
              <div class="invalid-feedback">Informe a parcela em aberto.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Número Apólice RCF</label>
              <input type="text" id="finRegApoliceRCF" class="form-control" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Motivo Inadimplência *</label>
            <textarea id="finRegMotivo" class="form-control" rows="3" required></textarea>
            <div class="invalid-feedback">Informe o motivo da inadimplência.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Responsável pelo Pedido *</label>
            <input id="finRegResponsavel" class="form-control" required />
            <div class="invalid-feedback">Informe o nome do responsável pelo pedido.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Observações Complementares</label>
            <textarea id="finRegObs" class="form-control" rows="3"></textarea>
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="submit" class="btn btn-success"><i class="bi bi-check-circle"></i> Enviar Solicitação</button>
          </div>
        </div>`,
    };
// =================================================================
// 2. CONFIGURAÇÃO DOS FLUXOS
// =================================================================
const fluxosConfig = {
  nova: {
    description: "Preencha os dados para Nova Transmissão",
    steps: [
      { label: "Tipo", template: "tipo" },
      { label: "Identificação", template: "tipo_solicitante" },
    ],
  },
  renovacao: {
    description: "Siga as 4 etapas para solicitar a Renovação",
    steps: [
      { label: "Tipo", template: "tipo" },
      { label: "Apólice", template: "renovacao_apolice" },
      { label: "Segurado", template: "segurado" },
      { label: "Confirmar", template: "renovacao_confirmar" },
    ],
  },
  endosso: {
    description: "Siga as etapas para solicitar o Endosso",
    steps: [
      { label: "Tipo", template: "tipo" },
      { label: "Dados", template: "endosso_dados" },
    ],
  },
  segunda_via: {
    description: "Solicite 2ª Via de Documentos ou Posição Financeira",
    steps: [
      { label: "Tipo", template: "tipo" },
      { label: "Dados", template: "segunda_via_docs" },
      { label: "Enviar", template: "enviar" },
    ],
  },
  financeiro_regularizacao: {
    description: "Solicite Regularização Financeira",
    steps: [
      { label: "Tipo", template: "tipo" },
      { label: "Dados", template: "financeiro_regularizacao" },
      { label: "Enviar", template: "enviar" },
    ],
  },
};

// =================================================================
// 3. ESTADO GLOBAL E RENDERIZAÇÃO
// =================================================================
let currentStep = 0;
let currentFluxo = "";
let activeSteps = []; // Array de etapas ativas para o fluxo atual
let formDataStorage = {}; // Objeto para armazenar os dados do formulário

function renderizarFluxo(tipo) {
  currentFluxo = tipo;
  const config = fluxosConfig[tipo];

  if (!config || config.steps.length === 0) {
    document.getElementById("formDescription").textContent =
      config?.description || "Selecione um tipo de solicitação para começar";
    document.querySelector(".progress-container").innerHTML = "";
    document.querySelector(".form-content").style.display = "none";
    activeSteps = []; // Limpa as etapas ativas
    return;
  }

  // Clona as etapas iniciais do fluxo para o estado ativo
  activeSteps = JSON.parse(JSON.stringify(config.steps));
  currentStep = 0;

  // Mostra containers e atualiza header
  document.getElementById("initialStep").style.display = "none";
  document.querySelector(".form-content").style.display = "block";
  document.getElementById("formDescription").textContent = config.description;

  renderForm(); // Chama a função que renderiza o formulário
  updateProgress();
}

function renderForm() {
  const progressContainer = document.querySelector(".progress-container");
  progressContainer.innerHTML = `
    <div class="step-indicator">
      <div class="progress-line" id="progressLine"></div>
      ${activeSteps.map((step, index) => `
        <div class="step" data-step="${index}">
          <div class="step-circle">${index}</div>
          <div class="step-label">${step.label}</div>
        </div>`
      ).join("")}
    </div>`;

  const form = document.getElementById("multiStepForm");
  form.innerHTML = activeSteps.map((step, index) => {
      const template = stepTemplates[step.template];
      // Injeta o data-step correto no template de forma mais robusta
      return template.replace('<div class="form-step"', `<div class="form-step" data-step="${index}"`);
    }).join("");

  // Atualiza o nome do tipo selecionado na primeira etapa
  const tipoSelecionadoEl = document.getElementById("tipoSelecionado");
  if (tipoSelecionadoEl) {
    const select = document.getElementById("tipoSolicitacao");
    tipoSelecionadoEl.textContent = select.options[select.selectedIndex].text;
  }
  
  // Adiciona listeners e máscaras novamente, pois o DOM foi recriado
  addListenersAndMasks();
}

function updateProgress() {
  const totalSteps = activeSteps.length;
  if (totalSteps <= 1) {
    document.getElementById("progressLine").style.width = "0%";
  } else {
    const percentage = (currentStep / (totalSteps - 1)) * 100;
    document.getElementById("progressLine").style.width = percentage + "%";
  }

  document.querySelectorAll(".step").forEach((stepEl) => {
    const stepNumber = Number(stepEl.dataset.step);
    stepEl.classList.remove("active", "completed");
    if (stepNumber < currentStep) {
      stepEl.classList.add("completed");
      stepEl.querySelector(".step-circle").innerHTML = 
        '<i class="bi bi-check-lg"></i>';
    } else if (stepNumber === currentStep) {
      stepEl.classList.add("active");
      stepEl.querySelector(".step-circle").textContent = stepNumber;
    } else {
      stepEl.querySelector(".step-circle").textContent = stepNumber;
    }
  });

  document.querySelectorAll(".form-step").forEach((step) => {
    step.classList.toggle("active", Number(step.dataset.step) === currentStep);
  });

  // Popula a etapa de confirmação da renovação se for a etapa ativa
  if (currentFluxo === 'renovacao' && activeSteps[currentStep]?.template === 'renovacao_confirmar') {
    populateRenovacaoConfirmacao();
  }
}

// =================================================================
// 4. VALIDAÇÃO E NAVEGAÇÃO
// =================================================================
function validateStep(step) {
  const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
  if (!currentStepElement) return true; // Se a etapa não existe, não há o que validar

  const inputs = currentStepElement.querySelectorAll("input[required], select[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    let fieldValid = input.checkValidity();
    
    // Regras customizadas por campo
    if (input.id === "solEmail" && input.value && !isValidEmail(input.value)) fieldValid = false;
    if ((input.id === "solDocumento" || input.id === "endossoDocumento" || input.id === "segundaViaDocumento" || input.id === "finRegDocumento") && input.value) {
      const raw = input.value;
      if (!(onlyDigits(raw).length <= 11 ? validaCPF(raw) : validaCNPJ(raw))) fieldValid = false;
    }
    if ((input.id === "segCPF" || input.id === "endossoCondutor1CPF" || input.id === "endossoCondutor2CPF") && input.required && !validaCPF(input.value)) fieldValid = false;
    if (input.id === "segCNPJ" && input.required && !validaCNPJ(input.value)) fieldValid = false;
    if ((input.id === "veiPlaca" || input.id === "endossoVeiculoPlacaAtual" || input.id === "endossoVeiculoPlacaNova") && input.value) {
      if (!/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(input.value.toUpperCase())) fieldValid = false;
    }

    if (!fieldValid) isValid = false;
    input.classList.toggle("is-invalid", !fieldValid);
  });

  if (activeSteps[step]?.template === 'estipulante') {
    const resultadoDiv = document.getElementById('resultadoEstipulante');
    if (!resultadoDiv.querySelector('select')) {
      isValid = false;
      const cnpjInput = document.getElementById('cnpj');
      cnpjInput.classList.add('is-invalid');
      resultadoDiv.innerHTML = `<div class="alert alert-danger">É necessário buscar e selecionar um estipulante válido.</div>`;
    }
  }

  return isValid;
}

function nextStep() {
  if (!validateStep(currentStep)) return;

  const currentStepConfig = activeSteps[currentStep];
  let needsDynamicRender = false;
  let stepsToAdd = [];

  if (currentFluxo === 'nova' && currentStepConfig.template === 'tipo_solicitante') {
    needsDynamicRender = true;
    const tipoSolicitante = document.getElementById('tipoSolicitante').value;

    // const stepsAfterTipoSolicitante = [
    //     { label: "Tipo", template: "tipo_para_nova" },  
    // ];

const baseStepsAfter = [
        // { label: "Produtos", template: "produtos" },
        // { label: "Coberturas", template: "coberturas" },
        { label: "Parcelas", template: "parcelas"},
        { label: "Veículo", template: "veiculo" },
        { label: "Auxiliares", template: "auxiliares" },
        { label: "Info & Consent.", template: "consentimento" },
        { label: "Enviar", template: "enviar" }
    ];

    let dynamicSteps = [];
    if (tipoSolicitante === 'segurado') {
        dynamicSteps.push({ label: "Segurado", template: "segurado" });
    } else if (tipoSolicitante === 'estipulante') {
        dynamicSteps.push({ label: "Estipulante", template: "estipulante" });
        dynamicSteps.push({ label: "Segurado", template: "segurado" });
    } else if (tipoSolicitante === 'colaborador') {
        dynamicSteps.push({ label: "Solicitante", template: "solicitante" });
    }

    // TALVEZ MEXER AQUI
    activeSteps.splice(currentStep + 1, activeSteps.length - currentStep - 1, ...dynamicSteps, ...baseStepsAfter);
  }

  // Lógica para adicionar etapas dinâmicas
  if (currentFluxo === 'endosso') {
    if (currentStepConfig.template === 'endosso_dados') {
      needsDynamicRender = true;
      const tipoEndosso = document.getElementById('endossoTipo').value;
      activeSteps.splice(currentStep + 1); // Limpa etapas futuras

      if (tipoEndosso === 'substituicao_veiculo') {
        stepsToAdd.push({ label: "Veículo", template: "endosso_veiculo" });
      } else if (tipoEndosso === 'inclusao_condutor') {
        stepsToAdd.push({ label: "Condutores", template: "endosso_qa_inicial" });
      } else if (tipoEndosso === 'alteracao_endereco') {
        stepsToAdd.push({ label: "Contato", template: "endosso_alteracao_contato" });
      } else if (tipoEndosso === 'correcao_cadastral') {
        stepsToAdd.push({ label: "Correção", template: "endosso_correcao_cadastral" });
      }

      // Todos os sub-fluxos de endosso terminam com a etapa de envio
      stepsToAdd.push({ label: "Enviar", template: "enviar" });

    } else if (currentStepConfig.template === 'endosso_qa_inicial') {
      needsDynamicRender = true;
      const qaInicial = document.getElementById('endossoQaInicial').value;
      activeSteps.splice(currentStep + 1); // Limpa etapas futuras

      let proximaEtapaTemplate = '';
      switch (qaInicial) {
        case '0': proximaEtapaTemplate = 'endosso_acao_qa0'; break;
        case '1': proximaEtapaTemplate = 'endosso_acao_qa1'; break;
        case '2': proximaEtapaTemplate = 'endosso_acao_qa2'; break;
      }
      if (proximaEtapaTemplate) {
        stepsToAdd.push({ label: "Ação", template: proximaEtapaTemplate });
      }
    } else if (currentStepConfig.template.startsWith('endosso_acao_qa')) {
      needsDynamicRender = true;
      const acao = document.getElementById('endossoAcao').value;
      activeSteps.splice(currentStep + 1); // Limpa etapas futuras

      // Determina qual formulário de dados mostrar
      if (['add_1', 'retirar_incluir_novo', 'manter_add_outro', 'retirar_1_incluir_1', 'retirar_2_incluir_1'].includes(acao)) {
        stepsToAdd.push({ label: "Dados Condutor", template: "endosso_dados_condutor_1" });
      } else if (['add_2', 'retirar_2_incluir_2'].includes(acao)) {
        stepsToAdd.push({ label: "Dados Condutores", template: "endosso_dados_condutor_2" });
      }
      
      // Todas as ações levam para a etapa final de envio
      stepsToAdd.push({ label: "Enviar", template: "enviar" });
    }
  }

  // Se uma etapa dinâmica precisa ser adicionada/renderizada
  if (needsDynamicRender) {
    // 1. Salva o estado atual do formulário
    const formDataBeforeRender = {};
    const allInputs = document.getElementById('multiStepForm').querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
      if (input.id) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          formDataBeforeRender[input.id] = input.checked;
        } else {
          formDataBeforeRender[input.id] = input.value;
        }
      }
    });

    // Adiciona as novas etapas ao fluxo
    activeSteps.push(...stepsToAdd);
    
    renderForm(); // Re-renderiza o formulário

    // 2. Restaura o estado do formulário
    Object.keys(formDataBeforeRender).forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        const value = formDataBeforeRender[id];
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = value;
        } else {
          input.value = value;
        }
      }
    });

    // Re-executa a lógica de visibilidade para campos condicionais
    toggleOutraSeguradora();
    toggleEndossoOutraSeguradora();
    handleRcfVisibility();
    handleAppVisibility();
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

function resetForm() {
  document.getElementById("multiStepForm").style.display = "block";
  document.getElementById("successMessage").classList.remove("active");
  
  document.getElementById("initialStep").style.display = "block";
  document.querySelector(".form-content").style.display = "none";
  document.querySelector(".progress-container").innerHTML = "";
  document.getElementById("tipoSolicitacao").value = "";
  document.getElementById("formDescription").textContent = "Selecione um tipo de solicitação para começar";

  currentStep = 0;
  totalSteps = 0;
  currentFluxo = "";
}

// =================================================================
// 5. VALIDAÇÃO UTILITÁRIA E MÁSCARAS (sem alterações)
// =================================================================
const onlyDigits = (s) => (s || "").replace(/\\D/g, "");
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validaCPF = (cpf) => {
  cpf = onlyDigits(cpf);
  if (!cpf || cpf.length !== 11 || /^(\\d)\\1{10}$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
};
const validaCNPJ = (cnpj) => {
  cnpj = onlyDigits(cnpj);
  if (!cnpj || cnpj.length !== 14 || /^(\\d)\\1{13}$/.test(cnpj)) return false;
  let tamanho = cnpj.length - 2, numeros = cnpj.substring(0, tamanho), digitos = cnpj.substring(tamanho), soma = 0, pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado == digitos.charAt(1);
};

// =================================================================
// 6. LISTENERS E INICIALIZAÇÃO
// =================================================================
function addListenersAndMasks() {
  const form = document.getElementById("multiStepForm");

  // Impede o envio do formulário ao pressionar Enter em um input
  form.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
      event.preventDefault();
    }
  });

  // Para evitar listeners duplicados, removemos o antigo antes de adicionar um novo
  if (window.formSubmitHandler) {
    form.removeEventListener("submit", window.formSubmitHandler);
  }

  window.formSubmitHandler = async function (e) {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    const select = document.getElementById("tipoSolicitacao");
    const tipoText = select.options[select.selectedIndex].text;
    if (!confirm(`Confirmar envio da solicitação de ${tipoText}?`)) return;

    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';

    // const powerAutomateUrls = {
    //   nova: 'https://e1b82d98c0c4efb7972bac26ccc599.ed.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/bb0741a77ad2482695083f8eea76af57/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CCQQvWjQfkRO26M9m1WVe5UoFX1HY5pFR8svJERAIbo',
    //   renovacao: 'https://e1b82d98c0c4efb7972bac26ccc599.ed.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/284cd1c4bf544f5f8055542fec59e994/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WwYcTkLu_T9Eql_7xF4KomGHvNCuewnGP1kXdXLIDDg',
    //   endosso: 'URL_DO_FLUXO_DE_ENDOSSO_AQUI',
    //   segunda_via: 'URL_DO_FLUXO_DE_SEGUNDA_VIA_AQUI',
    //   financeiro_regularizacao: 'URL_DO_FLUXO_DE_FINANCEIRO_REGULARIZACAO_AQUI',
    // };

    let formData = {};
    let targetUrl = 'https://e1b82d98c0c4efb7972bac26ccc599.ed.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/284cd1c4bf544f5f8055542fec59e994/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WwYcTkLu_T9Eql_7xF4KomGHvNCuewnGP1kXdXLIDDg';

    switch (currentFluxo) {
      case 'nova':
        const rcfPolicySelect = document.getElementById('rcf_policy_select');
        const appPolicySelect = document.getElementById('app_policy_select');

        const rcfData = rcfPolicySelect ? JSON.parse(rcfPolicySelect.value) : {};
        const appData = appPolicySelect ? JSON.parse(appPolicySelect.value) : {};

        formData = {
          tipoSolicitante: document.getElementById('tipoSolicitante')?.value,
          tipo: currentFluxo,
          produtos: document.getElementById('produtos')?.value,
          valorRCF: (parseInt(document.getElementById('valorRCF_select')?.value === 'outro' 
                ? document.getElementById('valorRCF_outro')?.value 
                : document.getElementById('valorRCF_select')?.value, 10) || 0),
          valorAPP: (parseInt(document.getElementById('valorAPP_select')?.value === 'outro' 
                ? document.getElementById('valorAPP_outro')?.value 
                : document.getElementById('valorAPP_select')?.value, 10) || 0),
          qtdParcelas: (parseInt(document.getElementById('qtdParcelas')?.value, 10) || 0),
          solNome: document.getElementById('solNome')?.value,
          solEmail: document.getElementById('solEmail')?.value,
          solTelefone: document.getElementById('solTelefone')?.value,
          solDocumento: document.getElementById('solDocumento')?.value,
          solEndereco: document.getElementById('solEndereco')?.value,
          veiUso: document.getElementById('veiUso')?.value,
          veiPlaca: document.getElementById('veiPlaca')?.value,
          veiChassi: document.getElementById('veiChassi')?.value,
          veiRenavam: document.getElementById('veiRenavam')?.value,
          veiAno: (parseInt(document.getElementById('veiAno')?.value, 10) || 0),
          veiFab: document.getElementById('veiFab')?.value,
          veiModelo: document.getElementById('veiModelo')?.value,
          veiLotacao: (parseInt(document.getElementById('veiLotacao')?.value, 10) || 0),
          veiAuxiliares: document.getElementById('veiAuxiliares')?.value,
          veiCNH: document.getElementById('veiCNH')?.files[0]?.name || "",
          tipoPessoa: document.querySelector('input[name="tipoPessoa"]:checked')?.value,
          segNomePF: document.getElementById('segNomePF')?.value,
          segCPF: document.getElementById('segCPF')?.value,
          segRazao: document.getElementById('segRazao')?.value,
          segCNPJ: document.getElementById('segCNPJ')?.value,
          infoAdicionais: document.getElementById('infoAdicionais')?.value,
          termos: document.getElementById('termos')?.checked,
          estipulante: rcfData.estipulante || appData.estipulante,
          cnpj: document.getElementById('cnpj')?.value,
          apolice_rcf: rcfData.apolice,
          premio_rcf: rcfData.premio,
          dano_material_DM: rcfData.dano_material_DM,
          apolice_app: appData.apolice,
          premio_app: appData.premio,
          dano_corporal_DC: appData.dano_corporal_DC,
          cep: document.getElementById('cep')?.value,
          logradouro: document.getElementById('logradouro')?.value,
          numero: document.getElementById('numero')?.value,
          bairro: document.getElementById('bairro')?.value,
          cidade: document.getElementById('cidade')?.value,
          estado: document.getElementById('estado')?.value,
          segurado_cep: document.getElementById('segurado_cep')?.value,
          segurado_logradouro: document.getElementById('segurado_logradouro')?.value,
          segurado_numero: document.getElementById('segurado_numero')?.value,
          segurado_bairro: document.getElementById('segurado_bairro')?.value,
          segurado_cidade: document.getElementById('segurado_cidade')?.value,
          segurado_estado: document.getElementById('segurado_estado')?.value,
          aux1Nome: document.getElementById('aux1Nome')?.value,
          aux1CPF: document.getElementById('aux1CPF')?.value,
          aux1CNH: document.getElementById('aux1CNH')?.files[0]?.name || "",
          aux2Nome: document.getElementById('aux2Nome')?.value,
          aux2CPF: document.getElementById('aux2CPF')?.value,
          aux2CNH: document.getElementById('aux2CNH')?.files[0]?.name || "",
        };
        break;
      case 'renovacao':
        formData = {
          tipo: currentFluxo,
          numeroApolice: document.getElementById('renovApolice')?.value,
          dataVencimento: document.getElementById('renovVencimento')?.value,
          seguradoraVencendo: document.getElementById('renovSeguradora')?.value,
          outraSeguradora: document.getElementById('outraSeguradoraNome')?.value || "",
          tipoPessoa: document.querySelector('input[name="tipoPessoa"]:checked')?.value,
          nomeCompleto: document.getElementById('segNomePF')?.value,
          cpf: document.getElementById('segCPF')?.value,
          razaoSocial: document.getElementById('segRazao')?.value,
          cnpj: document.getElementById('segCNPJ')?.value,
          confirmado: document.getElementById('renovConfirm')?.checked,
        };
        break;
      case 'endosso':
        formData = {
          tipo: currentFluxo,
          nomeOuRazao: document.getElementById('endossoNome')?.value,
          documento: document.getElementById('endossoDocumento')?.value,
          seguradora: document.getElementById('endossoSeguradora')?.value,
          outraSeguradora: document.getElementById('endossoOutraSeguradoraNome')?.value || "",
          apoliceAPP: document.getElementById('endossoApoliceAPP')?.value,
          apoliceRCF: document.getElementById('endossoApoliceRCF')?.value,
          tipoSolicitacao: document.getElementById('endossoTipo')?.value,
          anexoCRLV: document.getElementById('anexoCRLV')?.files[0]?.name || "",
          anexoCNH: document.getElementById('anexoCNH')?.files[0]?.name || "",
          anexoCNHAuxiliar: document.getElementById('anexoCNHAuxiliar')?.files[0]?.name || "",
          anexoEndereco: document.getElementById('anexoEndereco')?.files[0]?.name || "",
        };
        switch (formData.tipoSolicitacao) {
          case 'substituicao_veiculo':
            Object.assign(formData, {
              placaAtual: document.getElementById('endossoVeiculoPlacaAtual')?.value,
              placaNova: document.getElementById('endossoVeiculoPlacaNova')?.value,
              chassi: document.getElementById('endossoVeiculoChassi')?.value,
              renavam: document.getElementById('endossoVeiculoRenavam')?.value,
              fabricante: document.getElementById('endossoVeiculoFab')?.value,
              modelo: document.getElementById('endossoVeiculoModelo')?.value,
              ano: document.getElementById('endossoVeiculoAno')?.value,
              lotacao: parseInt(document.getElementById('endossoVeiculoLotacao')?.value, 10) || 0,
              crlv: document.getElementById('endossoVeiculoCRLV')?.files[0]?.name || "",
            });
            break;
          case 'inclusao_condutor':
            Object.assign(formData, {
              qaInicial: document.getElementById('endossoQaInicial')?.value,
              acaoCondutor: document.getElementById('endossoAcao')?.value,
              condutor1Nome: document.getElementById('endossoCondutor1Nome')?.value,
              condutor1CPF: document.getElementById('endossoCondutor1CPF')?.value,
              condutor1CNH: document.getElementById('endossoCondutor1CNH')?.files[0]?.name || "",
              condutor2Nome: document.getElementById('endossoCondutor2Nome')?.value,
              condutor2CPF: document.getElementById('endossoCondutor2CPF')?.value,
              condutor2CNH: document.getElementById('endossoCondutor2CNH')?.files[0]?.name || "",
            });
            break;
          case 'alteracao_endereco':
            Object.assign(formData, {
              novoEndereco: document.getElementById('endossoNovoEndereco')?.value,
              novoEmail: document.getElementById('endossoNovoEmail')?.value,
              novoTelefone: document.getElementById('endossoNovoTelefone')?.value,
              comprovanteEndereco: document.getElementById('endossoNovoEnderecoComp')?.files[0]?.name || "",
            });
            break;
          case 'correcao_cadastral':
            Object.assign(formData, {
              tipoPessoa: document.querySelector('input[name="tipoPessoa"]:checked')?.value,
              segNomePF: document.getElementById('segNomePF')?.value,
              segCPF: document.getElementById('segCPF')?.value,
              segRazao: document.getElementById('segRazao')?.value,
              segCNPJ: document.getElementById('segCNPJ')?.value,
              cnhSegurado: document.getElementById('endossoCorrecaoCNH')?.files[0]?.name || "",
            });
            break;
        }
        break;
      case 'segunda_via':
        formData = {
          tipo: currentFluxo,
          nomeOuRazao: document.getElementById('segundaViaNome')?.value,
          documento: document.getElementById('segundaViaDocumento')?.value,
          tipoDocumento: document.getElementById('segundaViaTipoDoc')?.value,
          outroDocumento: document.getElementById('segundaViaOutroNome')?.value || "",
          responsavel: document.getElementById('segundaViaResponsavel')?.value,
          observacoes: document.getElementById('segundaViaObs')?.value,
        };
        break;
      case 'financeiro_regularizacao':
        formData = {
          tipo: currentFluxo,
          nomeOuRazao: document.getElementById('finRegNome')?.value,
          documento: document.getElementById('finRegDocumento')?.value,
          dataVencimento: document.getElementById('finRegDataVencimento')?.value,
          parcelaAberta: document.getElementById('finRegParcela')?.value,
          apoliceRCF: document.getElementById('finRegApoliceRCF')?.value,
          motivoInadimplencia: document.getElementById('finRegMotivo')?.value,
          responsavel: document.getElementById('finRegResponsavel')?.value,
          observacoes: document.getElementById('finRegObs')?.value,
        };
        break;
      default:
        alert("Tipo de solicitação não configurado para envio.");
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        return;
    }

    if (!targetUrl || targetUrl.includes('URL_DO_FLUXO')) {
      alert(`A URL para o fluxo '${currentFluxo}' não foi configurada.`);
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
      return;
    }

    console.log('Enviando para o servidor:', JSON.stringify(formData, null, 2));

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(`Formulário do fluxo '${currentFluxo}' enviado com sucesso!`);
        document.getElementById("multiStepForm").style.display = "none";
        document.getElementById("successMessageText").textContent = `Recebemos sua ${tipoText}. Entraremos em contato em breve.`;
        document.getElementById("successMessage").classList.add("active");
      } else {
        throw new Error(`Erro do servidor: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Falha ao enviar o formulário:", error);
      alert("Houve um erro ao enviar sua solicitação. Por favor, tente novamente mais tarde.");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  };

  form.addEventListener("submit", window.formSubmitHandler);

  // Lógica condicional da UI
  const produtosSelect = document.getElementById("produtos");
  if (produtosSelect) {
    produtosSelect.addEventListener("change", () => {
      applyProductsVisibility();
      toggleObservacaoAPP();
    });
  }
  const seguradoraSelect = document.getElementById("renovSeguradora");
  if (seguradoraSelect) seguradoraSelect.addEventListener("change", toggleOutraSeguradora);
  const endossoSeguradoraSelect = document.getElementById("endossoSeguradora");
  if (endossoSeguradoraSelect) endossoSeguradoraSelect.addEventListener("change", toggleEndossoOutraSeguradora);
  const segundaViaTipoDocSelect = document.getElementById("segundaViaTipoDoc");
  if (segundaViaTipoDocSelect) segundaViaTipoDocSelect.addEventListener("change", toggleSegundaViaOutro);
  const rcfSelect = document.getElementById("valorRCF_select");
  if (rcfSelect) rcfSelect.addEventListener("change", handleRcfVisibility);
  const appSelect = document.getElementById("valorAPP_select");
  if (appSelect) appSelect.addEventListener("change", handleAppVisibility);
  document.querySelectorAll('input[name="estipEstrangeiro"]').forEach((r) => r.addEventListener("change", applyEstipulanteVisibility));
  document.querySelectorAll('input[name="estipPPE"]').forEach((r) => r.addEventListener("change", applyEstipulanteVisibility));
  
  // Listener para o campo CNPJ
  const cnpjInput = document.getElementById('cnpj');
  if (cnpjInput) {
    cnpjInput.addEventListener('blur', buscar);
  }

  const cepInput = document.getElementById('cep');
  if (cepInput) {
    cepInput.addEventListener('blur', () => buscarCep('estipulante'));
  }

  const seguradoCepInput = document.getElementById('segurado_cep');
  if (seguradoCepInput) {
    seguradoCepInput.addEventListener('blur', () => buscarCep('segurado'));
  }

  // Remove erro on-input
  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", () => input.classList.remove("is-invalid"));
    input.addEventListener("change", () => input.classList.remove("is-invalid"));
  });

  // Lógica que depende do DOM recém-criado
  applyProductsVisibility();
  toggleOutraSeguradora();
  toggleEndossoOutraSeguradora();
  toggleSegundaViaOutro();
  handleRcfVisibility();
  handleAppVisibility();
  // toggleObservacaoAPP();
  applyEstipulanteVisibility();

  // Popula a etapa de confirmação da renovação se for a etapa ativa
  if (activeSteps[currentStep]?.template === 'renovacao_confirmar') {
    populateRenovacaoConfirmacao();
  }
}

function toggleObservacaoAPP() {
  const observacaoAPP = document.getElementById('observacaoAPP');
  if (!observacaoAPP) return;

  const produtos = document.getElementById('produtos')?.value;
  if (currentFluxo === 'nova' && (produtos === 'app' || produtos === 'rcf_app')) {
    observacaoAPP.style.display = 'block';
  } else {
    observacaoAPP.style.display = 'none';
  }
}

function applyEstipulanteVisibility() {
    const estrangeiroSim = document.getElementById("estipEstrangeiroSim");
    const blocoEstrangeiro = document.getElementById("estipBlocoEstrangeiro");
    if (estrangeiroSim && blocoEstrangeiro) {
        blocoEstrangeiro.style.display = estrangeiroSim.checked ? "" : "none";
        document.getElementById("estipPais").required = estrangeiroSim.checked;
        document.getElementById("estipTempoPais").required = estrangeiroSim.checked;
        document.getElementById("estipPaisResidencia").required = estrangeiroSim.checked;
    }

    const ppeSim = document.getElementById("estipPPESim");
    const blocoPPE = document.getElementById("estipBlocoPPE");
    if (ppeSim && blocoPPE) {
        blocoPPE.style.display = ppeSim.checked ? "" : "none";
        document.getElementById("estipPPENome").required = ppeSim.checked;
        document.getElementById("estipPPECPF").required = ppeSim.checked;
        document.getElementById("estipPPEGrauRelacionamento").required = ppeSim.checked;
    }
}

function handleAppVisibility() {
  const appSelect = document.getElementById("valorAPP_select");
  const appOutro = document.getElementById("valorAPP_outro");
  const blocoAPP = document.getElementById("coberturaAPP");
  if (!appSelect || !appOutro || !blocoAPP) return;

  const isBlockVisible = blocoAPP.style.display !== 'none';

  if (appSelect.value === 'outro') {
    appOutro.style.display = 'block';
    appOutro.required = isBlockVisible;
    appSelect.required = false;
  } else {
    appOutro.style.display = 'none';
    appOutro.required = false;
    appOutro.value = '';
    appSelect.required = isBlockVisible;
  }
}

function handleRcfVisibility() {
  const rcfSelect = document.getElementById("valorRCF_select");
  const rcfOutro = document.getElementById("valorRCF_outro");
  const blocoRCF = document.getElementById("coberturaRCF");
  if (!rcfSelect || !rcfOutro || !blocoRCF) return;

  const isBlockVisible = blocoRCF.style.display !== 'none';

  if (rcfSelect.value === 'outro') {
    rcfOutro.style.display = 'block';
    rcfOutro.required = isBlockVisible;
    rcfSelect.required = false;
  } else {
    rcfOutro.style.display = 'none';
    rcfOutro.required = false;
    rcfOutro.value = '';
    rcfSelect.required = isBlockVisible;
  }
}

function toggleOutraSeguradora() {
  const seguradoraSelect = document.getElementById("renovSeguradora");
  const outraContainer = document.getElementById("outraSeguradoraContainer");
  if (!seguradoraSelect || !outraContainer) return;

  const outraInput = document.getElementById("outraSeguradoraNome");

  if (seguradoraSelect.value === 'outra') {
    outraContainer.style.display = 'block';
    outraInput.required = true;
  } else {
    outraContainer.style.display = 'none';
    outraInput.required = false;
    outraInput.value = '';
  }
}

function toggleEndossoOutraSeguradora() {
  const seguradoraSelect = document.getElementById("endossoSeguradora");
  const outraContainer = document.getElementById("endossoOutraSeguradoraContainer");
  if (!seguradoraSelect || !outraContainer) return;

  const outraInput = document.getElementById("endossoOutraSeguradoraNome");

  if (seguradoraSelect.value === 'outra') {
    outraContainer.style.display = 'block';
    outraInput.required = true;
  } else {
    outraContainer.style.display = 'none';
    outraInput.required = false;
    outraInput.value = '';
  }
}

function toggleSegundaViaOutro() {
  const tipoDocSelect = document.getElementById("segundaViaTipoDoc");
  const outraContainer = document.getElementById("segundaViaOutroContainer");
  if (!tipoDocSelect || !outraContainer) return;

  const outraInput = document.getElementById("segundaViaOutroNome");

  if (tipoDocSelect.value === 'outra') {
    outraContainer.style.display = 'block';
    outraInput.required = true;
  } else {
    outraContainer.style.display = 'none';
    outraInput.required = false;
    outraInput.value = '';
  }
}

function applyProductsVisibility() {
  const produtos = document.getElementById("produtos")?.value;
  const blocoRCF = document.getElementById("coberturaRCF");
  const blocoAPP = document.getElementById("coberturaAPP");
  if (!blocoRCF || !blocoAPP) return;

  // Esconde os blocos por padrão
  blocoRCF.style.display = "none";
  blocoAPP.style.display = "none";

  // Mostra os blocos conforme a seleção de produtos
  if (produtos === "rcf" || produtos === "rcf_app") {
    blocoRCF.style.display = "";
  }
  if (produtos === "app" || produtos === "rcf_app") {
    blocoAPP.style.display = "";
  }

  // Atualiza a validação de 'required' após mudar a visibilidade
  handleRcfVisibility();
  handleAppVisibility();
}

function applyPessoaTipo() {
  const pfRadio = document.getElementById("pf");
  if (!pfRadio) return;

  const pf = pfRadio.checked;
  const blocoPF = document.getElementById("blocoPF");
  const blocoPJ = document.getElementById("blocoPJ");
  blocoPF.style.display = pf ? "" : "none";
  blocoPJ.style.display = pf ? "none" : "";

  document.getElementById("segNomePF").required = pf;
  document.getElementById("segCPF").required = pf;
  document.getElementById("segRazao").required = !pf;
  document.getElementById("segCNPJ").required = !pf;
}

function toggleAuxiliares(checked) {
  const container = document.getElementById('auxiliaresContainer');
  if (container) {
    container.style.display = checked ? 'block' : 'none';
    document.getElementById('aux1Nome').required = checked;
    document.getElementById('aux1CPF').required = checked;
    document.getElementById('aux1CNH').required = checked;
  }
}

function toggleAuxiliar2(checked) {
  const container = document.getElementById('auxiliar2Container');
  if (container) {
    container.style.display = checked ? 'block' : 'none';
    document.getElementById('aux2Nome').required = checked;
    document.getElementById('aux2CPF').required = checked;
    document.getElementById('aux2CNH').required = checked;
  }
}

function populateRenovacaoConfirmacao() {
  // Dados da Apólice Anterior
  document.getElementById('displayRenovApolice').textContent = document.getElementById('renovApolice')?.value || 'Não informado';
  document.getElementById('displayRenovVencimento').textContent = document.getElementById('renovVencimento')?.value || 'Não informado';
  
  const seguradoraVencendo = document.getElementById('renovSeguradora')?.value;
  document.getElementById('displayRenovSeguradora').textContent = seguradoraVencendo === 'outra' ? 'Outra' : (seguradoraVencendo || 'Não informado');

  const displayOutraSeguradora = document.getElementById('displayRenovOutraSeguradora');
  const displayOutraSeguradoraNome = document.getElementById('displayRenovOutraSeguradoraNome');
  if (seguradoraVencendo === 'outra' && displayOutraSeguradora && displayOutraSeguradoraNome) {
    displayOutraSeguradora.style.display = 'block';
    displayOutraSeguradoraNome.textContent = document.getElementById('outraSeguradoraNome')?.value || 'Não informado';
  } else if (displayOutraSeguradora) {
    displayOutraSeguradora.style.display = 'none';
  }

  // Dados do Segurado
  const tipoPessoa = document.querySelector('input[name="tipoPessoa"]:checked')?.value;
  document.getElementById('displaySegTipoPessoa').textContent = tipoPessoa === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica';

  if (tipoPessoa === 'pf') {
    document.getElementById('displaySegNomeRazao').textContent = document.getElementById('segNomePF')?.value || 'Não informado';
    document.getElementById('displaySegDocumento').textContent = document.getElementById('segCPF')?.value || 'Não informado';
  } else {
    document.getElementById('displaySegNomeRazao').textContent = document.getElementById('segRazao')?.value || 'Não informado';
    document.getElementById('displaySegDocumento').textContent = document.getElementById('segCNPJ')?.value || 'Não informado';
  }
}

async function buscarCep(prefix) {
  const cepInput = document.getElementById(prefix === 'estipulante' ? 'cep' : 'segurado_cep');
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length !== 8) {
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) {
      alert('CEP não encontrado.');
      return;
    }

    if (prefix === 'estipulante') {
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;
    } else {
        document.getElementById('segurado_logradouro').value = data.logradouro;
        document.getElementById('segurado_bairro').value = data.bairro;
        document.getElementById('segurado_cidade').value = data.localidade;
        document.getElementById('segurado_estado').value = data.uf;
    }

  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    alert('Erro ao buscar CEP. Tente novamente.');
  }
}

// =================================================================
// 7. CHAMADA AO CSV DE ESTIPULANTES
// =================================================================
function limpar(str){ return (str || '').replace(/\D/g, ''); }

    async function buscar(){
      const cnpjInput = document.getElementById('cnpj');
      const cnpj = limpar(cnpjInput.value);
      const resultadoDiv = document.getElementById('resultadoEstipulante');

      if(!cnpj){
        resultadoDiv.innerHTML = `<div class="alert alert-warning">Digite um CNPJ válido.</div>`;
        return;
      }

      resultadoDiv.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Buscando...</span></div>`;

      try {
        const res = await fetch('estipulantes.csv');
        const texto = await res.text();
        const csv = Papa.parse(texto, { header: true }).data;

        const achados = csv.filter(l => limpar(l.cnpj) === cnpj);

        if (achados.length > 0) {
          const rcfPolicies = achados.filter(p => p.dano_material_DM);
          const appPolicies = achados.filter(p => p.dano_corporal_DC);

          let html = '';

          if (rcfPolicies.length > 0) {
            html += `
              <div class="mb-3">
                <label for="rcf_policy_select" class="form-label"><strong>RCF - Dano Material (DM)</strong></label>
                <select id="rcf_policy_select" class="form-select">
                  <option disable value=''>Nenhuma</option>
                  ${rcfPolicies.map(p => `<option value='${JSON.stringify(p)}'>${p.apolice} - ${p.premio}</option>`).join('')}
                </select>
              </div>`;
          }

          if (appPolicies.length > 0) {
            html += `
              <div class="mb-3">
                <label for="app_policy_select" class="form-label"><strong>APP - Dano Corporal (DC)</strong></label>
                <select id="app_policy_select" class="form-select">
                  <option disable value=''>Nenhuma</option>
                  ${appPolicies.map(p => `<option value='${JSON.stringify(p)}'>${p.apolice} - ${p.premio}</option>`).join('')}
                </select>
              </div>`;
          }

          resultadoDiv.innerHTML = html;
        } else {
          resultadoDiv.innerHTML = `<div class="alert alert-danger">Estipulante não encontrado para o CNPJ informado.</div>`;
        }
      } catch (error) {
        console.error('Erro ao buscar dados do estipulante:', error);
        resultadoDiv.innerHTML = `<div class="alert alert-danger">Erro ao carregar os dados. Tente novamente.</div>`;
      }
    }

// Listener inicial para o tipo de solicitação
document.getElementById("tipoSolicitacao").addEventListener("change", (e) => {
  renderizarFluxo(e.target.value);
});

// Inicialização da página
function inicializarFormulario(fluxoInicial = null) {
  resetForm(); // Garante que o estado está limpo
  if (fluxoInicial && fluxosConfig[fluxoInicial]) {
    document.getElementById('tipoSolicitacao').value = fluxoInicial;
    renderizarFluxo(fluxoInicial);
  }
}

// Para iniciar com a tela de seleção, chame: inicializarFormulario();
// Para iniciar diretamente com um fluxo, chame: inicializarFormulario('nova');
inicializarFormulario();