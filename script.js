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
  produtos_coberturas: `
    <div class="form-step">
      <h4 class="mb-4">Produtos e Coberturas</h4>
      <div class="mb-3">
        <label class="form-label">Selecione os produtos desejados *</label>
        <select id="produtos" class="form-select" required>
          <option value="">Selecione</option>
          <option value="rcf_app">RCF e APP</option>
          <option value="rcf">Somente RCF</option>
          <option value="app">Somente APP</option>
        </select>
        <div class="invalid-feedback">Informe os produtos desejados.</div>
      </div>

      <div id="coberturaRCF" class="mb-3" style="display: none;">
        <label for="valorRCF_select" class="form-label">Valor RCF (R$) *</label>
        <div id="rcfApoliceInfo" class="text-muted mb-2"></div>
        <select id="valorRCF_select" class="form-select">
          <option value="">Selecione</option>
          <option value="50000">R$ 50.000</option>
          <option value="100000">R$ 100.000</option>
          <option value="150000">R$ 150.000</option>
          <option value="outro">Outro Valor</option>
        </select>
        <input type="number" class="form-control mt-2" id="valorRCF_outro" step="1000" style="display: none;" placeholder="Digite o valor desejado" />
        <div class="invalid-feedback">Informe o valor de RCF.</div>
      </div>

      <div id="coberturaAPP" class="mb-3" style="display: none;">
        <label for="valorAPP_select" class="form-label">Valor APP por pessoa (R$) *</label>
        <div id="appApoliceInfo" class="text-muted mb-2"></div>
        <select id="valorAPP_select" class="form-select">
          <option value="">Selecione</option>
          <option value="5000">R$ 5.000</option>
          <option value="10000">R$ 10.000</option>
          <option value="outro">Outro Valor</option>
        </select>
        <input type="number" class="form-control mt-2" id="valorAPP_outro" step="1000" style="display: none;" placeholder="Digite o valor desejado" />
        <div class="invalid-feedback">Informe o valor de APP.</div>
      </div>
      
      <hr>

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
              <input type="number" id="seguradoNumIdentidade" class="form-control" required />
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
          <div class="col-md-4 mb-3">
            <label class="form-label">Email *</label>
            <input type="email" id="emailSeg" class="form-control" required/>
            <div class="invalid-feedback">Informe o email.</div>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Telefone *</label>
            <input id="telSeg" class="form-control" required/>
            <div class="invalid-feedback">Informe o telefone.</div>
          </div>
      </div>

      <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Email Adicional</label>
            <input type="email" id="emailSegAux" class="form-control"/>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Telefone Adicional</label>
            <input id="telSegAux" class="form-control"/>
          </div>
          <div class="col-md-4 mb-3">
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
          <div class="input-group">
            <input id="segurado_cep" class="form-control" placeholder="00000-000" required>
            <button class="btn btn-outline-secondary" type="button" onclick="buscarCep()"><i class="bi bi-search"></i></button>
            <div class="invalid-feedback">Informe um CEP válido.</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 mb-3">
          <label class="form-label">Logradouro</label>
          <input id="segurado_logradouro" class="form-control" readonly>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Número</label>
          <input type="number" required id="segurado_numero" class="form-control">
          <div class="invalid-feedback">Informe o número.</div>
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

      <div class="mb-3">
        <label class="form-label">Upload Comprovante de Residência (PDF/JPG/PNG) *</label>
        <input id="comprovanteResidenciaSeg" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
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
          <label class="form-label">Venda Condicionada a Tigo?</label>
          <select id="tigo" class="form-select" required>
            <option disabled selected value="">Selecione</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
          <div class="invalid-feedback">Informe a venda.</div>
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
            <option value="" disabled selected>Selecione</option>
            <option>Moto</option><option>Van Turismo</option><option>Van Escolar</option><option>Van Urbano</option><<option>Táxi/Aplicativos</option> <option>Policiamento/Bombeiro</option> <option>Comercial/Profissional</option>
            <option>Casa Locadora - Uso Comercial/Industrial, S/Veículo por Aplicativo</option> <option>Casa Locadora - Uso Veículo por Aplicativos</option> <option>Chapa de Fabricante</option> <option>Auto Escola</option>
          </select>
          <div class="invalid-feedback">Informe o uso.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Lotação *</label>
          <input id="veiLotacao" type="number" class="form-control" min="1" required />
          <div class="invalid-feedback">Informe a lotação.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mb-3">
            <label class="form-label">Contrato com adesão ao TIGO CLUBE? *</label>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="tigoClube" id="tigoClubeSim" value="sim" required />
                    <label class="form-check-label" for="tigoClubeSim">Sim</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="tigoClube" id="tigoClubeNao" value="nao" required checked />
                    <label class="form-check-label" for="tigoClubeNao">Não</label>
                </div>
            </div>
        </div>
      </div>
      <div id="tigoClubeAdesaoContainer" class="mb-3" style="display: none;">
        <label class="form-label">Upload do documento de adesão assinado (PDF/JPG/PNG) *</label>
        <input id="tigoClubeAdesao" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
        <div class="invalid-feedback">Faça o upload do documento de adesão.</div>
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

      endosso_retirada_1_condutor: `
        <div class="form-step">
            <h4 class="mb-4">Identificação do Condutor a Retirar</h4>
            <p class="text-muted">Preencha os dados do condutor que você deseja retirar da apólice.</p>
            <div class="row">
                <div class="col-md-8 mb-3">
                    <label for="endossoCondutor1RetirarNome" class="form-label">Nome Completo *</label>
                    <input id="endossoCondutor1RetirarNome" class="form-control" required />
                    <div class="invalid-feedback">Informe o nome do condutor a retirar.</div>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="endossoCondutor1RetirarCPF" class="form-label">CPF *</label>
                    <input id="endossoCondutor1RetirarCPF" class="form-control" placeholder="000.000.000-00" required />
                    <div class="invalid-feedback">CPF inválido.</div>
                </div>
            </div>
            <div class="btn-group-navigation">
                <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
                <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
            </div>
        </div>`,
      endosso_retirada_2_condutores: `
        <div class="form-step">
            <h4 class="mb-4">Identificação dos Condutores a Retirar</h4>
            
            <div class="condutor-retirar-block mb-3">
                <h5>Condutor 1 a Retirar</h5>
                <div class="row">
                    <div class="col-md-8 mb-3">
                        <label for="endossoCondutor1RetirarNome" class="form-label">Nome Completo *</label>
                        <input id="endossoCondutor1RetirarNome" class="form-control" required />
                        <div class="invalid-feedback">Informe o nome do condutor 1.</div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="endossoCondutor1RetirarCPF" class="form-label">CPF *</label>
                        <input id="endossoCondutor1RetirarCPF" class="form-control" placeholder="000.000.000-00" required />
                        <div class="invalid-feedback">CPF inválido.</div>
                    </div>
                </div>
            </div>

            <div class="condutor-retirar-block mb-3">
                <hr>
                <h5>Condutor 2 a Retirar</h5>
                <div class="row">
                    <div class="col-md-8 mb-3">
                        <label for="endossoCondutor2RetirarNome" class="form-label">Nome Completo *</label>
                        <input id="endossoCondutor2RetirarNome" class="form-control" required />
                        <div class="invalid-feedback">Informe o nome do condutor 2.</div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="endossoCondutor2RetirarCPF" class="form-label">CPF *</label>
                        <input id="endossoCondutor2RetirarCPF" class="form-control" placeholder="000.000.000-00" required />
                        <div class="invalid-feedback">CPF inválido.</div>
                    </div>
                </div>
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
              <div class="mb-3">
                <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
                <input id="endossoCondutor1CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
                <div class="invalid-feedback">Faça o upload da CNH.</div>
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
              <div class="mb-3">
                <label class="form-label">Upload CNH Condutor 1 (PDF/JPG/PNG) *</label>
                <input id="endossoCondutor1CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
                <div class="invalid-feedback">Faça o upload da CNH do condutor 1.</div>
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
              <div class="mb-3">
                <label class="form-label">Upload CNH Condutor 2 (PDF/JPG/PNG) *</label>
                <input id="endossoCondutor2CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
                <div class="invalid-feedback">Faça o upload da CNH do condutor 2.</div>
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
  if (!currentStepElement) return true;

  const inputs = currentStepElement.querySelectorAll("input[required], select[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    let fieldValid = input.checkValidity();

    // --- Início das Validações Customizadas ---
    if (input.value) { // Só valida se houver valor

      // Validação de Email
      if (input.id === 'solEmail' && !isValidEmail(input.value)) {
        fieldValid = false;
      }

      // Validação de Placa
      if ((input.id === 'veiPlaca' || input.id === 'endossoVeiculoPlacaAtual' || input.id === 'endossoVeiculoPlacaNova') && !/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(input.value.toUpperCase())) {
        fieldValid = false;
      }

      // --- Validações de Documentos ---

      // Campo condicional: CPF ou CNPJ dependendo do tipo de pessoa
      if (input.id === 'seguradoDocumento') {
        const tipoPessoa = currentStepElement.querySelector('#seguradoTipoPessoa')?.value;
        if (tipoPessoa === 'pf' && !validaCPF(input.value)) {
          fieldValid = false;
        } else if (tipoPessoa === 'pj' && !validaCNPJ(input.value)) {
          fieldValid = false;
        }
      }

      // Campos que podem ser CPF ou CNPJ (detecção automática)
      if (input.id === 'endossoDocumento' || input.id === 'segundaViaDocumento' || input.id === 'finRegDocumento') {
        if (!(onlyDigits(input.value).length <= 11 ? validaCPF(input.value) : validaCNPJ(input.value))) {
          fieldValid = false;
        }
      }

      // Campos que são sempre CPF
      if (['segCPF', 'seguradoPPECPF', 'aux1CPF', 'aux2CPF', 'endossoCondutor1CPF', 'endossoCondutor2CPF'].includes(input.id)) {
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
      isValid = false;
    }
    input.classList.toggle("is-invalid", !fieldValid);
  });

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

