let currentStep = 0;
let currentFluxo = "";
let activeSteps = [];
let formDataStorage = {}; 

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
  
  // Aplica as regras de visibilidade condicional após a renderização
  applyConditionalVisibility();
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