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
  produtos_coberturas: `
    <div class="form-step">
      <h4 class="mb-4">Produtos e Coberturas</h4>
      <div class="mb-4">
        <label class="form-label">Selecione os produtos desejados *</label>
        <select id="produtos" class="form-select" required>
          <option value="" disabled selected>Selecione</option>
          <option value="rcf_app">RCF e APP</option>
          <option value="rcf">Somente RCF</option>
          <option value="app">Somente APP</option>
          <option value="auto">Seguro Auto Compreensivo</option>
        </select>
      </div>

      <div id="rcf_app_fields">
        <div id="coberturaRCF" class="mb-4" style="display: none;">
          <label for="valorRCF_select" class="form-label">Valor RCF (R$) *</label>
          <div id="rcfApoliceInfo" class="text-muted mb-2"></div>
          <select id="valorRCF_select" class="form-select">
            <option value="" disabled selected>Selecione</option>
            <option value="50000">R$ 50.000</option>
            <option value="100000">R$ 100.000</option>
            <option value="150000">R$ 150.000</option>
            <option value="200000">R$ 200.000</option>
            <option value="outro">Outro Valor</option>
          </select>
          <input type="number" class="form-control mt-2" id="valorRCF_outro" step="1000" style="display: none;" placeholder="Digite o valor desejado" />
        </div>

        <div id="coberturaAPP" class="mb-4" style="display: none;">
          <label for="valorAPP_select" class="form-label">Valor APP por pessoa (R$) *</label>
          <div id="appApoliceInfo" class="text-muted mb-2"></div>
          <select id="valorAPP_select" class="form-select">
            <option value="" disabled selected>Selecione</option>
            <option value="5000">R$ 5.000</option>
            <option value="10000">R$ 10.000</option>
            <option value="outro">Outro Valor</option>
          </select>
          <input type="number" class="form-control mt-2" id="valorAPP_outro" step="1000" style="display: none;" placeholder="Digite o valor desejado" />
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
              <option value="" disabled selected>Selecione</option>
              <option>1x</option> <option>2x</option> <option>3x</option> <option>4x</option> <option>5x</option> <option>6x</option> <option>7x</option> <option>8x</option> <option>9x</option> <option>10x</option> 
            </select>
          </div>
        </div>

        <div id="segs_trabalhadas_container" class="d-none">
          <h4 id="segs_trabalhadas" class="mb-4">Seguradoras Trabalhadas</h4>
          <div class="row">
            <div class="col-md-12 mb-3">
              <label for="segTrabalhadas" class="form-label">Seguradoras *</label>
              <select id="segTrabalhadas" class="form-select" required>
                <option value="" disabled selected>Selecione</option>
                <option>Aruana</option> <option>Porto Seguro</option> <option>Azul</option> <option>Allianz</option> <option>Tokio Marine</option> <option>HDI</option> <option>Sompo</option> <option>Bradesco</option> <option>Suhai</option> <option>Mapfre</option> <option>MBM</option> <option>Outra</option>
              </select>
            </div>
            <div class="mb-3" id="seguradoraContainer" style="display: none;">
              <label for="seguradoraNome" class="form-label">Nome da outra seguradora *</label>
              <input type="text" id="seguradoraNome" class="form-control" />
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
  auto_compreensivo: `
    <div class="form-step">

      <div class="row">
        <div class="col-md-4 mb-3">
          <label class="form-label">Nome Completo *</label>
          <input id="nomeCompleto" placeholder="Nome" class="form-control" required>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">CPF/CNPJ *</label>
          <input id="auto_doc" class="form-control" placeholder="CPF ou CNPJ"  required/>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Placa *</label>
          <input id="auto_placa" placeholder="Placa" class="form-control" required>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Veículo é 0km? *</label>
          <div class="d-flex gap-3">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="veiculo0km" id="veiculo0kmSim" value="sim" required onchange="toggleConditionalField(this.value === 'sim', 'notaFiscal0kmContainer')">
              <label class="form-check-label" for="veiculo0kmSim">Sim</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="veiculo0km" id="veiculo0kmNao" value="nao" required onchange="toggleConditionalField(this.value === 'sim', 'notaFiscal0kmContainer')">
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
          <select id="isencaoFiscal" class="form-select" required onchange="toggleConditionalField(this.value !== 'nao', 'notaFiscalIsencaoContainer')">
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
              <input class="form-check-input" type="radio" name="seguroAtual" id="seguroAtualSim" value="sim" required onchange="toggleConditionalField(this.value === 'sim', 'apoliceVigenteContainer')">
              <label class="form-check-label" for="seguroAtualSim">Sim</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="seguroAtual" id="seguroAtualNao" value="nao" required onchange="toggleConditionalField(this.value === 'sim', 'apoliceVigenteContainer')">
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
                <input class="form-check-input" type="radio" name="pernoiteGaragem" id="pernoiteGaragemSim" value="sim" required onchange="toggleConditionalField(this.value === 'sim', 'tipoGaragemContainer')">
                <label class="form-check-label" for="pernoiteGaragemSim">Sim</label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="pernoiteGaragem" id="pernoiteGaragemNao" value="nao" required onchange="toggleConditionalField(this.value === 'sim', 'tipoGaragemContainer')">
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
                <input class="form-check-input" type="radio" name="motoristaAuxiliar" id="motoristaAuxiliarSim" value="sim" required onchange="toggleConditionalField(this.value === 'sim', 'motoristaAuxiliarContainer')">
                <label class="form-check-label" for="motoristaAuxiliarSim">Sim</label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="motoristaAuxiliar" id="motoristaAuxiliarNao" value="nao" required onchange="toggleConditionalField(this.value === 'sim', 'motoristaAuxiliarContainer')">
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

      <div class="btn-group-navigation">
        <button type="button" class="btn btn-secondary" onclick="prevStep()"><i class="bi bi-arrow-left"></i> Voltar</button>
        <button type="button" class="btn btn-primary" onclick="nextStep()">Próximo <i class="bi bi-arrow-right"></i></button>
      </div>
    </div>`,

  aviso_sinistro: `
    <div class="form-step">
      <h4 class="mb-4">Aviso de Sinistro</h4>

      <!-- Corretor -->
      <div class="mb-3">
        <label for="sinistroCorretor" class="form-label">Corretor:</label>
        <input type="text" id="sinistroCorretor" class="form-control" />
      </div>

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
            <input class="form-check-input" type="radio" name="sinistroResponsabilidade" id="sinistroResponsabilidadeSim" value="sim"  onchange="toggleConditionalField(this.value === 'sim', 'sinistroMotivoResponsabilidadeContainer')" />
            <label class="form-check-label" for="sinistroResponsabilidadeSim">Sim</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="sinistroResponsabilidade" id="sinistroResponsabilidadeNao" value="nao"  onchange="toggleConditionalField(this.value === 'sim', 'sinistroMotivoResponsabilidadeContainer')" />
            <label class="form-check-label" for="sinistroResponsabilidadeNao">Não</label>
          </div>
        </div>
      </div>
      <div class="mb-3" id="sinistroMotivoResponsabilidadeContainer" style="display: none;">
        <label for="sinistroMotivoResponsabilidade" class="form-label">Se sim, qual o motivo?: *</label>
        <textarea id="sinistroMotivoResponsabilidade" class="form-control" rows="2"></textarea>
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
                      <input class="form-check-input" type="radio" name="seguradoEstrangeiro" id="seguradoEstrangeiroSim" value="sim"  />
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
                      <input class="form-check-input" type="radio" name="seguradoPPE" id="seguradoPPESim" value="sim"  />
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
            <button class="btn btn-outline-secondary" type="button" onclick="buscarCep()"><i class="bi bi-search"></i></button>
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
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Trabalha com estipulantes?</label>
          <select id="estipuQuestion" class="form-select" >
            <option disabled selected value="">Selecione</option>
            <option>Sim</option>
            <option>Não</option>
          </select>
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
      <div class="row">
        <div class="col-md-12 mb-3">
            <label class="form-label">Contrato com adesão ao TIGO CLUBE? *</label>
            <div class="d-flex gap-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="tigoClube" id="tigoClubeSim" value="sim"  />
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
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF *</label>
              <input id="aux1CPF" class="form-control" placeholder="000.000.000-00" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
            <input id="aux1CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
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
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF *</label>
              <input id="aux2CPF" class="form-control" placeholder="000.000.000-00" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Upload CNH (PDF/JPG/PNG) *</label>
            <input id="aux2CNH" type="file" class="form-control" accept=".pdf,.jpg,.jpeg,.png" />
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
          <input id="renovApolice" class="form-control"  placeholder="Ex: 938-..." />
        </div>
        <div class="col-md-6 mb-3">
          <label for="renovVencimento" class="form-label">Data de Vencimento *</label>
          <input type="date" id="renovVencimento" class="form-control"  />
        </div>
      </div>
      <div class="mb-3">
        <label for="renovSeguradora" class="form-label">Seguradora Vencendo *</label>
        <select id="renovSeguradora" class="form-select" >
          <option value="">Selecione</option>
          <option value="aruana">Aruana</option>
          <option value="outra">Outra</option>
        </select>
      </div>
      <div class="mb-3" id="outraSeguradoraContainer" style="display: none;">
        <label for="outraSeguradoraNome" class="form-label">Nome da outra seguradora *</label>
        <input type="text" id="outraSeguradoraNome" class="form-control" />
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

          <div class="mb-3">
            <label for="endossoSeguradora" class="form-label">Seguradora *</label>
            <select id="endossoSeguradora" class="form-select" required>
              <option value="">Selecione</option>
              <option value="aruana">Aruana</option>
              <option value="mbm">MBM</option>
              <option value="outra">Outra</option>
            </select>
          </div>
          <div class="mb-3" id="endossoOutraSeguradoraContainer" style="display: none;">
            <label for="endossoOutraSeguradoraNome" class="form-label">Nome da outra seguradora *</label>
            <input type="text" id="endossoOutraSeguradoraNome" class="form-control" />
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
              <option value="cancel_req">Pedidos de Cancelamento</option>
            </select>
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
                <input class="form-check-input" type="radio" name="tipoPessoa" id="pf" value="pf" required checked />
                <label class="form-check-label" for="pf">Pessoa Física</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoPessoa" id="pj" value="pj" required />
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
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nome Completo ou Razão Social *</label>
              <input id="segundaViaNome" class="form-control" required />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF ou CNPJ *</label>
              <input id="segundaViaDocumento" class="form-control" placeholder="CPF ou CNPJ" required />
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
              <label class="form-label">Nome Completo ou Razão Social *</label>
              <input id="finRegNome" class="form-control" required />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">CPF ou CNPJ *</label>
              <input id="finRegDocumento" class="form-control" placeholder="CPF ou CNPJ" required />
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
          <div class="mb-3">
            <label class="form-label">Responsável pelo Pedido *</label>
            <input id="finRegResponsavel" class="form-control" required />
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
      { label: "Veículo", template: "veiculo" },
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
  cotacao: {
    description: "Solicite uma cotação",
    steps: [
      { label: "Tipo", template: "tipo" },
      { label: "Segurado", template: "segurado" },
      { label: "Veiculo", template: "veiculo" },
      { label: "Cotação", template: "auto_compreensivo" },
      { label: "Enviar", template: "enviar" },
    ],
  },
  aviso_sinistro: {
    description: "Preencha os dados para Aviso de Sinistro",
    steps: [
      { label: "Tipo", template: "tipo" },
      { label: "Aviso Segurado", template: "aviso_sinistro" },
      { label: "Aviso Terceiro", template: "aviso_sinistro_terceiro" },
      { label: "Aviso Ocorrência", template: "aviso_sinistro_ocorrencia" },
      { label: "Info & Consent.", template: "consentimento" },
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

  // Validação especial para a etapa 'solicitante' (colaborador)
  if (activeSteps[step]?.template === 'solicitante') {
    const codigoInput = document.getElementById('colaboradorCodigo');
    const colaborador = colaboradoresData.find(c => c.codigo.toUpperCase() === codigoInput.value.trim().toUpperCase());

    if (!colaborador) {
      isValid = false;
      codigoInput.classList.add('is-invalid');
      // Also clear the name field in case user corrected a valid code to an invalid one
      document.getElementById('estipNome').value = '';
      document.getElementById('colaboradorNomeDisplay').textContent = '';
    } else {
      // It's valid, ensure fields are correctly populated before proceeding
      document.getElementById('estipNome').value = colaborador.name;
      document.getElementById('colaboradorNomeDisplay').textContent = `Olá, ${colaborador.name}!`;
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
  let stepsToAdd = [];

  if (currentFluxo === 'nova' && currentStepConfig.template === 'tipo_solicitante') {
    needsDynamicRender = true;
    const tipoSolicitante = document.getElementById('tipoSolicitante').value;
    formDataStorage.tipoSolicitante = tipoSolicitante;

    const baseStepsAfter = [
        { label: "Produtos", template: "produtos_coberturas" },
        { label: "Auxiliares", template: "auxiliares" },
        { label: "Info & Consent.", template: "consentimento" },
    ];

    let dynamicSteps = [];
    if (tipoSolicitante === 'estipulante') {
        dynamicSteps.push({ label: "Estipulante", template: "estipulante" });
        dynamicSteps.push({ label: "Segurado", template: "segurado" });
    } else if (tipoSolicitante === 'colaborador') {
        dynamicSteps.push({ label: "Colaborador", template: "solicitante" });
    } else if (tipoSolicitante === 'segurado'){
      dynamicSteps.push({ label: "Segurado", template: "segurado" })
    }

    activeSteps.splice(currentStep + 1, activeSteps.length - currentStep - 1, ...dynamicSteps, ...baseStepsAfter);
  }

  if (currentFluxo === 'nova' && currentStepConfig.template === 'produtos_coberturas') {
    const produtosSelect = document.getElementById('produtos');
    const autoStepIndex = activeSteps.findIndex(step => step.template === 'auto_compreensivo');

    if (produtosSelect.value === 'auto') {
      if (autoStepIndex === -1) {
        needsDynamicRender = true;
        const currentIndex = activeSteps.findIndex(step => step.template === 'produtos_coberturas');
        const autoStep = { label: "Auto Compreensivo", template: "auto_compreensivo" };
        activeSteps.splice(currentIndex + 1, 0, autoStep);
      }
    } else {
      if (autoStepIndex > -1) {
        needsDynamicRender = true;
        activeSteps.splice(autoStepIndex, 1);
      }
    }
  }

  if (currentFluxo === 'nova' && currentStepConfig.template === 'solicitante') {
    needsDynamicRender = true;
    const estipuQuestion = document.getElementById('estipuQuestion').value;

    const solicitanteStepIndex = currentStep;

    const baseStepsAfter = [
        { label: "Veículo", template: "veiculo" },
        { label: "Produtos", template: "produtos_coberturas" },
        { label: "Auxiliares", template: "auxiliares" },
        { label: "Info & Consent.", template: "consentimento" },
    ];

    let personSteps = [];
    if (estipuQuestion === 'Sim') {
        personSteps.push({ label: "Estipulante", template: "estipulante" });
        personSteps.push({ label: "Segurado", template: "segurado" });
    } else {
        personSteps.push({ label: "Segurado", template: "segurado" });
    }

    activeSteps.splice(solicitanteStepIndex + 1, Infinity, ...personSteps, ...baseStepsAfter);
  }

  if (currentFluxo === 'endosso') {
    if (currentStepConfig.template === 'endosso_dados') {
      needsDynamicRender = true;
      const tipoEndosso = document.getElementById('endossoTipo').value;
      activeSteps.splice(currentStep + 1); 

      if (tipoEndosso === 'substituicao_veiculo') {
        stepsToAdd.push({ label: "Veículo", template: "endosso_veiculo" });
      } else if (tipoEndosso === 'inclusao_condutor') {
        stepsToAdd.push({ label: "Condutores", template: "endosso_qa_inicial" });
      } else if (tipoEndosso === 'alteracao_endereco') {
        stepsToAdd.push({ label: "Contato", template: "endosso_alteracao_contato" });
      } else if (tipoEndosso === 'correcao_cadastral') {
        stepsToAdd.push({ label: "Correção", template: "endosso_correcao_cadastral" });
      } else if (tipoEndosso === 'cancel_req') {
        stepsToAdd.push({ label: "Carta", template: "carta_cancelamento" });
      }

      stepsToAdd.push({ label: "Enviar", template: "enviar" });

    } else if (currentStepConfig.template === 'endosso_qa_inicial') {
      needsDynamicRender = true;
      const qaInicial = document.getElementById('endossoQaInicial').value;
      activeSteps.splice(currentStep + 1); 

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
      activeSteps.splice(currentStep + 1);

      const acoesRetirada1 = ['retirar_atual', 'retirar_incluir_novo', 'retirar_1_manter_1', 'retirar_1_incluir_1'];
      const acoesRetirada2 = ['retirar_2_ficar_sem', 'retirar_2_incluir_1', 'retirar_2_incluir_2'];

      if (acoesRetirada1.includes(acao)) {
        stepsToAdd.push({ label: "Retirada", template: "endosso_retirada_1_condutor" });
      } else if (acoesRetirada2.includes(acao)) {
        stepsToAdd.push({ label: "Retirada", template: "endosso_retirada_2_condutores" });
      }

      if (['add_1', 'retirar_incluir_novo', 'manter_add_outro', 'retirar_1_incluir_1', 'retirar_2_incluir_1'].includes(acao)) {
        stepsToAdd.push({ label: "Dados Condutor", template: "endosso_dados_condutor_1" });
      } else if (['add_2', 'retirar_2_incluir_2'].includes(acao)) {
        stepsToAdd.push({ label: "Dados Condutores", template: "endosso_dados_condutor_2" });
      }
      
      stepsToAdd.push({ label: "Enviar", template: "enviar" });
    }
  }

  if (needsDynamicRender) {
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

    activeSteps.push(...stepsToAdd);
    
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
      }
    });

    toggleOutroCampo('renovSeguradora', 'outraSeguradoraContainer', 'outraSeguradoraNome');
    toggleOutroCampo('endossoSeguradora', 'endossoOutraSeguradoraContainer', 'endossoOutraSeguradoraNome');
    toggleOutroCampo('segundaViaTipoDoc', 'segundaViaOutroContainer', 'segundaViaOutroNome');
    toggleOutroCampo('segTrabalhadas', 'seguradoraContainer', 'seguradoraNome', 'Outra');
    handleRcfVisibility();
    handleAppVisibility();

    // Lógica para mostrar/esconder segs_trabalhadas_container
    const segsTrabalhadasContainer = document.getElementById('segs_trabalhadas_container');
    if (segsTrabalhadasContainer) {
      if (formDataStorage.tipoSolicitante === 'colaborador') {
        segsTrabalhadasContainer.classList.remove('d-none');
      } else {
        segsTrabalhadasContainer.classList.add('d-none');
      }
    }
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

    const colaborador = colaboradoresData.find(c => c.codigo.toUpperCase() === codigo);

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

  // Adiciona o listener para a busca de veículo por placa
  buscaVeiculo();

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

    // Adiciona dados que não estão em campos de input
    formData.append('tipo', currentFluxo);
    formData.append('tipoSolicitante', formDataStorage.tipoSolicitante || '');

    switch (currentFluxo) {
        case 'nova':
            const rcfPolicySelect = document.getElementById('rcf_policy_select');
            const appPolicySelect = document.getElementById('app_policy_select');
            const rcfData = rcfPolicySelect && rcfPolicySelect.value ? JSON.parse(rcfPolicySelect.value) : {};
            const appData = appPolicySelect && appPolicySelect.value ? JSON.parse(appPolicySelect.value) : {};

            appendValue('solicitanteNome', 'estipNome');
            appendValue('estipulanteCNPJ', 'cnpj');
            formData.append('estipulanteApoliceRCF', rcfData.apolice || '');
            formData.append('estipulantePremioRCF', rcfData.premio || '');
            formData.append('estipulanteDanoMaterialRCF', rcfData.dano_material_DM || '');
            formData.append('estipulanteDanoCorporalRCF', rcfData.dano_corporal_DC || '');
            formData.append('estipulanteProLaboreRCF', rcfData.pro_labore || '');
            formData.append('estipulanteFatorRCF', rcfData.fator || '');
            formData.append('estipulanteApoliceAPP', appData.apolice || '');
            formData.append('estipulantePremioAPP', appData.premio || '');
            formData.append('estipulanteIpaCondutorAPP', appData.ipa_condutor || '');
            formData.append('estipulanteMaCondutorAPP', appData.ma_condutor || '');
            formData.append('estipulanteProLaboreAPP', appData.pro_labore || '');
            formData.append('estipulanteFatorAPP', appData.fator || '');
            formData.append('estipulanteIpaPassageiroAPP', appData.ipa_passageiro || '');
            formData.append('estipulanteMaPassageiroAPP', appData.ma_passageiro || '');

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
            appendValue('seguradoPPEGrauRelacionamento', 'seguradoPPEGrauRelacionamento');
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
            appendValue('seguradoPPEGrauRelacionamento', 'seguradoPPEGrauRelacionamento');
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
            if (tipoSolicitacao) formData.append('tipoSolicitacao', tipoSolicitacao);

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
            alert("Tipo de solicitação não configurado para envio.");
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            return;
    }

    // console.log('Enviando para o servidor:');
    // for (let [key, value] of formData.entries()) {
    //     console.log(key, value);
    // }

    try {
      const response = await fetch("/submit-form", {
        method: 'POST',
        body: formData,
      });

      console.log(response.status, response.statusText);

      if (response.ok) {
        console.log(`Formulário do fluxo '${currentFluxo}' enviado com sucesso!`);
        document.getElementById("multiStepForm").style.display = "none";
        document.getElementById("successMessageText").textContent = `Recebemos sua ${tipoText}. Entraremos em contato em breve.`;
        document.getElementById("successMessage").classList.add("active");
      }

    } catch (error) {
      console.error("Falha ao enviar o formulário:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  };

  form.addEventListener("submit", window.formSubmitHandler);

  handleColaboradorValidation();

  // --- Configuração dos Listeners ---

  // Mapeia os IDs dos selects para suas respectivas configurações de toggle
  const toggleConfigs = {
    'renovSeguradora': { container: 'outraSeguradoraContainer', input: 'outraSeguradoraNome' },
    'endossoSeguradora': { container: 'endossoOutraSeguradoraContainer', input: 'endossoOutraSeguradoraNome' },
    'segundaViaTipoDoc': { container: 'segundaViaOutroContainer', input: 'segundaViaOutroNome' },
    'segTrabalhadas': { container: 'seguradoraContainer', input: 'seguradoraNome', value: 'Outra' }
  };

  // Adiciona listeners para os campos de toggle
  for (const selectId in toggleConfigs) {
    const el = document.getElementById(selectId);
    if (el) {
      const config = toggleConfigs[selectId];
      el.addEventListener('change', () => toggleOutroCampo(selectId, config.container, config.input, config.value || 'outra'));
    }
  }

  // Outros listeners
  const produtosSelect = document.getElementById("produtos");
  if (produtosSelect) {
    produtosSelect.addEventListener("change", () => {
      applyProductsVisibility();
      toggleObservacaoAPP();
    });
  }
  const rcfSelect = document.getElementById("valorRCF_select");
  if (rcfSelect) rcfSelect.addEventListener("change", handleRcfVisibility);
  const appSelect = document.getElementById("valorAPP_select");
  if (appSelect) appSelect.addEventListener("change", handleAppVisibility);
  document.querySelectorAll('input[name="seguradoEstrangeiro"]').forEach((r) => r.addEventListener("change", applyEstipulanteVisibility));
  document.querySelectorAll('input[name="seguradoPPE"]').forEach((r) => r.addEventListener("change", applyEstipulanteVisibility));
  document.querySelectorAll('input[name="tigoClube"]').forEach((r) => r.addEventListener("change", toggleTigoClubeAdesao));
  
  const codigo = document.getElementById('codigo');
  if (codigo) {
    codigo.addEventListener('blur', buscar);
    codigo.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        buscar();
      }
    });
  }

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

  // --- Inicialização da UI ---
  // Chama todas as funções de visibilidade para garantir o estado correto ao renderizar
  applyProductsVisibility();
  for (const selectId in toggleConfigs) {
      const config = toggleConfigs[selectId];
      toggleOutroCampo(selectId, config.container, config.input, config.value || 'outra');
  }
  handleRcfVisibility();
  handleAppVisibility();
  applyEstipulanteVisibility();
  toggleTigoClubeAdesao(); 

  if (activeSteps[currentStep]?.template === 'renovacao_confirmar') {
    populateRenovacaoConfirmacao();
  }
}