function nextStep() {
  if (!validateStep(currentStep)) return;

  const currentStepConfig = activeSteps[currentStep];
  let needsDynamicRender = false;
  let stepsToAdd = [];

  if (currentFluxo === 'nova' && currentStepConfig.template === 'tipo_solicitante') {
    needsDynamicRender = true;
    const tipoSolicitante = document.getElementById('tipoSolicitante').value;
    formDataStorage.tipoSolicitante = tipoSolicitante;

    // const stepsAfterTipoSolicitante = [
    //     { label: "Tipo", template: "tipo_para_nova" },  
    // ];

    const baseStepsAfter = [
        // { label: "Veículo", template: "veiculo" },
        // { label: "Produtos", template: "produtos_coberturas" },
        // { label: "Parcelas", template: "parcelas"},
        // { label: "Auxiliares", template: "auxiliares" },
        // { label: "Info & Consent.", template: "consentimento" },
        { label: "Enviar", template: "enviar" }
    ];

    let dynamicSteps = [];
    if (tipoSolicitante === 'segurado') {
        // dynamicSteps.push({ label: "Segurado", template: "segurado" });
    } else if (tipoSolicitante === 'estipulante') {
        dynamicSteps.push({ label: "Estipulante", template: "estipulante" });
        dynamicSteps.push({ label: "Segurado", template: "segurado" });
    } else if (tipoSolicitante === 'colaborador') {
        dynamicSteps.push({ label: "Solicitante", template: "solicitante" });
        dynamicSteps.push({ label: "Estipulante", template: "estipulante" });
        dynamicSteps.push({ label: "Segurado", template: "segurado" });
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

      const acoesRetirada1 = ['retirar_atual', 'retirar_incluir_novo', 'retirar_1_manter_1', 'retirar_1_incluir_1'];
      const acoesRetirada2 = ['retirar_2_ficar_sem', 'retirar_2_incluir_1', 'retirar_2_incluir_2'];

      if (acoesRetirada1.includes(acao)) {
        stepsToAdd.push({ label: "Retirada", template: "endosso_retirada_1_condutor" });
      } else if (acoesRetirada2.includes(acao)) {
        stepsToAdd.push({ label: "Retirada", template: "endosso_retirada_2_condutores" });
      }

      // Determina qual formulário de dados de inclusão mostrar
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
    // Object.keys(formDataBeforeRender).forEach(id => {
    //   const input = document.getElementById(id);
    //   if (input) {
    //     const value = formDataBeforeRender[id];
    //     if (input.type === 'checkbox' || input.type === 'radio') {
    //       input.checked = value;
    //     } else {
    //       input.value = value;
    //     }
    //   }
    // });

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
const onlyDigits = (str) => str.replace(/\D/g, '');
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
  // Verifica se tem 14 dígitos e não é repetido
  if (!cnpj || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

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
    //   nova: 'https://e1b82d98c0c4efb7972bac26ccc599.ed.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/284cd1c4bf544f5f8055542fec59e994/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WwYcTkLu_T9Eql_7xF4KomGHvNCuewnGP1kXdXLIDDg',
    //   renovacao: 'https://e1b82d98c0c4efb7972bac26ccc599.ed.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/284cd1c4bf544f5f8055542fec59e994/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WwYcTkLu_T9Eql_7xF4KomGHvNCuewnGP1kXdXLIDDg',
    //   endosso: 'URL_DO_FLUXO_DE_ENDOSSO_AQUI',
    //   segunda_via: 'URL_DO_FLUXO_DE_SEGUNDA_VIA_AQUI',
    //   financeiro_regularizacao: 'URL_DO_FLUXO_DE_FINANCEIRO_REGULARIZACAO_AQUI',
    // };

    let formData = {};
    let targetUrl = 'https://e1b82d98c0c4efb7972bac26ccc599.ed.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/284cd1c4bf544f5f8055542fec59e994/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WwYcTkLu_T9Eql_7xF4KomGHvNCuewnGP1kXdXLIDDg';

    // Funções auxiliares para obter valores dos campos
    const getValue = (id) => document.getElementById(id)?.value || null;
    const getFile = (id) => document.getElementById(id)?.files[0]?.name || null;
    const getChecked = (id) => document.getElementById(id)?.checked || false;
    const getRadio = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value || null;
    const getIntValue = (id) => parseInt(getValue(id), 10) || 0;

    switch (currentFluxo) {
      case 'nova':
        const rcfPolicySelect = document.getElementById('rcf_policy_select');
        const appPolicySelect = document.getElementById('app_policy_select');
        const rcfData = rcfPolicySelect ? JSON.parse(rcfPolicySelect.value) : {};
        const appData = appPolicySelect ? JSON.parse(appPolicySelect.value) : {};

        formData = {
          // Identificação
          tipoSolicitante: formDataStorage.tipoSolicitante,
          tipo: currentFluxo,

          // Colaborador (se aplicável)
          solicitanteNome: getValue('estipNome'),
          vendaCondicionadaTigo: getValue('tigo'),

          // Estipulante (se aplicável)
          estipulanteCNPJ: getValue('cnpj'),
          estipulanteApoliceRCF: rcfData.apolice,
          estipulantePremioRCF: rcfData.premio,
          estipulanteDanoMaterialRCF: rcfData.dano_material_DM,
          estipulanteDanoCorporalRCF: rcfData.dano_corporal_DC,
          estipulanteProLaboreRCF: rcfData.pro_labore,
          estipulanteFatorRCF: rcfData.fator,

          estipulanteApoliceAPP: appData.apolice,
          estipulantePremioAPP: appData.premio,
          estipulanteIpaCondutorAPP: appData.ipa_condutor,
          estipulanteMaCondutorAPP: appData.ma_condutor,
          estipulanteProLaboreAPP: appData.pro_labore,
          estipulanteFatorAPP: appData.fator,
          estipulanteIpaPassageiroAPP: appData.ipa_passageiro,
          estipulanteMaCondutorAPP: appData.ma_passageiro,
          
          // Produtos e Coberturas
          produtos: getValue('produtos'),
          valorRCF: getValue('valorRCF_select') === 'outro' ? getIntValue('valorRCF_outro') : getIntValue('valorRCF_select'),
          valorAPP: getValue('valorAPP_select') === 'outro' ? getIntValue('valorAPP_outro') : getIntValue('valorAPP_select'),

          // Parcelas
          qtdParcelas: getValue('qtdParcelas'),

          // Segurado
          seguradoNome: getValue('seguradoNome'),
          seguradoNomeSocial: getValue('seguradoNomeSocial'),
          seguradoTipoPessoa: getValue('seguradoTipoPessoa'),
          seguradoDocumento: getValue('seguradoDocumento'),
          seguradoDataNascimento: getValue('seguradoDataNascimento'),
          seguradoEstadoCivil: getValue('seguradoEstadoCivil'),
          seguradoSexo: getValue('seguradoSexo'),
          seguradoTipoIdentidade: getValue('seguradoTipoIdentidade'),
          seguradoNumIdentidade: getValue('seguradoNumIdentidade'),
          seguradoOrgaoEmissor: getValue('seguradoOrgaoEmissor'),
          seguradoDataEmissao: getValue('seguradoDataEmissao'),
          seguradoEstrangeiro: getRadio('seguradoEstrangeiro'),
          seguradoPais: getValue('seguradoPais'),
          seguradoTempoPais: getValue('seguradoTempoPais'),
          seguradoPaisResidencia: getValue('seguradoPaisResidencia'),
          seguradoAtividadePrincipal: getValue('seguradoAtividadePrincipal'),
          seguradoFaixaRenda: getValue('seguradoFaixaRenda'),
          seguradoPPE: getRadio('seguradoPPE'),
          seguradoPPENome: getValue('seguradoPPENome'),
          seguradoPPECPF: getValue('seguradoPPECPF'),
          seguradoPPEGrauRelacionamento: getValue('seguradoPPEGrauRelacionamento'),
          seguradoCEP: getValue('segurado_cep'),
          seguradoLogradouro: getValue('segurado_logradouro'),
          seguradoNumero: getValue('segurado_numero'),
          seguradoBairro: getValue('segurado_bairro'),
          seguradoCidade: getValue('segurado_cidade'),
          seguradoEstado: getValue('segurado_estado'),
          seguradoCNH: getFile('cnhSeg'),
          seguradoComprovanteResidencia: getFile('comprovanteResidenciaSeg'),

          // Veículo
          veiculoPlaca: getValue('veiPlaca'),
          veiculoChassi: getValue('veiChassi'),
          veiculoRenavam: getValue('veiRenavam'),
          veiculoFabricante: getValue('veiFab'),
          veiculoModelo: getValue('veiModelo'),
          veiculoAno: getValue('veiAno'),
          veiculoUso: getValue('veiUso'),
          veiculoLotacao: getIntValue('veiLotacao'),
          veiculoCRLV: getFile('veiCNH'), // ID no HTML é veiCNH
          tigoClube: getRadio('tigoClube'),
          tigoClubeAdesao: getFile('tigoClubeAdesao'),

          // Auxiliares
          adicionarAuxiliar: getChecked('addAuxiliar'),
          auxiliar1Nome: getValue('aux1Nome'),
          auxiliar1CPF: getValue('aux1CPF'),
          auxiliar1CNH: getFile('aux1CNH'),
          adicionarAuxiliar2: getChecked('addAuxiliar2'),
          auxiliar2Nome: getValue('aux2Nome'),
          auxiliar2CPF: getValue('aux2CPF'),
          auxiliar2CNH: getFile('aux2CNH'),

          // Consentimento
          infoAdicionais: getValue('infoAdicionais'),
          termos: getChecked('termos'),
        };
        break;
      case 'renovacao':
        formData = {
          tipo: currentFluxo,
          // Apólice Anterior
          numeroApoliceAnterior: getValue('renovApolice'),
          dataVencimentoAnterior: getValue('renovVencimento'),
          seguradoraAnterior: getValue('renovSeguradora'),
          outraSeguradoraAnterior: getValue('outraSeguradoraNome'),
          // Segurado (mapeamento completo)
          seguradoNome: getValue('seguradoNome'),
          seguradoNomeSocial: getValue('seguradoNomeSocial'),
          seguradoTipoPessoa: getValue('seguradoTipoPessoa'),
          seguradoDocumento: getValue('seguradoDocumento'),
          seguradoDataNascimento: getValue('seguradoDataNascimento'),
          seguradoEstadoCivil: getValue('seguradoEstadoCivil'),
          seguradoSexo: getValue('seguradoSexo'),
          seguradoTipoIdentidade: getValue('seguradoTipoIdentidade'),
          seguradoNumIdentidade: getValue('seguradoNumIdentidade'),
          seguradoOrgaoEmissor: getValue('seguradoOrgaoEmissor'),
          seguradoDataEmissao: getValue('seguradoDataEmissao'),
          seguradoEstrangeiro: getRadio('seguradoEstrangeiro'),
          seguradoPais: getValue('seguradoPais'),
          seguradoTempoPais: getValue('seguradoTempoPais'),
          seguradoPaisResidencia: getValue('seguradoPaisResidencia'),
          seguradoAtividadePrincipal: getValue('seguradoAtividadePrincipal'),
          seguradoFaixaRenda: getValue('seguradoFaixaRenda'),
          seguradoPPE: getRadio('seguradoPPE'),
          seguradoPPENome: getValue('seguradoPPENome'),
          seguradoPPECPF: getValue('seguradoPPECPF'),
          seguradoPPEGrauRelacionamento: getValue('seguradoPPEGrauRelacionamento'),
          seguradoCEP: getValue('segurado_cep'),
          seguradoLogradouro: getValue('segurado_logradouro'),
          seguradoNumero: getValue('segurado_numero'),
          seguradoBairro: getValue('segurado_bairro'),
          seguradoCidade: getValue('segurado_cidade'),
          seguradoEstado: getValue('segurado_estado'),
          seguradoCNH: getFile('cnhSeg'),
          seguradoComprovanteResidencia: getFile('comprovanteResidenciaSeg'),
          // Confirmação
          confirmado: getChecked('renovConfirm'),
        };
        break;
      case 'endosso':
        formData = {
          tipo: currentFluxo,
          nomeOuRazao: getValue('endossoNome'),
          documento: getValue('endossoDocumento'),
          seguradora: getValue('endossoSeguradora'),
          outraSeguradora: getValue('endossoOutraSeguradoraNome'),
          apoliceAPP: getValue('endossoApoliceAPP'),
          apoliceRCF: getValue('endossoApoliceRCF'),
          tipoSolicitacao: getValue('endossoTipo'),
        };
        switch (formData.tipoSolicitacao) {
          case 'substituicao_veiculo':
            Object.assign(formData, {
              placaAtual: getValue('endossoVeiculoPlacaAtual'),
              placaNova: getValue('endossoVeiculoPlacaNova'),
              chassi: getValue('endossoVeiculoChassi'),
              renavam: getValue('endossoVeiculoRenavam'),
              fabricante: getValue('endossoVeiculoFab'),
              modelo: getValue('endossoVeiculoModelo'),
              ano: getValue('endossoVeiculoAno'),
              lotacao: getIntValue('endossoVeiculoLotacao'),
              crlv: getFile('endossoVeiculoCRLV'),
            });
            break;
          case 'inclusao_condutor':
            Object.assign(formData, {
              qaInicial: getValue('endossoQaInicial'),
              acaoCondutor: getValue('endossoAcao'),
              condutor1RetirarNome: getValue('endossoCondutor1RetirarNome'),
              condutor1RetirarCPF: getValue('endossoCondutor1RetirarCPF'),
              condutor2RetirarNome: getValue('endossoCondutor2RetirarNome'),
              condutor2RetirarCPF: getValue('endossoCondutor2RetirarCPF'),
              condutor1Nome: getValue('endossoCondutor1Nome'),
              condutor1CPF: getValue('endossoCondutor1CPF'),
              condutor1CNH: getFile('endossoCondutor1CNH'),
              condutor2Nome: getValue('endossoCondutor2Nome'),
              condutor2CPF: getValue('endossoCondutor2CPF'),
              condutor2CNH: getFile('endossoCondutor2CNH'),
            });
            break;
          case 'alteracao_endereco':
            Object.assign(formData, {
              novoEndereco: getValue('endossoNovoEndereco'),
              novoEmail: getValue('endossoNovoEmail'),
              novoTelefone: getValue('endossoNovoTelefone'),
              comprovanteEndereco: getFile('endossoNovoEnderecoComp'),
            });
            break;
          case 'correcao_cadastral':
            Object.assign(formData, {
              tipoPessoa: getRadio('tipoPessoa'),
              segNomePF: getValue('segNomePF'),
              segCPF: getValue('segCPF'),
              segRazao: getValue('segRazao'),
              segCNPJ: getValue('segCNPJ'),
              cnhSegurado: getFile('endossoCorrecaoCNH'),
            });
            break;
        }
        break;
      case 'segunda_via':
        formData = {
          tipo: currentFluxo,
          nomeOuRazao: getValue('segundaViaNome'),
          documento: getValue('segundaViaDocumento'),
          tipoDocumento: getValue('segundaViaTipoDoc'),
          outroDocumento: getValue('segundaViaOutroNome'),
          responsavel: getValue('segundaViaResponsavel'),
          observacoes: getValue('segundaViaObs'),
        };
        break;
      case 'financeiro_regularizacao':
        formData = {
          tipo: currentFluxo,
          nomeOuRazao: getValue('finRegNome'),
          documento: getValue('finRegDocumento'),
          dataVencimento: getValue('finRegDataVencimento'),
          parcelaAberta: getValue('finRegParcela'),
          apoliceRCF: getValue('finRegApoliceRCF'),
          motivoInadimplencia: getValue('finRegMotivo'),
          responsavel: getValue('finRegResponsavel'),
          observacoes: getValue('finRegObs'),
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
  document.querySelectorAll('input[name="seguradoEstrangeiro"]').forEach((r) => r.addEventListener("change", applyEstipulanteVisibility));
  document.querySelectorAll('input[name="seguradoPPE"]').forEach((r) => r.addEventListener("change", applyEstipulanteVisibility));
  document.querySelectorAll('input[name="tigoClube"]').forEach((r) => r.addEventListener("change", toggleTigoClubeAdesao));
  
  // Listener para o campo CNPJ
  const cnpjInput = document.getElementById('cnpj');
  if (cnpjInput) {
    cnpjInput.addEventListener('blur', buscar);
    cnpjInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        buscar();
      }
    });
  }

  // const cepInput = document.getElementById('cep');
  // if (cepInput) {
  //   cepInput.addEventListener('keydown', function(event) {
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       buscar();
  //     }
  //   });
  // }

  const seguradoCepInput = document.getElementById('segurado_cep');
  if (seguradoCepInput) {
    seguradoCepInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        buscarCep();
      }
    });
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
  toggleTigoClubeAdesao();

  // Popula a etapa de confirmação da renovação se for a etapa ativa
  if (activeSteps[currentStep]?.template === 'renovacao_confirmar') {
    populateRenovacaoConfirmacao();
  }
}

