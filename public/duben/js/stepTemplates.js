const stepTemplates = {
  tipo_solicitacao_selecao: `
    <div class="form-step" data-step="0">
      <h4 class="mb-4">Tipo de Solicitação</h4>
      <div class="mb-3">
        <label for="tipoSolicitacao" class="form-label">Selecione *</label>
        <select id="tipoSolicitacao" class="form-select" required>
          <option value="" disabled selected>Selecione</option>
          <option value="nova" data-visible-when-solicitante="colaborador, estipulante, parceiro">Nova Transmissão</option>
          <option value="renovacao" data-visible-when-solicitante="colaborador, estipulante, parceiro">Renovação</option>
          <option value="endosso">Endosso</option>
          <option value="segunda_via">2ª Via de Documentos/Posição Financeira</option>
          <option value="financeiro_regularizacao">Financeiro Regularização</option>
          <option value="cotacao" data-visible-when-solicitante="colaborador, segurado">Cotação</option>
          <option value="aviso_sinistro">Aviso de Sinistro</option>
        </select>
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
  tipo_solicitante: `
    <div class="form-step" data-step="0">
      <h4 class="mb-4">Identificação</h4>
      <div class="mb-3">
        <label for="tipoSolicitante" class="form-label">Você é? *</label>
        <select id="tipoSolicitante" class="form-select" required>
          <option value="">Selecione</option>
          <option value="parceiro">Parceiro</option>
          <option value="estipulante">Estipulante</option>
          <option value="colaborador">Colaborador</option>
        </select>
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
  estipulante_seguradoras: `
    <div class="form-step">
      <div id="dados_estip" class="d-none">
        <h4 class="mb-4">Dados do Estipulante</h4>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="codigo" class="form-label">Código Estipulante *</label>
            <input id="codigo" class="form-control" placeholder="10L4" >
          </div>
        </div>

        <div id="resultadoEstipulante" class="mt-3">
          <div id="estipulanteLoading" style="display: none;">
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Buscando...</span>
            </div>
          </div>
          <div id="estipulanteError" class="alert alert-danger" style="display: none;"></div>

          
          <div id="estipulanteCoberturaSelection" class="mt-4" style="display: none;">
            <h5 id="estipulanteNomeDisplay" class="mb-3"></h5>
            <div data-visible-when-fluxo="nova">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="coberturaEstipulanteRCF" class="form-label">Cobertura RCF (Danos Materiais)</label>
                  <select id="coberturaEstipulanteRCF" class="form-select">
                    <option value="" selected>Nenhuma</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="coberturaEstipulanteAPP" class="form-label">Cobertura APP (Morte/Invalidez)</label>
                  <select id="coberturaEstipulanteAPP" class="form-select">
                    <option value="" selected>Nenhuma</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div data-visible-when-fluxo="nova">
              <button class="btn btn-success" type="button" id="selecionarCoberturaEstipulanteBtn">
                <i class="bi bi-check-circle"></i> Confirmar Seleção
              </button>
            </div>
          </div>
          

          <div data-visible-when-fluxo="nova">
            <div id="resultadoFinalEstipulante" class="mt-4" style="display: none;">
              <h5 class="mb-3">Apólices Selecionadas</h5>
              <div id="resultadoFinalEstipulanteContent" class="card p-3">
                <!-- Conteúdo do resultado -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-visible-when-solicitante="colaborador">
        <h4 id="segs_trabalhadas" class="mb-4">Seguradoras Trabalhadas</h4>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="segTrabalhadas" class="form-label">Seguradoras *</label>
            <select id="segTrabalhadas" class="form-select" multiple name="segTrabalhadas[]" data-rule="seguradoraContainer:Outra">
              <option value="aruana">Aruana</option>
              <option value="porto">Porto Seguro</option>
              <option value="azul">Azul</option>
              <option value="allianz">Allianz</option>
              <option value="tokio_marine">Tokio Marine</option>
              <option value="hdi">HDI</option>
              <option value="sompo">Sompo</option>
              <option value="bradesco">Bradesco</option>
              <option value="suhai">Suhai</option>
              <option value="mapfre">Mapfre</option>
              <option value="mbm">MBM</option>
              <option value="sabemi">Sabemi</option>
              <option value="akad">Akad</option>
              <option value="ezze">Ezze</option>
              <option value="darwin">Darwin</option>
              <option value="yelium">Yelium</option>
              <option value="zurich">Zurich</option>
              <option value="chubb">Chubb</option>
              <option value="essor">Essor</option>
              <option value="sura">Sura</option>
              <option value="icatu">Icatu</option>
              <option value="alfa">Alfa</option>
              <option value="fator">Fator</option>
              <option value="american_life">American Life</option>
              <option value="excelsior">Excelsior</option>
              <option value="kovr">Kovr</option>
              <option value="alm">ALM</option>
              <option value="axa">AXA</option>
            </select>
          </div>
          <div class="mb-3" id="seguradoraContainer" style="display: none;">
            <label for="seguradoraNome" class="form-label">Nome da outra seguradora *</label>
            <input type="text" id="seguradoraNome" class="form-control" />
          </div>
        </div>
      </div>

      <div class="row" data-visible-when-solicitante="colaborador, estipulante">
        <div class="col-md-12 mb-3 mt-3">
          <label for="paymentMethod" class="form-label">Forma de pagamento *</label>
          <select id="paymentMethod" class="form-select" required>
            <option value="" disabled selected>Selecione</option>
            <option>Boleto</option> <option>Cartão</option> <option>Débito em conta</option>
          </select>
        </div>
      </div>
      
      <div id="parcelamento_fields">
        <hr>
        <div class="alert alert-info">
          <strong>Atenção:</strong> O produto APP (Acidentes Pessoais de Passageiros) é sempre pago à vista. O parcelamento se aplica apenas ao RCF.
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="qtdParcelas" class="form-label">Quantidade de parcelas *</label>
            <select id="qtdParcelas" class="form-select" required>
              <option value="" disabled selected>Selecione</option>
              <option>1x</option> <option>2x</option> <option>3x</option> <option>4x</option> <option>5x</option> <option>6x</option> <option>7x</option> <option>8x</option> <option>9x</option> <option>10x</option> <option>11x</option>  <option>12x</option> 
            </select>
          </div>
        </div>
      </div>

      <div id="cotacao-container" class="mb-3" data-visible-when-solicitante="colaborador, parceiro">
        <label class="form-label">Upload Cotação </label>
        <input id="cnhSeg" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"  />
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
  produtos_coberturas: `
    <div class="form-step">
      <h4 class="mb-4">Produtos e Coberturas</h4>
      <div class="mb-4">
        <label class="form-label">Selecione os produtos desejados *</label>
        <select id="produtos" class="form-select" required data-rule="app_fields:rcf_app;rcf_fields:rcf_app;rcf_fields:rcf;app_fields:app;empresarial_fields:empresarial;observacaoAPP:rcf_app;observacaoAPP:app;seguro_vida_fields:seguro_vida;seguro_viagem_fields:seguro_viagem;rc_profissional_fields:rc_profissional;carta_verde_fields:carta_verde;veiculoFields:rcf_app;veiculoFields:rcf;veiculoFields:app;cotacao_extra_fields:rcf_app;cotacao_extra_fields:rcf;cotacao_extra_fields:app;auto_compreensivo_fields:auto">
          <option value="" disabled selected>Selecione</option>
          <option value="rcf_app">RCF e APP</option>
          <option value="rcf">Somente RCF</option>
          <option value="app">Somente APP</option>
          <option value="empresarial" data-hide-when-estipulante-nova="true">Seguro Empresarial</option>
          <option value="seguro_vida" data-hide-when-estipulante-nova="true">Seguro de Vida</option>
          <option value="seguro_viagem" data-hide-when-estipulante-nova="true">Seguro Viagem</option>
          <option value="rc_profissional" data-hide-when-estipulante-nova="true">RC Profissional</option>
          <option value="carta_verde" data-hide-when-estipulante-nova="true">Seguro Carta Verde</option>
          <option value="auto" data-hide-when-estipulante-nova="true">Seguro Auto Compreensivo</option>
        </select>
      </div>

      <div data-visible-when-fluxo="cotacao">
        <div id="cotacao_extra_fields" style="display: none;">
            <hr>
            <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Estado Civil do Segurado *</label>
                  <select id="seguradoEstadoCivil" class="form-select">
                      <option value="">Selecione</option>
                      <option>Solteiro(a)</option>
                      <option>Casado(a)</option>
                      <option>Divorciado(a)</option>
                      <option>Viúvo(a)</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="cepPernoite" class="form-label">CEP Pernoite *</label>
                    <input id="cepPernoite" class="form-control" placeholder="00000-000">
                </div>
            </div>

            <h5 class="mt-4">Endereço do Segurado</h5>
            <div class="row">
                <div class="col-md-4 mb-3">
                <label for="segurado_cep_cotacao" class="form-label">CEP *</label>
                <div class="input-group">
                    <input id="segurado_cep_cotacao" class="form-control" placeholder="00000-000">
                    <button class="btn btn-outline-secondary" type="button" onclick="buscarCep('segurado_cep_cotacao', 'segurado_logradouro_cotacao', 'segurado_bairro_cotacao', 'segurado_cidade_cotacao', 'segurado_estado_cotacao')"><i class="bi bi-search"></i></button>
                </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 mb-3">
                <label class="form-label">Logradouro</label>
                <input id="segurado_logradouro_cotacao" class="form-control" readonly>
                </div>
                <div class="col-md-4 mb-3">
                <label class="form-label">Número</label>
                <input type="number" id="segurado_numero_cotacao" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                <label class="form-label">Bairro</label>
                <input id="segurado_bairro_cotacao" class="form-control" readonly>
                </div>
                <div class="col-md-4 mb-3">
                <label class="form-label">Cidade</label>
                <input id="segurado_cidade_cotacao" class="form-control" readonly>
                </div>
                <div class="col-md-2 mb-3">
                <label class="form-label">Estado</label>
                <input id="segurado_estado_cotacao" class="form-control" readonly>
                </div>
            </div>
        </div>
      </div>

      <div data-visible-when-fluxo="nova, renovacao">
        <div id="rcf_fields" style="display: none;">
          <div id="coberturaRCFren" class="mb-4">
            <label for="valorRCF_select" class="form-label">Valor RCF (R$) *</label>
            <div id="rcfApoliceInfo" class="text-muted mb-2"></div> 
            <select id="valorRCF_select" class="form-select" data-rule="valorRCF_outro:outro">
              <option value="" disabled selected>Selecione</option>
              <option value="50000">R$ 50.000</option>
              <option value="100000">R$ 100.000</option>
              <option value="150000">R$ 150.000</option>
              <option value="200000">R$ 200.000</option>
              <option value="outro">Outro Valor</option>
            </select>
            <input type="number" class="form-control mt-2" id="valorRCF_outro" step="1000" style="display: none;" placeholder="Digite o valor desejado" />
          </div>
        </div>
      </div>


      <div data-visible-when-fluxo="nova, renovacao">
        <div id="app_fields" class="mb-4" style="display: none;">
          <label for="valorAPP_select" class="form-label">Valor APP por pessoa (R$) *</label>
          <div id="appApoliceInfo" class="text-muted mb-2"></div>
          <select id="valorAPP_select" class="form-select" data-rule="valorAPP_outro:outro">
            <option value="" disabled selected>Selecione</option>
            <option value="5000">R$ 5.000</option>
            <option value="10000">R$ 10.000</option>
            <option value="outro">Outro Valor</option>
          </select>
          <input type="number" class="form-control mt-2" id="valorAPP_outro" step="1000" style="display: none;" placeholder="Digite o valor desejado" />
        </div>
      </div>

      <div id="parcelamento_fields" style="display: none;">
        <hr>
        <h4 class="mb-4">Parcelamento</h4>
        <div id="observacaoAPP" class="alert alert-info" style="display: none;">
          <strong>Atenção:</strong> O produto APP (Acidentes Pessoais de Passageiros) é sempre pago à vista. O parcelamento se aplica apenas ao RCF.
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="qtdParcelas" class="form-label">Quantidade de parcelas *</label>
            <select id="qtdParcelas" class="form-select" required>
              <option value="" disabled selected>Selecione</option>
              <option>1x</option> <option>2x</option> <option>3x</option> <option>4x</option> <option>5x</option> <option>6x</option> <option>7x</option> <option>8x</option> <option>9x</option> <option>10x</option> <option>11x</option>  <option>12x</option> 
            </select>
          </div>
        </div>
      </div>

      <div id="empresarial_fields" style="display: none;">
        <h5 class="mt-4 mb-3">Dados da Empresa</h5>
        <div class="row">
            <div class="col-md-8 mb-3">
                <label for="empRazaoSocial" class="form-label">Razão Social *</label>
                <input type="text" id="empRazaoSocial" class="form-control" required>
            </div>
            <div class="col-md-4 mb-3">
                <label for="empCnpj" class="form-label">CNPJ *</label>
                <input type="text" id="empCnpj" class="form-control" required>
            </div>
        </div>
        <div class="mb-3">
            <label for="empEndereco" class="form-label">Endereço *</label>
            <input type="text" id="empEndereco" class="form-control" placeholder="Rua, Número, Bairro, Cidade - UF" required>
        </div>
        <div class="mb-3">
            <label for="empAtividade" class="form-label">Atividade Principal *</label>
            <input type="text" id="empAtividade" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Histórico de Sinistros (últimos 5 anos)? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="empHistSinistro" id="empHistSinistroSim" value="Sim" required>
                  <label class="form-check-label" for="empHistSinistroSim">Sim</label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="empHistSinistro" id="empHistSinistroNao" value="Não" required>
                  <label class="form-check-label" for="empHistSinistroNao">Não</label>
              </div>
            </div>
        </div>
        <hr>
        <h5 class="mt-4 mb-3">Dados da Cobertura</h5>
        <div class="mb-3">
            <label for="empLimite" class="form-label">Limite de Cobertura (R$) *</label>
            <input type="number" id="empLimite" class="form-control" required>
        </div>
        <div class="mb-3">
            <label class="form-label">Cobertura Desejada *</label>
            <select id="empCoberturaDesejada" class="form-select" required>
                <option value="">Selecione</option>
                <option value="predio">Prédio</option>
                <option value="conteudo">Conteúdo</option>
                <option value="predio_conteudo">Prédio + Conteúdo</option>
            </select>
        </div>
        <div class="mb-3">
            <label class="form-label">Deseja coberturas adicionais? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="empAdicionais" id="empAdicionaisSim" value="Sim" required data-rule="coberturasAdicionaisContainer:checked">
                  <label class="form-check-label" for="empAdicionaisSim">Sim</label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" name="empAdicionais" id="empAdicionaisNao" value="Não" required>
                  <label class="form-check-label" for="empAdicionaisNao">Não</label>
              </div>
            </div>
        </div>
        <div id="coberturasAdicionaisContainer" style="display: none;">
            <label class="form-label">Quais?</label>
            <div class="row">
                ${[
                  'RC',
                  'RC Danos Morais',
                  'Home Office',
                  'Delivery',
                  'Danos Elétricos',
                  'Alagamentos',
                  'Vazamentos',
                  'Desmoronamentos',
                  'Vidros',
                  'Perda/Pagamento de aluguel',
                  'Subtração de bens',
                  'Subtração de valores',
                  'Outros',
                ]
                  .map(
                    cov => `
                <div class="col-md-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="${cov}" id="cov_${cov.toLowerCase().replace(/[^a-z0-9]/g, '')}">
                        <label class="form-check-label" for="cov_${cov.toLowerCase().replace(/[^a-z0-9]/g, '')}">${cov}</label>
                    </div>
                </div>
                `,
                  )
                  .join('')}
            </div>
        </div>
        <div class="mb-3 mt-3">
            <label for="empObs" class="form-label">Observações</label>
            <textarea id="empObs" class="form-control" rows="3"></textarea>
        </div>
      </div>
      
      <div id="veiculoFields" style="display: none;">
        <h4 class="mb-4">Dados do veículo</h4>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Placa *</label>
            <input id="veiPlaca" class="form-control" placeholder="ABC1D23"  />
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Chassi *</label>
            <input id="veiChassi" class="form-control" minlength="5"  />
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Renavam *</label>
            <input id="veiRenavam" class="form-control"  />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Fabricante *</label>
            <input id="veiFab" class="form-control"  />
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Modelo *</label>
            <input id="veiModelo" class="form-control"  />
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Ano *</label>
            <input id="veiAno" type="number" class="form-control" min="1980" max="2099"  />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Uso *</label>
            <select id="veiUso" class="form-select" >
              <option value="" disabled selected>Selecione</option>
              <option>Moto</option><option>Van Turismo</option><option>Van Escolar</option><option>Van Urbano</option><<option>Táxi/Aplicativos</option> <option>Policiamento/Bombeiro</option> <option>Comercial/Profissional</option><option>Particular/Passeio</option>
              <option>Casa Locadora - Uso Comercial/Industrial, S/Veículo por Aplicativo</option> <option>Casa Locadora - Uso Veículo por Aplicativos</option> <option>Chapa de Fabricante</option> <option>Auto Escola</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Lotação *</label>
            <input id="veiLotacao" type="number" class="form-control" min="1"  />
          </div>
        </div>
        <div class="row" id="tigoClubeQuestionContainer" style="display: none;">
                <div class="col-md-12 mb-3">
                    <label class="form-label">Contrato com adesão ao TIGO CLUBE? *</label>
                    <div class="d-flex gap-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tigoClube" id="tigoClubeSim" value="sim" data-rule="tigoClubeAdesaoContainer:checked" />
                            <label class="form-check-label" for="tigoClubeSim">Sim</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="tigoClube" id="tigoClubeNao" value="nao"  checked />
                            <label class="form-check-label" for="tigoClubeNao">Não</label>
                        </div>
                    </div>
                </div>
              </div>        <div id="tigoClubeAdesaoContainer" class="mb-3" style="display: none;">
          <label class="form-label">Upload do documento de adesão assinado (PDF/JPG/PNG) *</label>
          <input id="tigoClubeAdesao" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
        </div>
        <div class="mb-3">
          <label class="form-label">Upload CLRV (PDF/JPG/PNG) *</label>
          <input id="veiCNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"  />
        </div>
      </div>

      <div id="seguro_vida_fields" style="display: none;">
        <h4 class="mb-4">Seguro de Vida - Informações Médicas</h4>
        
        <div class="row">
          <div class="col-md-3 mb-3">
            <label class="form-label">Doenças pré-existentes? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="vidaDoencasPreExistentes" id="vidaDoencasPreExistentesSim" value="sim" required data-rule="vidaQuaisDoencasPreExistentesContainer:checked">
                <label class="form-check-label" for="vidaDoencasPreExistentesSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="vidaDoencasPreExistentes" id="vidaDoencasPreExistentesNao" value="nao" required>
                <label class="form-check-label" for="vidaDoencasPreExistentesNao">Não</label>
              </div>
            </div>
          </div>
          <div id="vidaQuaisDoencasPreExistentesContainer" class="col-md-9 mb-3" style="display: none;">
            <label for="vidaQuaisDoencasPreExistentes" class="form-label">Quais doenças pré-existentes?</label>
            <textarea id="vidaQuaisDoencasPreExistentes" class="form-control" rows="2"></textarea>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-3 mb-3">
            <label class="form-label">Cirurgias anteriores? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="vidaCirurgiasAnteriores" id="vidaCirurgiasAnterioresSim" value="sim" required data-rule="vidaQuaisCirurgiasAnterioresContainer:checked">
                <label class="form-check-label" for="vidaCirurgiasAnterioresSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="vidaCirurgiasAnteriores" id="vidaCirurgiasAnterioresNao" value="nao" required>
                <label class="form-check-label" for="vidaCirurgiasAnterioresNao">Não</label>
              </div>
            </div>
          </div>
          <div id="vidaQuaisCirurgiasAnterioresContainer" class="col-md-9 mb-3" style="display: none;">
            <label for="vidaQuaisCirurgiasAnteriores" class="form-label">Quais cirurgias anteriores?</label>
            <textarea id="vidaQuaisCirurgiasAnteriores" class="form-control" rows="2"></textarea>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-3 mb-3">
            <label class="form-label">Doenças familiares? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="vidaDoencasFamiliares" id="vidaDoencasFamiliaresSim" value="sim" required data-rule="vidaQuaisDoencasFamiliaresContainer:checked">
                <label class="form-check-label" for="vidaDoencasFamiliaresSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="vidaDoencasFamiliares" id="vidaDoencasFamiliaresNao" value="nao" required>
                <label class="form-check-label" for="vidaDoencasFamiliaresNao">Não</label>
              </div>
            </div>
          </div>
          <div id="vidaQuaisDoencasFamiliaresContainer" class="col-md-9 mb-3" style="display: none;">
            <label for="vidaQuaisDoencasFamiliares" class="form-label">Quais doenças familiares?</label>
            <textarea id="vidaQuaisDoencasFamiliares" class="form-control" rows="2"></textarea>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-3 mb-3">
            <label class="form-label">Pratica atividade física? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="vidaAtividadeFisica" id="vidaAtividadeFisicaSim" value="sim" required data-rule="vidaQuaisAtividadesFisicasContainer:checked">
                <label class="form-check-label" for="vidaAtividadeFisicaSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="vidaAtividadeFisica" id="vidaAtividadeFisicaNao" value="nao" required>
                <label class="form-check-label" for="vidaAtividadeFisicaNao">Não</label>
              </div>
            </div>
          </div>
          <div id="vidaQuaisAtividadesFisicasContainer" class="col-md-9 mb-3" style="display: none;">
            <label for="vidaQuaisAtividadesFisicas" class="form-label">Quais atividades físicas?</label>
            <textarea id="vidaQuaisAtividadesFisicas" class="form-control" rows="2"></textarea>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Ingere bebidas alcoólicas? *</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="vidaBebidasAlcoolicas" id="vidaBebidasAlcoolicasSim" value="sim" required>
              <label class="form-check-label" for="vidaBebidasAlcoolicasSim">Sim</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="vidaBebidasAlcoolicas" id="vidaBebidasAlcoolicasNao" value="nao" required>
              <label class="form-check-label" for="vidaBebidasAlcoolicasNao">Não</label>
            </div>
          </div>
        </div>
        
        <div class="mb-3">
          <label class="form-label">Fuma? *</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="vidaFuma" id="vidaFumaSim" value="sim" required>
              <label class="form-check-label" for="vidaFumaSim">Sim</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="vidaFuma" id="vidaFumaNao" value="nao" required>
              <label class="form-check-label" for="vidaFumaNao">Não</label>
            </div>
          </div>
        </div>

        <h4 class="mt-4 mb-3">Coberturas Desejadas</h4>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="vidaMorteNatural">
          <label class="form-check-label" for="vidaMorteNatural">Morte natural</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="vidaMorteAcidental">
          <label class="form-check-label" for="vidaMorteAcidental">Morte acidental</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="vidaInvalidezPermanente">
          <label class="form-check-label" for="vidaInvalidezPermanente">Invalidez permanente</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="vidaDoencasGraves">
          <label class="form-check-label" for="vidaDoencasGraves">Doenças graves</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="vidaDIT">
          <label class="form-check-label" for="vidaDIT">DIT</label>
        </div>
        <div class="mb-3">
          <label for="vidaOutrasCoberturas" class="form-label">Outras coberturas:</label>
          <textarea id="vidaOutrasCoberturas" class="form-control" rows="2"></textarea>
        </div>

        <h4 class="mt-4 mb-3">Beneficiários</h4>
        <div class="mb-3">
          <label class="form-label">Incluir beneficiários? *</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="vidaIncluirBeneficiarios" id="vidaIncluirBeneficiariosSim" value="sim" required data-rule="vidaBeneficiariosContainer:checked">
              <label class="form-check-label" for="vidaIncluirBeneficiariosSim">Sim</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="vidaIncluirBeneficiarios" id="vidaIncluirBeneficiariosNao" value="nao" required>
              <label class="form-check-label" for="vidaIncluirBeneficiariosNao">Não</label>
            </div>
          </div>
        </div>
        <div id="vidaBeneficiariosContainer" style="display: none;">
          <div class="beneficiario-block mb-3">
            <h5>Beneficiário 1</h5>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nome Completo *</label>
                <input id="vidaBeneficiario1Nome" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">CPF *</label>
                <input id="vidaBeneficiario1CPF" class="form-control" placeholder="000.000.000-00" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Data de Nascimento *</label>
                <input type="date" id="vidaBeneficiario1Nascimento" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Sexo *</label>
                <select id="vidaBeneficiario1Sexo" class="form-select">
                  <option value="">Selecione</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Grau de Parentesco *</label>
              <input id="vidaBeneficiario1Parentesco" class="form-control" />
            </div>
          </div>
          <!-- Future enhancement: Add button to add more beneficiaries dynamically -->
        </div>

        <div class="mb-3 mt-3">
          <label for="vidaObservacoes" class="form-label">Observações</label>
          <textarea id="vidaObservacoes" class="form-control" rows="3"></textarea>
        </div>
      </div>

      <div id="seguro_viagem_fields" style="display: none;">
        <h4 class="mb-4">Seguro Viagem - Informações da Viagem</h4>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="viagemDestino" class="form-label">Destino *</label>
            <input type="text" id="viagemDestino" class="form-control" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="viagemIda" class="form-label">Data de Ida *</label>
            <input type="date" id="viagemIda" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="viagemVolta" class="form-label">Data de Volta *</label>
            <input type="date" id="viagemVolta" class="form-control" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="viagemNumViajantes" class="form-label">Número de viajantes *</label>
            <input type="number" id="viagemNumViajantes" class="form-control" required min="1">
          </div>
          <div class="col-md-6 mb-3">
            <label for="viagemIdades" class="form-label">Idades (separadas por vírgula) *</label>
            <input type="text" id="viagemIdades" class="form-control" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="viagemMotivo" class="form-label">Motivo da viagem *</label>
            <select id="viagemMotivo" class="form-select" required>
              <option value="">Selecione</option>
              <option>Turismo</option>
              <option>Negócios</option>
              <option>Estudo</option>
              <option>Outro</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="viagemTipo" class="form-label">Nacional/Internacional *</label>
            <select id="viagemTipo" class="form-select" required>
              <option value="">Selecione</option>
              <option>Nacional</option>
              <option>Internacional</option>
            </select>
          </div>
        </div>

        <h4 class="mt-4 mb-3">Coberturas Desejadas</h4>
        <div class="row">
          <div class="col-md-6">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaAssistenciaMedica">
              <label class="form-check-label" for="viagemCoberturaAssistenciaMedica">Assistência médica</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaRepatriacaoMedica">
              <label class="form-check-label" for="viagemCoberturaRepatriacaoMedica">Repatriação médica</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaRepatriacaoFuneraria">
              <label class="form-check-label" for="viagemCoberturaRepatriacaoFuneraria">Repatriação funerária</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaExtravioBagagem">
              <label class="form-check-label" for="viagemCoberturaExtravioBagagem">Extravio de bagagem</label>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaCancelamento">
              <label class="form-check-label" for="viagemCoberturaCancelamento">Cancelamento/Interrupção</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaAcidenteMorte">
              <label class="form-check-label" for="viagemCoberturaAcidenteMorte">Acidente/Morte</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaDoencasPreexistentes">
              <label class="form-check-label" for="viagemCoberturaDoencasPreexistentes">Doenças pré-existentes</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaEsportesRadicais">
              <label class="form-check-label" for="viagemCoberturaEsportesRadicais">Esportes radicais</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="viagemCoberturaSeguroSaude">
              <label class="form-check-label" for="viagemCoberturaSeguroSaude">Seguro saúde internacional</label>
            </div>
          </div>
        </div>

        <div class="mb-3 mt-3">
          <label for="viagemCondicaoMedica" class="form-label">Condição médica atual</label>
          <textarea id="viagemCondicaoMedica" class="form-control" rows="2"></textarea>
        </div>

        <div class="mb-3">
          <label for="viagemObservacoes" class="form-label">Observações</label>
          <textarea id="viagemObservacoes" class="form-control" rows="3"></textarea>
        </div>
      </div>

      <div id="rc_profissional_fields" style="display: none;">
        <h4 class="mb-4">RC Profissional - Dados</h4>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="rcpNome" class="form-label">Nome/Razão Social *</label>
            <input type="text" id="rcpNome" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="rcpDocumento" class="form-label">CPF/CNPJ *</label>
            <input type="text" id="rcpDocumento" class="form-control" required>
          </div>
        </div>
        <div class="mb-3">
          <label for="rcpEndereco" class="form-label">Endereço *</label>
          <input type="text" id="rcpEndereco" class="form-control" required>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="rcpEmail" class="form-label">E-mail *</label>
            <input type="email" id="rcpEmail" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="rcpTelefone" class="form-label">Telefone *</label>
            <input type="tel" id="rcpTelefone" class="form-control" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="rcpProfissao" class="form-label">Profissão/Área *</label>
            <input type="text" id="rcpProfissao" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="rcpExperiencia" class="form-label">Tempo de experiência *</label>
            <input type="text" id="rcpExperiencia" class="form-control" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="rcpNumProfissionais" class="form-label">Número de profissionais *</label>
            <input type="number" id="rcpNumProfissionais" class="form-control" required min="1">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Atua fora das dependências? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rcpForaDependencias" id="rcpForaDependenciasSim" value="sim" required>
                <label class="form-check-label" for="rcpForaDependenciasSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rcpForaDependencias" id="rcpForaDependenciasNao" value="nao" required>
                <label class="form-check-label" for="rcpForaDependenciasNao">Não</label>
              </div>
            </div>
          </div>
        </div>

        <h4 class="mt-4 mb-3">Tipo de Cobertura</h4>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="rcpCoberturaGeral">
          <label class="form-check-label" for="rcpCoberturaGeral">RC Geral</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="rcpCoberturaProfissional">
          <label class="form-check-label" for="rcpCoberturaProfissional">RC Profissional</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="rcpCoberturaEventos">
          <label class="form-check-label" for="rcpCoberturaEventos">RC Eventos</label>
        </div>
        <div class="mb-3">
          <label for="rcpCoberturaOutros" class="form-label">Outros:</label>
          <textarea id="rcpCoberturaOutros" class="form-control" rows="2"></textarea>
        </div>

        <div class="mb-3">
          <label for="rcpLimiteApolice" class="form-label">Limite da apólice R$ *</label>
          <input type="number" id="rcpLimiteApolice" class="form-control" required>
        </div>

        <div class="mb-3">
          <label for="rcpAtividadesExercidas" class="form-label">Atividades exercidas *</label>
          <textarea id="rcpAtividadesExercidas" class="form-control" rows="3" required></textarea>
        </div>

        <div class="mb-3">
          <label class="form-label">Reclamações judiciais/extrajudiciais? *</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="rcpReclamacoes" id="rcpReclamacoesSim" value="sim" required data-rule="rcpReclamacoesDescricaoContainer:checked">
              <label class="form-check-label" for="rcpReclamacoesSim">Sim</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="rcpReclamacoes" id="rcpReclamacoesNao" value="nao" required>
              <label class="form-check-label" for="rcpReclamacoesNao">Não</label>
            </div>
          </div>
        </div>
        <div id="rcpReclamacoesDescricaoContainer" class="mb-3" style="display: none;">
          <label for="rcpReclamacoesDescricao" class="form-label">Descrição</label>
          <textarea id="rcpReclamacoesDescricao" class="form-control" rows="3"></textarea>
        </div>

        <div class="mb-3">
          <label for="rcpObservacoes" class="form-label">Observações</label>
          <textarea id="rcpObservacoes" class="form-control" rows="3"></textarea>
        </div>
      </div>

      <div id="carta_verde_fields" style="display: none;">
        <h4 class="mb-4">Seguro Carta Verde - Dados da Viagem</h4>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="cvDestino" class="form-label">Destino *</label>
            <select id="cvDestino" class="form-select" required>
              <option value="">Selecione</option>
              <option>Argentina</option>
              <option>Paraguai</option>
              <option>Uruguai</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cvIda" class="form-label">Data de Ida *</label>
            <input type="date" id="cvIda" class="form-control" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cvVolta" class="form-label">Data de Volta *</label>
            <input type="date" id="cvVolta" class="form-control" required>
          </div>
        </div>

        <h5 class="mt-4 mb-3">Condutor Principal (se diferente do proprietário)</h5>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cvCondutorNome" class="form-label">Nome</label>
            <input type="text" id="cvCondutorNome" class="form-control">
          </div>
          <div class="col-md-6 mb-3">
            <label for="cvCondutorCpf" class="form-label">CPF</label>
            <input type="text" id="cvCondutorCpf" class="form-control">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cvCondutorNascimento" class="form-label">Data de Nascimento</label>
            <input type="date" id="cvCondutorNascimento" class="form-control">
          </div>
          <div class="col-md-6 mb-3">
            <label for="cvCondutorSexo" class="form-label">Sexo Biológico</label>
            <select id="cvCondutorSexo" class="form-select">
              <option value="">Selecione</option>
              <option>Masculino</option>
              <option>Feminino</option>
            </select>
          </div>
        </div>
        <div class="mb-3">
          <label for="cvCondutorIdAnexo" class="form-label">ID anexo</label>
          <input type="file" id="cvCondutorIdAnexo" class="form-control">
        </div>
      </div>
      
      <div id="auto_compreensivo_fields" style="display: none;">
        <h4 class="mb-4">Seguro Auto Compreensivo</h4>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Veículo é 0km? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="veiculo0km" id="veiculo0kmSim" value="sim" required data-rule="notaFiscal0kmContainer:checked">
                <label class="form-check-label" for="veiculo0kmSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="veiculo0km" id="veiculo0kmNao" value="nao" required>
                <label class="form-check-label" for="veiculo0kmNao">Não</label>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3" id="notaFiscal0kmContainer" style="display: none;">
            <label class="form-label">Nota Fiscal do Veículo (PDF/JPG/PNG)</label>
            <input id="notaFiscal0km" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png">
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Isenção Fiscal? *</label>
            <select id="isencaoFiscal" class="form-select" required data-rule="notaFiscalIsencaoContainer:ipi;notaFiscalIsencaoContainer:icms;notaFiscalIsencaoContainer:ipi_icms;notaFiscalIsencaoContainer:pcd">
              <option value="" disabled selected>Selecione</option>
              <option value="nao">Não</option>
              <option value="ipi">IPI</option>
              <option value="icms">ICMS</option>
              <option value="ipi_icms">IPI e ICMS</option>
              <option value="pcd">PCD</option>
            </select>
          </div>
          <div class="col-md-6 mb-3" id="notaFiscalIsencaoContainer" style="display: none;">
            <label class="form-label">Documento de Isenção (PDF/JPG/PNG)</label>
            <input id="notaFiscalIsencao" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png">
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Veículo com kit gás? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="kitGas" id="kitGasSim" value="sim" required>
                <label class="form-check-label" for="kitGasSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="kitGas" id="kitGasNao" value="nao" required>
                <label class="form-check-label" for="kitGasNao">Não</label>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Veículo blindado? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="blindado" id="blindadoSim" value="sim" required>
                <label class="form-check-label" for="blindadoSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="blindado" id="blindadoNao" value="nao" required>
                <label class="form-check-label" for="blindadoNao">Não</label>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Tipo de câmbio: *</label>
            <select id="tipoCambio" class="form-select" required>
              <option value="">Selecione</option>
              <option value="manual">Manual</option>
              <option value="automatico">Automático</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Possui rastreador? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rastreador" id="rastreadorSim" value="sim" required>
                <label class="form-check-label" for="rastreadorSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="rastreador" id="rastreadorNao" value="nao" required>
                <label class="form-check-label" for="rastreadorNao">Não</label>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Possui alarme? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="alarme" id="alarmeSim" value="sim" required>
                <label class="form-check-label" for="alarmeSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="alarme" id="alarmeNao" value="nao" required>
                <label class="form-check-label" for="alarmeNao">Não</label>
              </div>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Possui seguro atual? *</label>
            <div class="d-flex gap-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="seguroAtual" id="seguroAtualSim" value="sim" required data-rule="apoliceVigenteContainer:checked">
                <label class="form-check-label" for="seguroAtualSim">Sim</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="seguroAtual" id="seguroAtualNao" value="nao" required>
                <label class="form-check-label" for="seguroAtualNao">Não</label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mb-3" id="apoliceVigenteContainer" style="display: none;">
          <label class="form-label">Apólice Vigente (PDF/JPG/PNG)</label>
          <input id="apoliceVigente" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png">
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Histórico de sinistros nos últimos 5 anos? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="sinistro" id="sinistroSim" value="sim" required>
                  <label class="form-check-label" for="sinistroSim">Sim</label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="sinistro" id="sinistroNao" value="nao" required>
                  <label class="form-check-label" for="sinistroNao">Não</label>
                  </div>
              </div>
          </div>
          <div class="col-md-6 mb-3">
              <label class="form-label">Pernoite em garagem: *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="pernoiteGaragem" id="pernoiteGaragemSim" value="sim" required data-rule="tipoGaragemContainer:checked">
                  <label class="form-check-label" for="pernoiteGaragemSim">Sim</label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="pernoiteGaragem" id="pernoiteGaragemNao" value="nao" required>
                  <label class="form-check-label" for="pernoiteGaragemNao">Não</label>
                  </div>
              </div>
          </div>
        </div>

        <div class="mb-3" id="tipoGaragemContainer" style="display: none;">
          <label class="form-label">Tipo de garagem:</label>
          <select id="tipoGaragem" class="form-select">
            <option value="">Selecione</option>
            <option value="fechada">Fechada</option>
            <option value="aberta">Aberta</option>
            <option value="estacionamento">Estacionamento</option>
          </select>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="distanciaMedia" class="form-label">Distância média percorrida por dia (km):</label>
            <input type="number" id="distanciaMedia" class="form-control">
          </div>
          <div class="col-md-6 mb-3">
            <label for="frequenciaUso" class="form-label">Frequência de uso:</label>
            <select id="frequenciaUso" class="form-select">
              <option value="">Selecione</option>
              <option value="diaria">Diária</option>
              <option value="semanal">Semanal</option>
              <option value="eventual">Eventual</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
              <label class="form-label">Permissionário dirige o veículo? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="permissionarioDirige" id="permissionarioDirigeSim" value="sim" required>
                  <label class="form-check-label" for="permissionarioDirigeSim">Sim</label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="permissionarioDirige" id="permissionarioDirigeNao" value="nao" required>
                  <label class="form-check-label" for="permissionarioDirigeNao">Não</label>
                  </div>
              </div>
          </div>
          <div class="col-md-6 mb-3">
              <label class="form-label">Possui motorista auxiliar cadastrado? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="motoristaAuxiliar" id="motoristaAuxiliarSim" value="sim" required data-rule="motoristaAuxiliarContainer:checked">
                  <label class="form-check-label" for="motoristaAuxiliarSim">Sim</label>
                  </div>
                  <div class="form-check">
                  <input class="form-check-input" type="radio" name="motoristaAuxiliar" id="motoristaAuxiliarNao" value="nao" required>
                  <label class="form-check-label" for="motoristaAuxiliarNao">Não</label>
                  </div>
              </div>
          </div>
        </div>

        <div id="motoristaAuxiliarContainer" style="display: none;">
          <h5 class="mb-3">Dados do Motorista Auxiliar</h5>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nome Completo</label>
              <input id="auxNome" class="form-control">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF</label>
              <input id="auxCPF" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Data de Nascimento</label>
              <input type="date" id="auxDataNascimento" class="form-control">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Estado Civil</label>
              <select id="auxEstadoCivil" class="form-select">
                <option value="">Selecione</option>
                <option>Solteiro(a)</option>
                <option>Casado(a)</option>
                <option>Divorciado(a)</option>
                <option>Viúvo(a)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Deseja contratar cobertura para condutores na faixa de 18 a 25 anos? *</label>
          <div class="d-flex gap-3">
              <div class="form-check">
              <input class="form-check-input" type="radio" name="coberturaJovem" id="coberturaJovemSim" value="sim" required>
              <label class="form-check-label" for="coberturaJovemSim">Sim</label>
              </div>
              <div class="form-check">
              <input class="form-check-input" type="radio" name="coberturaJovem" id="coberturaJovemNao" value="nao" required>
              <label class="form-check-label" for="coberturaJovemNao">Não</label>
              </div>
          </div>
        </div>

        <h5 class="mt-4 mb-3">Coberturas Adicionais Desejadas</h5>
        
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="coberturaDanosMateriais">
            <label class="form-check-label" for="coberturaDanosMateriais">Danos materiais ao veículo</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="coberturaDanosCorporais">
            <label class="form-check-label" for="coberturaDanosCorporais">Danos corporais</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="coberturaDanosTerceiros">
            <label class="form-check-label" for="coberturaDanosTerceiros">Danos a terceiros</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="coberturaAPPCompreensivo">
            <label class="form-check-label" for="coberturaAPPCompreensivo">APP</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="coberturaColisao">
            <label class="form-check-label" for="coberturaColisao">Colisão Total/Parcial</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="coberturaRouboFurto">
            <label class="form-check-label" for="coberturaRouboFurto">Roubo/Furto</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="coberturaIncendio">
            <label class="form-check-label" for="coberturaIncendio">Incêndio</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="coberturaVidros">
            <label class="form-check-label" for="coberturaVidros">Vidros, faróis e lanternas</label>
        </div>
        <div class="mb-3">
            <label for="coberturasOutros" class="form-label">Outros:</label>
            <input type="text" id="coberturasOutros" class="form-control">
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
  auto_compreensivo: `
    <div class="form-step">
      

      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
      </div>
    </div>`,

  aviso_sinistro: `
    <div class="form-step">
      <h4 class="mb-4">Aviso de Sinistro</h4>

      <!-- Segurado -->
      <h5 class="mt-4 mb-3">Dados do Segurado</h5>
      <div class="mb-3">
        <label for="sinistroNomeSegurado" class="form-label">Nome do Segurado: *</label>
        <input type="text" id="sinistroNomeSegurado" class="form-control"  />
      </div>
      <div class="mb-3">
        <label for="sinistroEmailSegurado" class="form-label">E-mail do Segurado: *</label>
        <input type="email" id="sinistroEmailSegurado" class="form-control"  />
      </div>
      <div class="mb-3">
        <label for="sinistroNumeroApolice" class="form-label">Número da apólice: *</label>
        <input type="text" id="sinistroNumeroApolice" class="form-control"  />
      </div>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="sinistroMarcaVeiculo" class="form-label">Marca do veículo: *</label>
          <input type="text" id="sinistroMarcaVeiculo" class="form-control"  />
        </div>
        <div class="col-md-4 mb-3">
          <label for="sinistroModeloVeiculo" class="form-label">Modelo do veículo: *</label>
          <input type="text" id="sinistroModeloVeiculo" class="form-control"  />
        </div>
        <div class="col-md-4 mb-3">
          <label for="sinistroAnoFabricacaoVeiculo" class="form-label">Ano de fabricação: *</label>
          <input type="number" id="sinistroAnoFabricacaoVeiculo" class="form-control"  />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="sinistroAnoModeloVeiculo" class="form-label">Ano do modelo do veículo: *</label>
          <input type="number" id="sinistroAnoModeloVeiculo" class="form-control"  />
        </div>
        <div class="col-md-6 mb-3">
          <label for="sinistroPlacaSegurado" class="form-label">Placa: *</label>
          <input type="text" id="sinistroPlacaSegurado" class="form-control"  />
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
  aviso_sinistro_terceiro: `
    <div class="form-step">
      <!-- Terceiro -->
      <h5 class="mt-4 mb-3">Dados do Terceiro</h5>
      <div class="mb-3">
        <label for="sinistroCategoriaDano" class="form-label">Categoria do dano: *</label>
        <select id="sinistroCategoriaDano" class="form-select" >
          <option value="">Selecione</option>
          <option value="danos_materiais">Danos Materiais</option>
          <option value="danos_corporais">Danos Corporais</option>
          <option value="ambos">Danos Materiais / Danos Corporais</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="sinistroNomeTerceiro" class="form-label">Nome do Terceiro:</label>
        <input type="text" id="sinistroNomeTerceiro" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="sinistroEnderecoTerceiro" class="form-label">Endereço do Terceiro:</label>
        <input type="text" id="sinistroEnderecoTerceiro" class="form-control" />
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="sinistroTelefoneTerceiro" class="form-label">Telefone do Terceiro com DDD:</label>
          <input type="text" id="sinistroTelefoneTerceiro" class="form-control" />
        </div>
        <div class="col-md-6 mb-3">
          <label for="sinistroEmailTerceiro" class="form-label">E-mail do Terceiro:</label>
          <input type="email" id="sinistroEmailTerceiro" class="form-control" />
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
  aviso_sinistro_ocorrencia: `
    <div class="form-step">
      <!-- Ocorrência -->
      <h5 class="mt-4 mb-3">Dados da Ocorrência</h5>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="sinistroPais" class="form-label">País do sinistro: *</label>
          <input type="text" id="sinistroPais" class="form-control" value="Brasil" readonly  />
        </div>
        <div class="col-md-6 mb-3">
          <label for="sinistroEstado" class="form-label">Estado do sinistro: *</label>
          <input type="text" id="sinistroEstado" class="form-control"  />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="sinistroCidade" class="form-label">Cidade do sinistro: *</label>
          <input type="text" id="sinistroCidade" class="form-control"  />
        </div>
        <div class="col-md-6 mb-3">
          <label for="sinistroCep" class="form-label">CEP do local do sinistro: *</label>
          <input type="text" id="sinistroCep" class="form-control"  />
        </div>
      </div>
      <div class="mb-3">
        <label for="sinistroNumeroLocal" class="form-label">Número do local do sinistro: *</label>
        <input type="text" id="sinistroNumeroLocal" class="form-control"  />
      </div>
      <div class="mb-3">
        <label for="sinistroEnderecoEvento" class="form-label">Endereço do evento: *</label>
        <input type="text" id="sinistroEnderecoEvento" class="form-control"  />
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="sinistroDataHoraOcorrencia" class="form-label">Data e hora da ocorrência: *</label>
          <input type="datetime-local" id="sinistroDataHoraOcorrencia" class="form-control"  />
        </div>
        <div class="col-md-6 mb-3">
          <label for="sinistroDescricao" class="form-label">Descrição do sinistro: *</label>
          <textarea id="sinistroDescricao" class="form-control" rows="3" ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="sinistroNumeroBoletim" class="form-label">Número do boletim de ocorrência:</label>
          <input type="text" id="sinistroNumeroBoletim" class="form-control" />
        </div>
        <div class="col-md-6 mb-3">
          <label for="sinistroDataHoraBoletim" class="form-label">Data e hora do boletim:</label>
          <input type="datetime-local" id="sinistroDataHoraBoletim" class="form-control" />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">O segurado assume a responsabilidade?: *</label>
        <div class="d-flex gap-3">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sinistroResponsabilidade" id="sinistroResponsabilidadeSim" value="sim" data-rule="sinistroMotivoResponsabilidadeContainer:checked" />
            <label class="form-check-label" for="sinistroResponsabilidadeSim">Sim</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sinistroResponsabilidade" id="sinistroResponsabilidadeNao" value="nao" />
            <label class="form-check-label" for="sinistroResponsabilidadeNao">Não</label>
          </div>
        </div>
      </div>
      <div class="mb-3" id="sinistroMotivoResponsabilidadeContainer" style="display: none;">
        <label for="sinistroMotivoResponsabilidade" class="form-label">Se sim, qual o motivo?: *</label>
        <textarea id="sinistroMotivoResponsabilidade" class="form-control" rows="2"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Upload Docs (BO/BRAT) *</label>
        <input id="cnhSeg" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" multiple />
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
          <input id="seguradoNome" class="form-control"  />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Nome Social</label>
          <input id="seguradoNomeSocial" class="form-control" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="seguradoTipoPessoa" class="form-label">Tipo de pessoa *</label>
          <select id="seguradoTipoPessoa" class="form-select" >
            <option value="">Selecione</option>
            <option value="pf">Pessoa Física</option>
            <option value="pj">Pessoa Jurídica</option>
          </select>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">CPF/CNPJ *</label>
          <input id="seguradoDocumento" class="form-control" placeholder="CPF ou CNPJ"  />
        </div>
      </div>
      <div class="row">
          <div class="col-md-4 mb-3">
              <label class="form-label">Data de Nascimento *</label>
              <input id="seguradoDataNascimento" type="date" class="form-control"  />
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Estado Civil *</label>
              <select id="seguradoEstadoCivil" class="form-select" >
                  <option value="">Selecione</option>
                  <option>Solteiro(a)</option>
                  <option>Casado(a)</option>
                  <option>Divorciado(a)</option>
                  <option>Viúvo(a)</option>
              </select>
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Sexo *</label>
              <select id="seguradoSexo" class="form-select" >
                  <option value="">Selecione</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
              </select>
          </div>
      </div>
      <div class="row">
          <div class="col-md-4 mb-3">
              <label class="form-label">Tipo Identidade *</label>
              <select id="seguradoTipoIdentidade" class="form-select" >
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
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Nº Identidade *</label>
              <input type="number" id="seguradoNumIdentidade" class="form-control"  />
          </div>
          <div class="col-md-4 mb-3">
              <label class="form-label">Órgão Emissor *</label>
              <input id="seguradoOrgaoEmissor" class="form-control"  />
          </div>
      </div>
      <div class="row">
          <div class="col-md-6 mb-3">
              <label class="form-label">Data de Emissão *</label>
              <input id="seguradoDataEmissao" type="date" class="form-control"  />
          </div>
          <div class="col-md-6 mb-3">
              <label class="form-label">Estrangeiro? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="seguradoEstrangeiro" id="seguradoEstrangeiroSim" value="sim" data-rule="seguradoBlocoEstrangeiro:checked" />
                      <label class="form-check-label" for="seguradoEstrangeiroSim">Sim</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="seguradoEstrangeiro" id="seguradoEstrangeiroNao" value="nao"  checked />
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
            <input type="email" id="emailSeg" class="form-control" />
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Telefone *</label>
            <input id="telSeg" class="form-control" />
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
                      <input class="form-check-input" type="radio" name="seguradoPPE" id="seguradoPPESim" value="sim" data-rule="seguradoBlocoPPE:checked" />
                      <label class="form-check-label" for="seguradoPPESim">Sim</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="seguradoPPE" id="seguradoPPENao" value="nao"  checked />
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
            <input id="segurado_cep" class="form-control" placeholder="00000-000" >
            <button class="btn btn-outline-secondary" type="button" onclick="buscarCep('segurado_cep', 'segurado_logradouro', 'segurado_bairro', 'segurado_cidade', 'segurado_estado')"><i class="bi bi-search"></i></button>
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
          <input type="number"  id="segurado_numero" class="form-control">
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
        <input id="cnhSeg" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"  />
      </div>

      <div class="mb-3">
        <label class="form-label">Upload Comprovante de Residência (PDF/JPG/PNG) *</label>
        <input id="comprovanteResidenciaSeg" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"  />
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
          <label for="colaboradorCodigo" class="form-label">Código *</label>
          <input id="colaboradorCodigo" class="form-control"  />
          <div id="colaboradorNomeDisplay" class="form-text text-success fw-bold mt-2"></div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Nome</label>
          <input id="estipNome" class="form-control" readonly />
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
  cliente: `
    <div class="form-step" data-step="5">
      <h4 class="mb-4">Dados do Cliente</h4>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="nomeCliente" class="form-label">Nome *</label>
          <input id="nomeCliente" class="form-control" placeholder="Nome Completo" />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">CPF ou CNPJ *</label>
          <input id="doc_cliente" class="form-control" placeholder="CPF ou CNPJ"  />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="emailCliente" class="form-label">Email *</label>
          <input type="email" id="emailCliente" placeholder="Email" class="form-control"  />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Telefone *</label>
          <input type="phone" id="telefoneCliente" class="form-control" placeholder="Telefone"  />
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
    <div class="form-step" data-step="5" id="veiculoFields">
      <h4 class="mb-4">Dados do veículo</h4>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label class="form-label">Placa *</label>
          <input id="veiPlaca" class="form-control" placeholder="ABC1D23"  />
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Chassi *</label>
          <input id="veiChassi" class="form-control" minlength="5"  />
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Renavam *</label>
          <input id="veiRenavam" class="form-control"  />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label class="form-label">Fabricante *</label>
          <input id="veiFab" class="form-control"  />
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Modelo *</label>
          <input id="veiModelo" class="form-control"  />
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Ano *</label>
          <input id="veiAno" type="number" class="form-control" min="1980" max="2099"  />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Uso *</label>
          <select id="veiUso" class="form-select" >
            <option value="" disabled selected>Selecione</option>
            <option>Moto</option><option>Van Turismo</option><option>Van Escolar</option><option>Van Urbano</option><<option>Táxi/Aplicativos</option> <option>Policiamento/Bombeiro</option> <option>Comercial/Profissional</option><option>Particular/Passeio</option>
            <option>Casa Locadora - Uso Comercial/Industrial, S/Veículo por Aplicativo</option> <option>Casa Locadora - Uso Veículo por Aplicativos</option> <option>Chapa de Fabricante</option> <option>Auto Escola</option>
          </select>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Lotação *</label>
          <input id="veiLotacao" type="number" class="form-control" min="1"  />
        </div>
      </div>
      <div class="row" id="tigoClubeQuestionContainer" style="display: none;">
        <div class="col-md-12 mb-3">
            <label class="form-label">Contrato com adesão ao TIGO CLUBE? *</label>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="tigoClube" id="tigoClubeSim" value="sim" data-rule="tigoClubeAdesaoContainer:checked" />
                    <label class="form-check-label" for="tigoClubeSim">Sim</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="tigoClube" id="tigoClubeNao" value="nao"  checked />
                    <label class="form-check-label" for="tigoClubeNao">Não</label>
                </div>
            </div>
        </div>
      </div>
      <div id="tigoClubeAdesaoContainer" class="mb-3" style="display: none;">
        <label class="form-label">Upload do documento de adesão assinado (PDF/JPG/PNG) *</label>
        <input id="tigoClubeAdesao" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
      </div>
      <div class="mb-3">
        <label class="form-label">Upload CLRV (PDF/JPG/PNG) *</label>
        <input id="veiCNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png"  />
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
        <input class="form-check-input" type="checkbox" id="addAuxiliar" data-rule="auxiliaresContainer:checked">
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
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF *</label>
              <input id="aux1CPF" class="form-control" placeholder="000.000.000-00" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
              <input id="aux1CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
            <div class="col-md-6 mb-3" data-visible-when-fluxo="cotacao">
              <label class="form-label">Estado Civil</label>
              <select id="auxiliar1EstadoCivil" class="form-select">
                <option value="">Selecione</option>
                <option>Solteiro(a)</option>
                <option>Casado(a)</option>
                <option>Divorciado(a)</option>
                <option>Viúvo(a)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="addAuxiliar2" data-rule="auxiliar2Container:checked">
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
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF *</label>
              <input id="aux2CPF" class="form-control" placeholder="000.000.000-00" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
              <input id="aux2CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
            <div class="col-md-6 mb-3" data-visible-when-fluxo="cotacao">
              <label class="form-label">Estado Civil</label>
              <select id="auxiliar2EstadoCivil" class="form-select">
                <option value="">Selecione</option>
                <option>Solteiro(a)</option>
                <option>Casado(a)</option>
                <option>Divorciado(a)</option>
                <option>Viúvo(a)</option>
              </select>
            </div>
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
          <label for="codigo" class="form-label">Código Estipulante *</label>
          <input id="codigo" class="form-control" placeholder="10L4" >
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
        <input class="form-check-input" type="checkbox" id="termos"  />
        <label class="form-check-label" for="termos">
          Li e concordo com os termos e condições. *
        </label>
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
      <p class="text-muted">Ao clicar em “Finalizar”, confirmaremos o envio.</p>
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
          <input id="renovApolice" class="form-control"  placeholder="Ex: 938-..." />
        </div>
        <div class="col-md-6 mb-3">
          <label for="renovVencimento" class="form-label">Data de Vencimento *</label>
          <input type="date" id="renovVencimento" class="form-control"  />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="renovSeguradora" class="form-label">Seguradora Vencendo *</label>
          <select id="renovSeguradora" class="form-select">
            <option value="" selected disabled>Selecione</option>
            <option value="aruana">Aruana</option>
            <option value="porto">Porto Seguro</option>
            <option value="azul">Azul</option>
            <option value="allianz">Allianz</option>
            <option value="tokio_marine">Tokio Marine</option>
            <option value="hdi">HDI</option>
            <option value="sompo">Sompo</option>
            <option value="bradesco">Bradesco</option>
            <option value="suhai">Suhai</option>
            <option value="mapfre">Mapfre</option>
            <option value="mbm">MBM</option>
            <option value="sabemi">Sabemi</option>
            <option value="akad">Akad</option>
            <option value="ezze">Ezze</option>
            <option value="darwin">Darwin</option>
            <option value="yelium">Yelium</option>
            <option value="zurich">Zurich</option>
            <option value="chubb">Chubb</option>
            <option value="essor">Essor</option>
            <option value="sura">Sura</option>
            <option value="icatu">Icatu</option>
            <option value="alfa">Alfa</option>
            <option value="fator">Fator</option>
            <option value="american_life">American Life</option>
            <option value="excelsior">Excelsior</option>
            <option value="kovr">Kovr</option>
            <option value="alm">ALM</option>
            <option value="axa">AXA</option>
          </select>
        </div>
        <div class="col-md-6 mb-3">
          <label for="codCI" class="form-label">Código CI</label>
          <input id="codCI" class="form-control"  />
        </div>
      </div>
      <div class="col-md-12 mb-3 mt-3">
        <label for="paymentMethod" class="form-label">Forma de pagamento *</label>
        <select id="paymentMethod" class="form-select" required>
          <option value="" disabled selected>Selecione</option>
          <option>Boleto</option> <option>Cartão</option> <option>Débito em conta</option>
        </select>
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
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF ou CNPJ *</label>
              <input id="endossoDocumento" class="form-control" placeholder="CPF ou CNPJ" required />
            </div>
          </div>

          <div id="apolices-container">
            <div class="row apolice-entry mb-3">
              <div class="col-md-6 mb-3">
                <label class="form-label">Número da Apólice 1</label>
                <input type="text" class="form-control" name="apolice_1">
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Seguradora da Apólice 1</label>
                <select class="form-select" name="seguradora_apolice_1">
                  <option value="">Selecione</option>
                  <option value="aruana">Aruana</option>
                  <option value="porto">Porto Seguro</option>
                  <option value="azul">Azul</option>
                  <option value="allianz">Allianz</option>
                  <option value="tokio_marine">Tokio Marine</option>
                  <option value="hdi">HDI</option>
                  <option value="sompo">Sompo</option>
                  <option value="bradesco">Bradesco</option>
                  <option value="suhai">Suhai</option>
                  <option value="mapfre">Mapfre</option>
                  <option value="mbm">MBM</option>
                  <option value="sabemi">Sabemi</option>
                  <option value="akad">Akad</option>
                  <option value="ezze">Ezze</option>
                  <option value="darwin">Darwin</option>
                  <option value="yelium">Yelium</option>
                  <option value="zurich">Zurich</option>
                  <option value="chubb">Chubb</option>
                  <option value="essor">Essor</option>
                  <option value="sura">Sura</option>
                  <option value="icatu">Icatu</option>
                  <option value="alfa">Alfa</option>
                  <option value="fator">Fator</option>
                  <option value="american_life">American Life</option>
                  <option value="excelsior">Excelsior</option>
                  <option value="kovr">Kovr</option>
                  <option value="alm">ALM</option>
                  <option value="axa">AXA</option>
                </select>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-outline-primary mb-3" id="add-apolice-btn" onclick="addApoliceInput()">Adicionar outra apólice</button>


          <div class="mb-3">
            <label for="endossoTipo" class="form-label">Tipo de solicitação *</label>
            <select id="endossoTipo" class="form-select" required>
              <option value="">Selecione</option>
              <option value="substituicao_veiculo">Substituição de veículo / Correção de dados do veículo</option>
              <option value="inclusao_condutor">Inclusão ou exclusão de condutor auxiliar</option>
              <option value="alteracao_endereco">Alteração de endereço, e-mail ou telefone</option>
              <option value="alteracao_endereco_completo">Alteração de Endereço Completo</option>
              <option value="alteracao_motorista_principal_pernoite">Alteração de Motorista Principal / Endereço de Pernoite</option>
              <option value="correcao_cadastral">Correção de dados cadastrais (nome, CPF, etc.)</option>
              <option value="troca_titularidade">Troca de titularidade</option>
              <option value="cancel_req">Pedidos de Cancelamento</option>
            </select>
          </div>

          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,
  endosso_troca_titularidade: `
  <div class="form-step">
    <h4 class="mb-4">Endosso - Troca de Titularidade</h4>

    <h5 class="mt-4 mb-3">Dados do Novo Titular</h5>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="trocaNome" class="form-label">Nome *</label>
        <input type="text" id="trocaNome" class="form-control" required>
      </div>
      <div class="col-md-6 mb-3">
        <label for="trocaCPF" class="form-label">CPF *</label>
        <input type="text" id="trocaCPF" class="form-control" required>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="trocaNascimento" class="form-label">Data de Nascimento *</label>
        <input type="date" id="trocaNascimento" class="form-control" required>
      </div>
      <div class="col-md-6 mb-3">
        <label for="trocaEstadoCivil" class="form-label">Estado Civil *</label>
        <select id="trocaEstadoCivil" class="form-select" required>
          <option value="">Selecione</option>
          <option>Solteiro(a)</option>
          <option>Casado(a)</option>
          <option>Divorciado(a)</option>
          <option>Viúvo(a)</option>
        </select>
      </div>
    </div>

    <h5 class="mt-4 mb-3">Endereço</h5>
    <div class="row">
      <div class="col-md-6 mb-3">
        <label for="trocaCepResidencia" class="form-label">CEP Residência *</label>
        <input type="text" id="trocaCepResidencia" class="form-control" required>
      </div>
      <div class="col-md-6 mb-3">
          <label for="trocaCepPernoite" class="form-label">CEP Pernoite (se diferente)</label>
          <input type="text" id="trocaCepPernoite" class="form-control">
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Upload Comprovante de Residência (se alterou) </label>
      <input id="trocaComprovanteResidencia" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf">
    </div>


    <h5 class="mt-4 mb-3">Motoristas</h5>
    <div class="row">
        <div class="col-md-12 mb-3">
            <label class="form-label">Terá motoristas entre 18 e 24 anos? *</label>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="trocaMotoristaJovem" id="trocaMotoristaJovemSim" value="sim" required data-rule="trocaMotoristaJovemContainer:checked">
                    <label class="form-check-label" for="trocaMotoristaJovemSim">Sim</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="trocaMotoristaJovem" id="trocaMotoristaJovemNao" value="nao" required>
                    <label class="form-check-label" for="trocaMotoristaJovemNao">Não</label>
                </div>
            </div>
        </div>
    </div>

    <div id="trocaMotoristaJovemContainer" style="display: none;">
        <h6>Dados do Motorista Jovem</h6>
        <div class="row">
            <div class="col-md-4 mb-3">
                <label for="trocaMotoristaJovemNome" class="form-label">Nome *</label>
                <input type="text" id="trocaMotoristaJovemNome" class="form-control">
            </div>
            <div class="col-md-4 mb-3">
                <label for="trocaMotoristaJovemCPF" class="form-label">CPF *</label>
                <input type="text" id="trocaMotoristaJovemCPF" class="form-control">
            </div>
            <div class="col-md-4 mb-3">
                <label for="trocaMotoristaJovemNascimento" class="form-label">Data de Nascimento *</label>
                <input type="date" id="trocaMotoristaJovemNascimento" class="form-control">
            </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Upload CNH do Motorista Jovem *</label>
          <input id="trocaCNHJovem" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf">
        </div>
        <!-- ADD MORE YOUNG DRIVERS? For now, just one -->
    </div>

      <div class="row">
          <div class="col-md-12 mb-3">
              <label class="form-label">O novo segurado será o principal motorista? *</label>
              <div class="d-flex gap-3">
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="trocaPrincipalMotorista" id="trocaPrincipalMotoristaSim" value="sim" required>
                      <label class="form-check-label" for="trocaPrincipalMotoristaSim">Sim</label>
                  </div>
                  <div class="form-check">
                      <input class="form-check-input" type="radio" name="trocaPrincipalMotorista" id="trocaPrincipalMotoristaNao" value="nao" required data-rule="trocaOutroPrincipalContainer:checked">
                      <label class="form-check-label" for="trocaPrincipalMotoristaNao">Não</label>
                  </div>
              </div>
          </div>
      </div>
      
    <div id="trocaOutroPrincipalContainer" style="display: none;">
        <h6>Dados do Principal Motorista</h6>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="trocaPrincipalNome" class="form-label">Nome *</label>
                <input type="text" id="trocaPrincipalNome" class="form-control">
            </div>
            <div class="col-md-6 mb-3">
                <label for="trocaPrincipalCPF" class="form-label">CPF *</label>
                <input type="text" id="trocaPrincipalCPF" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mb-3">
                <label for="trocaPrincipalNascimento" class="form-label">Data de Nascimento *</label>
                <input type="date" id="trocaPrincipalNascimento" class="form-control">
            </div>
            <div class="col-md-4 mb-3">
                <label for="trocaPrincipalEstadoCivil" class="form-label">Estado Civil *</label>
                <select id="trocaPrincipalEstadoCivil" class="form-select">
                    <option value="">Selecione</option>
                    <option>Solteiro(a)</option>
                    <option>Casado(a)</option>
                    <option>Divorciado(a)</option>
                    <option>Viúvo(a)</option>
                </select>
            </div>
            <div class="col-md-4 mb-3">
                <label for="trocaPrincipalVinculo" class="form-label">Vínculo com o Segurado *</label>
                <input type="text" id="trocaPrincipalVinculo" class="form-control">
            </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Upload CNH do Principal Motorista *</label>
          <input id="trocaCNHPrincipal" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf">
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-12 mb-3">
            <label class="form-label">O carro dormirá em garagem? *</label>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="trocaGaragem" id="trocaGaragemSim" value="sim" required>
                    <label class="form-check-label" for="trocaGaragemSim">Sim</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="trocaGaragem" id="trocaGaragemNao" value="nao" required>
                    <label class="form-check-label" for="trocaGaragemNao">Não</label>
                </div>
            </div>
        </div>
    </div>

    <div class="mb-3">
      <label class="form-label">Upload CNH do Novo Titular *</label>
      <input id="trocaCNHNovoTitular" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf" required>
    </div>

    <div class="btn-group-navigation">
      <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
      <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
    </div>
  </div>
  `,
  endosso_veiculo: `
        <div class="form-step" data-step="2">
          <h4 class="mb-4">Dados do Veículo para Substituição</h4>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Placa na Apólice *</label>
              <input id="endossoVeiculoPlacaAtual" class="form-control" required />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Placa Nova *</label>
              <input id="endossoVeiculoPlacaNova" class="form-control" required />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">CHASSI *</label>
              <input id="endossoVeiculoChassi" class="form-control" required />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">RENAVAM *</label>
              <input id="endossoVeiculoRenavam" class="form-control" required />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Fabricante *</label>
              <input id="endossoVeiculoFab" class="form-control" required />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Modelo *</label>
              <input id="endossoVeiculoModelo" class="form-control" required />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Ano - Fabricação/Modelo *</label>
              <input id="endossoVeiculoAno" class="form-control" placeholder="Ex: 2023/2024" required />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Lotação *</label>
              <input id="endossoVeiculoLotacao" type="number" class="form-control" required />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload CRLV (PDF/JPG/PNG) *</label>
            <input id="endossoVeiculoCRLV" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
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
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Novo Telefone</label>
              <input id="endossoNovoTelefone" class="form-control" placeholder="(00) 00000-0000" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload Comprovante de Endereço (PDF/JPG/PNG) *</label>
            <input id="endossoNovoEnderecoComp" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
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
                <input class="form-check-input" type="radio" name="tipoPessoa" id="pf" value="pf" required checked data-rule="blocoPF:checked" />
                <label class="form-check-label" for="pf">Pessoa Física</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoPessoa" id="pj" value="pj" required data-rule="blocoPJ:checked" />
                <label class="form-check-label" for="pj">Pessoa Jurídica</label>
              </div>
            </div>
          </div>
          <div id="blocoPF">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Nome completo *</label>
                <input id="segNomePF" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">CPF *</label>
                <input id="segCPF" class="form-control" placeholder="000.000.000-00" />
              </div>
            </div>
          </div>
          <div id="blocoPJ" style="display: none">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Razão Social *</label>
                <input id="segRazao" class="form-control" />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">CNPJ *</label>
                <input id="segCNPJ" class="form-control" placeholder="00000000000000" />
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload CNH do Segurado (PDF/JPG/PNG) *</label>
            <input id="endossoCorrecaoCNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
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
                </div>
                <div class="col-md-4 mb-3">
                    <label for="endossoCondutor1RetirarCPF" class="form-label">CPF *</label>
                    <input id="endossoCondutor1RetirarCPF" class="form-control" placeholder="000.000.000-00" required />
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
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="endossoCondutor1RetirarCPF" class="form-label">CPF *</label>
                        <input id="endossoCondutor1RetirarCPF" class="form-control" placeholder="000.000.000-00" required />
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
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="endossoCondutor2RetirarCPF" class="form-label">CPF *</label>
                        <input id="endossoCondutor2RetirarCPF" class="form-control" placeholder="000.000.000-00" required />
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
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">CPF *</label>
                  <input id="endossoCondutor1CPF" class="form-control" placeholder="00000000000" required />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
                <input id="endossoCondutor1CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
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
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">CPF *</label>
                  <input id="endossoCondutor1CPF" class="form-control" placeholder="000000000-00" required />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Upload CNH Condutor 1 (PDF/JPG/PNG) *</label>
                <input id="endossoCondutor1CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
              </div>
              <hr>
              <p class="text-muted">Condutor 2</p>
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label class="form-label">Nome Completo *</label>
                  <input id="endossoCondutor2Nome" class="form-control" required />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">CPF *</label>
                  <input id="endossoCondutor2CPF" class="form-control" placeholder="00000000000" required />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Upload CNH Condutor 2 (PDF/JPG/PNG) *</label>
                <input id="endossoCondutor2CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
              </div>
              <div class="btn-group-navigation">
                <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
                <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
              </div>
            </div>`,

  carta_cancelamento: `
        <div class="form-step" data-step="4">
          <div class="mb-3">
            <label class="form-label">Carta de Cancelamento (PDF/JPG/PNG) *</label>
            <input id="endossoCartaCancel" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" required />
          </div>
          <div class="btn-group-navigation">
            <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
            <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
          </div>
        </div>`,
  segunda_via_docs: `
        <div class="form-step" data-step="1">
          <h4 class="mb-4">2ª Via de Documentos/Posição Financeira</h4>
          <div class="mb-3">
            <label for="segundaViaTipoDoc" class="form-label">Tipo de Documento *</label>
            <select id="segundaViaTipoDoc" class="form-select" required data-rule="segundaViaOutroContainer:outra">
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
          </div>
          <div class="mb-3">
            <label class="form-label">Responsável pelo Pedido *</label>
            <input id="segundaViaResponsavel" class="form-control" required />
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
              <label for="segTrabalhadasFin" class="form-label">Seguradoras *</label>
              <select id="segTrabalhadasFin" class="form-select">
                <option value="aruana">Aruana</option>
                <option value="porto">Porto Seguro</option>
                <option value="azul">Azul</option>
                <option value="allianz">Allianz</option>
                <option value="tokio_marine">Tokio Marine</option>
                <option value="hdi">HDI</option>
                <option value="sompo">Sompo</option>
                <option value="bradesco">Bradesco</option>
                <option value="suhai">Suhai</option>
                <option value="mapfre">Mapfre</option>
                <option value="mbm">MBM</option>
                <option value="sabemi">Sabemi</option>
                <option value="akad">Akad</option>
                <option value="ezze">Ezze</option>
                <option value="darwin">Darwin</option>
                <option value="yelium">Yelium</option>
                <option value="zurich">Zurich</option>
                <option value="chubb">Chubb</option>
                <option value="essor">Essor</option>
                <option value="sura">Sura</option>
                <option value="icatu">Icatu</option>
                <option value="alfa">Alfa</option>
                <option value="fator">Fator</option>
                <option value="american_life">American Life</option>
                <option value="excelsior">Excelsior</option>
                <option value="kovr">Kovr</option>
                <option value="alm">ALM</option>
                <option value="axa">AXA</option>
              </select>
            </div>
            <div class="mb-4 col-md-6">
              <label class="form-label">Selecione os produtos desejados *</label>
              <select id="ramos" class="form-select" required">
                <option value="" disabled selected>Selecione</option>
                <option value="rcf_app">RCF e APP</option>
                <option value="rcf">Somente RCF</option>
                <option value="app">Somente APP</option>
                <option value="empresarial">Seguro Empresarial</option>
                <option value="seguro_vida">Seguro de Vida</option>
                <option value="seguro_viagem">Seguro Viagem</option>
                <option value="rc_profissional">RC Profissional</option>
                <option value="carta_verde">Seguro Carta Verde</option>
                <option value="auto">Seguro Auto Compreensivo</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Data de vencimento em aberto *</label>
            <input type="date" id="finRegDataVencimento" class="form-control" required />
            <div class="form-text text-muted" style="text-align: justify;">Após a data máxima de pagamento indicada no boleto, os pedidos de atualização de parcelas serão avaliados individualmente pela Seguradora, podendo ser aceitos ou negados. O prazo médio de retorno é de até 48 horas úteis, podendo variar conforme a demanda da seguradora parceira.</div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Parcela em Aberto *</label>
              <input type="text" id="finRegParcela" class="form-control" required />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Número Apólice RCF</label>
              <input type="text" id="finRegApoliceRCF" class="form-control" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Motivo Inadimplência *</label>
            <textarea id="finRegMotivo" class="form-control" rows="3" required></textarea>
          </div>
          <div class="row">
            <div class="mb-3 col-md-6">
              <label class="form-label">Responsável pelo Pedido *</label>
              <input id="finRegResponsavel" class="form-control" required />
            </div>
            <div class="col-md-12 mb-3 mt-3">
              <label for="paymentMethodFin" class="form-label">Forma de pagamento *</label>
              <select id="paymentMethodFin" class="form-select" required>
                <option value="" disabled selected>Selecione</option>
                <option>Boleto</option> <option>Cartão</option> <option>Débito em conta</option>
              </select>
            </div>
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

  parceiro_busca_cobertura: `
    <div class="form-step" data-step="1">
      <h4 class="mb-4">Busca de Apólice por Parceiro</h4>
      
      <!-- 1. Busca do Parceiro -->
      <div id="parceiroSearchStep">
        <label for="parceiroCodigo" class="form-label">Código do Parceiro *</label>
        <div class="input-group mb-3">
          <input type="text" id="parceiroCodigo" class="form-control" placeholder="Insira o código do parceiro" required>
          <button class="btn btn-primary" type="button" id="buscarParceiroBtn">
            <i class="bi bi-search"></i> Buscar
          </button>
        </div>
        <div id="parceiroLoading" style="display: none;">
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Buscando...</span>
          </div>
        </div>
        <div id="parceiroError" class="alert alert-danger" style="display: none;"></div>
      </div>

      <!-- 2. Seleção de Cobertura (aparece após busca) -->
      <div id="coberturaSelection" class="mt-4" style="display: none;">
        <h5 id="parceiroNomeDisplay" class="mb-3"></h5>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="coberturaRCF" class="form-label">Cobertura RCF (Danos Materiais)</label>
            <select id="coberturaRCF" class="form-select">
              <option value="" selected disabled>Selecione o valor</option>
              <!-- Opções preenchidas dinamicamente -->
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="coberturaAPP" class="form-label">Cobertura APP (Morte/Invalidez)</label>
            <select id="coberturaAPP" class="form-select">
              <option value="" selected disabled>Selecione o valor</option>
              <!-- Opções preenchidas dinamicamente -->
            </select>
          </div>
        </div>
        <button class="btn btn-success" type="button" id="selecionarCoberturaBtn">
          <i class="bi bi-check-circle"></i> Encontrar Apólice
        </button>
      </div>

      <!-- 3. Resultado Final (aparece após seleção) -->
      <div id="resultadoFinal" class="mt-4" style="display: none;">
        <h5 class="mb-3">Estipulante e Apólices Recomendadas</h5>
        <div id="resultadoFinalContent" class="card p-3">
          <!-- Conteúdo do resultado -->
        </div>
      </div>

      <div class="btn-group-navigation mt-4">
        <button type="button" class="btn btn-secondary" onclick="prevStep()">
          <i class="bi bi-arrow-left"></i> Voltar
        </button>
        <button type="button" class="btn btn-primary" onclick="nextStep()" id="parceiroNextBtn" disabled>
          Próximo <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  `,
endosso_alteracao_endereco_completo: `
<div class="form-step">
    <h4 class="mb-4">Endosso - Alteração de Endereço Completo</h4>

    <!-- NOVO ENDEREÇO -->
    <h5 class="mt-4 mb-3">Novo Endereço Completo</h5>
    <div class="row">
      <div class="col-md-4 mb-3">
        <label for="novo_endereco_cep" class="form-label">CEP *</label>
        <div class="input-group">
          <input id="novo_endereco_cep" class="form-control" placeholder="00000-000" required>
          <button class="btn btn-outline-secondary" type="button" onclick="buscarCep('novo_endereco_cep', 'novo_endereco_logradouro', 'novo_endereco_bairro', 'novo_endereco_cidade', 'novo_endereco_estado')"><i class="bi bi-search"></i></button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 mb-3">
        <label class="form-label">Logradouro</label>
        <input id="novo_endereco_logradouro" class="form-control" readonly>
      </div>
      <div class="col-md-4 mb-3">
        <label class="form-label">Número</label>
        <input type="number" id="novo_endereco_numero" class="form-control">
      </div>
    </div>
    <div class="row">
        <div class="col-md-6 mb-3">
            <label class="form-label">Bairro</label>
            <input id="novo_endereco_bairro" class="form-control" readonly>
        </div>
        <div class="col-md-4 mb-3">
            <label class="form-label">Cidade</label>
            <input id="novo_endereco_cidade" class="form-control" readonly>
        </div>
        <div class="col-md-2 mb-3">
            <label class="form-label">Estado</label>
            <input id="novo_endereco_estado" class="form-control" readonly>
        </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Upload do Comprovante do Novo Endereço *</label>
      <input id="comprovanteNovoEndereco" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf" required>
    </div>

    <!-- TIPO DE ENDEREÇO -->
    <div class="mb-3">
        <label class="form-label">Este novo endereço será para: *</label>
        <div class="d-flex gap-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoNovoEndereco" id="tipoNovoEnderecoAmbos" value="ambos" required>
                <label class="form-check-label" for="tipoNovoEnderecoAmbos">Residência/Correspondência e Pernoite</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoNovoEndereco" id="tipoNovoEnderecoPernoite" value="pernoite" required data-rule="pernoiteCondicional:checked">
                <label class="form-check-label" for="tipoNovoEnderecoPernoite">Somente CEP Pernoite</label>
            </div>
        </div>
    </div>
    
    <!-- CONDICIONAL: SE FOR SÓ PERNOITE -->
    <div id="pernoiteCondicional" style="display: none;">
        <div class="alert alert-light border">
            <div class="mb-3">
                <label class="form-label">O endereço de correspondência/residência também será alterado? *</label>
                <div class="d-flex gap-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="alteraResidencia" id="alteraResidenciaSim" value="sim" data-rule="novoEnderecoResidenciaContainer:checked">
                        <label class="form-check-label" for="alteraResidenciaSim">Sim</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="alteraResidencia" id="alteraResidenciaNao" value="nao">
                        <label class="form-check-label" for="alteraResidenciaNao">Não, permanecerá o mesmo</label>
                    </div>
                </div>
            </div>

            <!-- CONDICIONAL: SE RESIDÊNCIA TAMBÉM MUDA -->
            <div id="novoEnderecoResidenciaContainer" style="display: none;">
                <h6 class="mt-3">Novo Endereço de Residência/Correspondência</h6>
                 <div class="row">
                  <div class="col-md-4 mb-3">
                    <label for="residencia_cep" class="form-label">CEP *</label>
                    <div class="input-group">
                      <input id="residencia_cep" class="form-control" placeholder="00000-000">
                      <button class="btn btn-outline-secondary" type="button" onclick="buscarCep('residencia_cep', 'residencia_logradouro', 'residencia_bairro', 'residencia_cidade', 'residencia_estado')"><i class="bi bi-search"></i></button>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8 mb-3">
                    <label class="form-label">Logradouro</label>
                    <input id="residencia_logradouro" class="form-control" readonly>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="form-label">Número</label>
                    <input type="number" id="residencia_numero" class="form-control">
                  </div>
                </div>
                 <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Bairro</label>
                        <input id="residencia_bairro" class="form-control" readonly>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Cidade</label>
                        <input id="residencia_cidade" class="form-control" readonly>
                    </div>
                    <div class="col-md-2 mb-3">
                        <label class="form-label">Estado</label>
                        <input id="residencia_estado" class="form-control" readonly>
                    </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Upload do Comprovante do Endereço de Residência *</label>
                  <input id="comprovanteResidencia" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf">
                </div>
            </div>
        </div>
    </div>
    <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
    </div>
</div>`,
endosso_motorista_pernoite: `
<div class="form-step">
    <h4 class="mb-4">Endosso - Alteração de Motorista Principal / Endereço de Pernoite</h4>

    <h5 class="mt-4 mb-3">Dados do Principal Motorista</h5>
    <div class="row">
        <div class="col-md-6 mb-3">
            <label for="motoristaPrincipalNome" class="form-label">Nome *</label>
            <input type="text" id="motoristaPrincipalNome" class="form-control" required>
        </div>
        <div class="col-md-6 mb-3">
            <label for="motoristaPrincipalCPF" class="form-label">CPF *</label>
            <input type="text" id="motoristaPrincipalCPF" class="form-control" required>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 mb-3">
            <label for="motoristaPrincipalNascimento" class="form-label">Data de Nascimento *</label>
            <input type="date" id="motoristaPrincipalNascimento" class="form-control" required>
        </div>
        <div class="col-md-4 mb-3">
            <label for="motoristaPrincipalEstadoCivil" class="form-label">Estado Civil *</label>
            <select id="motoristaPrincipalEstadoCivil" class="form-select" required>
                <option value="">Selecione</option>
                <option>Solteiro(a)</option>
                <option>Casado(a)</option>
                <option>Divorciado(a)</option>
                <option>Viúvo(a)</option>
            </select>
        </div>
         <div class="col-md-4 mb-3">
            <label for="motoristaPrincipalVinculo" class="form-label">Vínculo com o Segurado *</label>
            <input type="text" id="motoristaPrincipalVinculo" class="form-control" required>
        </div>
    </div>
    <div class="mb-3">
      <label class="form-label">Upload CNH do Principal Motorista *</label>
      <input id="motoristaPrincipalCNH" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf" required>
    </div>

    <hr>
    <h5 class="mt-4 mb-3">Endereço de Pernoite</h5>
    <div class="mb-3">
        <label class="form-label">O CEP de pernoite permanece o mesmo? *</label>
        <div class="d-flex gap-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="pernoiteMantem" id="pernoiteMantemSim" value="sim" required>
                <label class="form-check-label" for="pernoiteMantemSim">Sim</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="pernoiteMantem" id="pernoiteMantemNao" value="nao" required data-rule="novoCepPernoiteContainer:checked">
                <label class="form-check-label" for="pernoiteMantemNao">Não, desejo alterar</label>
            </div>
        </div>
    </div>

    <div id="novoCepPernoiteContainer" style="display: none;">
        <h6 class="mt-3">Novo Endereço de Pernoite</h6>
         <div class="row">
          <div class="col-md-4 mb-3">
            <label for="pernoite_cep" class="form-label">CEP *</label>
            <div class="input-group">
              <input id="pernoite_cep" class="form-control" placeholder="00000-000">
              <button class="btn btn-outline-secondary" type="button" onclick="buscarCep('pernoite_cep', 'pernoite_logradouro', 'pernoite_bairro', 'pernoite_cidade', 'pernoite_estado')"><i class="bi bi-search"></i></button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 mb-3">
            <label class="form-label">Logradouro</label>
            <input id="pernoite_logradouro" class="form-control" readonly>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Número</label>
            <input type="number" id="pernoite_numero" class="form-control">
          </div>
        </div>
         <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label">Bairro</label>
                <input id="pernoite_bairro" class="form-control" readonly>
            </div>
            <div class="col-md-4 mb-3">
                <label class="form-label">Cidade</label>
                <input id="pernoite_cidade" class="form-control" readonly>
            </div>
            <div class="col-md-2 mb-3">
                <label class="form-label">Estado</label>
                <input id="pernoite_estado" class="form-control" readonly>
            </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Upload do Comprovante do Novo Endereço de Pernoite</label>
          <input id="comprovantePernoite" type="file" class="form-control" accept=".jpg,.jpeg,.png,.pdf">
        </div>
    </div>
    
    <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
    </div>
  </div>`,
};