function applyProductsVisibility() {
  const produtosSelect = document.getElementById("produtos");
  if (!produtosSelect) return;
  const selectedProduct = produtosSelect.value;

  const fieldsContainer = document.getElementById("rcf_app_fields");
  if (!fieldsContainer) return;

  const coberturaRCF = document.getElementById("coberturaRCF");
  const coberturaAPP = document.getElementById("coberturaAPP");
  const qtdParcelas = document.getElementById("qtdParcelas");
  const segTrabalhadas = document.getElementById("segTrabalhadas");

  const isAuto = selectedProduct === 'auto';

  fieldsContainer.style.display = isAuto ? 'none' : 'block';
  
  if (qtdParcelas) qtdParcelas.required = !isAuto;
  if (segTrabalhadas) segTrabalhadas.required = !isAuto;

  if (!isAuto) {
    const showRCF = selectedProduct === 'rcf' || selectedProduct === 'rcf_app';
    const showAPP = selectedProduct === 'app' || selectedProduct === 'rcf_app';

    if (coberturaRCF) {
        coberturaRCF.style.display = showRCF ? 'block' : 'none';
        document.getElementById('valorRCF_select').required = showRCF;
        if (showRCF) handleRcfVisibility();
    }
    
    if (coberturaAPP) {
        coberturaAPP.style.display = showAPP ? 'block' : 'none';
        document.getElementById('valorAPP_select').required = showAPP;
        if (showAPP) handleAppVisibility();
    }
  } else {
    // Garante que os campos de RCF e APP não sejam obrigatórios quando for auto
    if (coberturaRCF) document.getElementById('valorRCF_select').required = false;
    if (coberturaAPP) document.getElementById('valorAPP_select').required = false;
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

/**
 * Torna um campo de texto visível e obrigatório quando uma opção específica de um select é escolhida.
 * @param {string} selectId - O ID do elemento <select>.
 * @param {string} containerId - O ID do contêiner que envolve o campo de texto.
 * @param {string} inputId - O ID do campo de texto <input>.
 * @param {string} [triggerValue='outro'] - O valor do select que dispara a ação.
 */
function toggleOutroCampo(selectId, containerId, inputId, triggerValue = 'outro') {
  const select = document.getElementById(selectId);
  const container = document.getElementById(containerId);
  const input = document.getElementById(inputId);

  if (!select || !container || !input) {
    return;
  }

  const shouldShow = select.value === triggerValue;

  container.style.display = shouldShow ? 'block' : 'none';
  input.required = shouldShow;

  if (!shouldShow) {
    input.value = '';
    input.classList.remove('is-invalid');
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
  const isColaborador = prefix === 'colaborador';

  const cepId = isEstipulante ? 'cep' : (isColaborador ? 'colaborador_cep' : 'segurado_cep');
  const logradouroId = isEstipulante ? 'logradouro' : (isColaborador ? 'colaborador_logradouro' : 'segurado_logradouro');
  const bairroId = isEstipulante ? 'bairro' : (isColaborador ? 'colaborador_bairro' : 'segurado_bairro');
  const cidadeId = isEstipulante ? 'cidade' : (isColaborador ? 'colaborador_cidade' : 'segurado_cidade');
  const estadoId = isEstipulante ? 'estado' : (isColaborador ? 'colaborador_estado' : 'segurado_estado');

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
            fetch('./data/estipulantes_app.csv').catch(e => e)
        ]);

        let achados_rcf = [];
        let achados_app = [];
        let estipulanteNome = '';

        // Processa RCF
        if (rcfResponse.ok) {
            const texto_rcf = await rcfResponse.text();
            const csv_rcf = Papa.parse(texto_rcf, { header: true, skipEmptyLines: true }).data;
            achados_rcf = csv_rcf.filter(l => l.codigo === codigo);
        } else {
            console.error('Falha ao carregar estipulantes_rcf.csv');
        }

        // Processa APP
        if (appResponse.ok) {
            const texto_app = await appResponse.text();
            const csv_app = Papa.parse(texto_app, { header: true, skipEmptyLines: true, delimiter: ';' }).data;
            achados_app = csv_app.filter(l => l.codigo === codigo);
        } else {
            console.error('Falha ao carregar estipulantes_app.csv');
        }

        if (achados_rcf.length === 0 && achados_app.length === 0) {
            resultadoDiv.innerHTML = `<div class="alert alert-danger">Estipulante não encontrado para o Código informado.</div>`;
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
  setVal('veiAno', dv.ano_modelo ?? dv.ano_fabricacao ?? dv.ano_frabricacao ?? '');
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

      const response = await fetch(`/consulta_placa?placa=${encodeURIComponent(placa)}`);
      const data = await response.json();

      if (response.ok && data?.status === 'ok') {
        plateCache.set(placa, data); 
        fillFromApiData(data);
        lastPlateSuccess = placa;
        feedbackEl.remove();
      } else {
        feedbackEl.textContent = (data?.mensagem || data?.message || 'Placa não encontrada.');
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



// Listener inicial para o tipo de solicitação
document.getElementById("tipoSolicitacao").addEventListener("change", (e) => {
  renderizarFluxo(e.target.value);
});

// Inicialização da página
function inicializarFormulario(fluxoInicial = null) {
  fetchColaboradores();
  resetForm(); // Garante que o estado está limpo
  if (fluxoInicial && fluxosConfig[fluxoInicial]) {
    document.getElementById('tipoSolicitacao').value = fluxoInicial;
    renderizarFluxo(fluxoInicial);
  }
}

// Para iniciar com a tela de seleção, chame: inicializarFormulario();
// Para iniciar diretamente com um fluxo, chame: inicializarFormulario('nova');
inicializarFormulario();