function applyProductsVisibility() {
  const produtosSelect = document.getElementById("produtos");
  const coberturaRCF = document.getElementById("coberturaRCF");
  const coberturaAPP = document.getElementById("coberturaAPP");

  if (!produtosSelect || !coberturaRCF || !coberturaAPP) return;

  const selectedProduct = produtosSelect.value;

  const showRCF = selectedProduct === 'rcf' || selectedProduct === 'rcf_app';
  const showAPP = selectedProduct === 'app' || selectedProduct === 'rcf_app';

  coberturaRCF.style.display = showRCF ? 'block' : 'none';
  coberturaAPP.style.display = showAPP ? 'block' : 'none';

  if (document.getElementById('valorRCF_select')) {
      document.getElementById('valorRCF_select').required = showRCF;
  }
   if (document.getElementById('valorAPP_select')) {
      document.getElementById('valorAPP_select').required = showAPP;
  }

  if (showRCF) {
    handleRcfVisibility();
  }
  if (showAPP) {
    handleAppVisibility();
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
    const estrangeiroSim = document.getElementById("seguradoEstrangeiroSim");
    const blocoEstrangeiro = document.getElementById("seguradoBlocoEstrangeiro");
    if (estrangeiroSim && blocoEstrangeiro) {
        blocoEstrangeiro.style.display = estrangeiroSim.checked ? "" : "none";
        document.getElementById("seguradoPais").required = estrangeiroSim.checked;
        document.getElementById("seguradoTempoPais").required = estrangeiroSim.checked;
        document.getElementById("seguradoPaisResidencia").required = estrangeiroSim.checked;
    }

    const ppeSim = document.getElementById("seguradoPPESim");
    const blocoPPE = document.getElementById("seguradoBlocoPPE");
    if (ppeSim && blocoPPE) {
        blocoPPE.style.display = ppeSim.checked ? "" : "none";
        document.getElementById("seguradoPPENome").required = ppeSim.checked;
        document.getElementById("seguradoPPECPF").required = ppeSim.checked;
        document.getElementById("seguradoPPEGrauRelacionamento").required = ppeSim.checked;
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

function toggleTigoClubeAdesao() {
  const tigoClubeSim = document.getElementById("tigoClubeSim");
  const adesaoContainer = document.getElementById("tigoClubeAdesaoContainer");
  const adesaoInput = document.getElementById("tigoClubeAdesao");

  if (tigoClubeSim && adesaoContainer && adesaoInput) {
    const show = tigoClubeSim.checked;
    adesaoContainer.style.display = show ? 'block' : 'none';
    adesaoInput.required = show;
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
  // Define os IDs dos campos com base no prefixo
  const isEstipulante = prefix === 'estipulante';
  const cepId = isEstipulante ? 'cep' : 'segurado_cep';
  const logradouroId = isEstipulante ? 'logradouro' : 'segurado_logradouro';
  const bairroId = isEstipulante ? 'bairro' : 'segurado_bairro';
  const cidadeId = isEstipulante ? 'cidade' : 'segurado_cidade';
  const estadoId = isEstipulante ? 'estado' : 'segurado_estado';

  const cepInput = document.getElementById(cepId);
  const addressFields = [
    document.getElementById(logradouroId),
    document.getElementById(bairroId),
    document.getElementById(cidadeId),
    document.getElementById(estadoId),
  ].filter(Boolean); // Filtra campos que possam não existir

  const cep = cepInput.value.replace(/\D/g, '');

  // Limpa estado de erro e valores antigos
  cepInput.classList.remove('is-invalid');
  const errorDiv = cepInput.closest('.input-group').querySelector('.invalid-feedback');
  if(errorDiv) errorDiv.textContent = 'Informe um CEP válido.'; // Restaura mensagem padrão
  addressFields.forEach(field => { field.value = ''; });

  if (cep.length !== 8) {
    return; // Não busca se o CEP for inválido
  }

  // Ativa o estado de "carregando"
  addressFields.forEach(field => {
    field.placeholder = 'Carregando...';
    field.disabled = true;
  });
  cepInput.disabled = true; // Desabilita o campo de CEP também

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) {
      cepInput.classList.add('is-invalid');
      if(errorDiv) errorDiv.textContent = 'CEP não encontrado.';
      addressFields.forEach(field => { field.value = ''; }); // Limpa campos em caso de erro
      return;
    }

    // Preenche os campos com os dados da API
    document.getElementById(logradouroId).value = data.logradouro;
    document.getElementById(bairroId).value = data.bairro;
    document.getElementById(cidadeId).value = data.localidade;
    document.getElementById(estadoId).value = data.uf;

  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    cepInput.classList.add('is-invalid');
    if(errorDiv) errorDiv.textContent = 'Erro ao buscar CEP.';
  } finally {
    // Desativa o estado de "carregando"
    addressFields.forEach(field => {
      field.placeholder = '';
      field.disabled = false;
    });
    cepInput.disabled = false;
  }
}

// =================================================================
// 7. CHAMADA AO CSV DE ESTIPULANTES
// =================================================================
function limpar(str){ return (str || '').replace(/\D/g, ''); }

async function buscar() {
    const cnpjInput = document.getElementById('cnpj');
    const cnpj = limpar(cnpjInput.value);
    const resultadoDiv = document.getElementById('resultadoEstipulante');

    if (!cnpj) {
        resultadoDiv.innerHTML = `<div class="alert alert-warning">Digite um CNPJ válido.</div>`;
        return;
    }

    resultadoDiv.innerHTML = `<div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Buscando...</span></div>`;

    try {
        // 1. Buscar e processar ambos os CSVs em paralelo
        const [rcfResponse, appResponse] = await Promise.all([
            fetch('estipulantes_rcf.csv').catch(e => e),
            fetch('estipulantes_app.csv').catch(e => e)
        ]);

        let achados_rcf = [];
        let achados_app = [];
        let estipulanteNome = '';

        // Processa RCF
        if (rcfResponse.ok) {
            const texto_rcf = await rcfResponse.text();
            const csv_rcf = Papa.parse(texto_rcf, { header: true, skipEmptyLines: true }).data;
            achados_rcf = csv_rcf.filter(l => limpar(l.cnpj) === cnpj);
        } else {
            console.error('Falha ao carregar estipulantes_rcf.csv');
        }

        // Processa APP
        if (appResponse.ok) {
            const texto_app = await appResponse.text();
            const csv_app = Papa.parse(texto_app, { header: true, skipEmptyLines: true, delimiter: ';' }).data;
            achados_app = csv_app.filter(l => limpar(l.cnpj) === cnpj);
        } else {
            console.error('Falha ao carregar estipulantes_app.csv');
        }

        if (achados_rcf.length === 0 && achados_app.length === 0) {
            resultadoDiv.innerHTML = `<div class="alert alert-danger">Estipulante não encontrado para o CNPJ informado.</div>`;
            return;
        }
        
        // Pega o nome do estipulante de qualquer um dos resultados
        estipulanteNome = (achados_rcf.length > 0) ? achados_rcf[0].estipulante : achados_app[0].estipulante;

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