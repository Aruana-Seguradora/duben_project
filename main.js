document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('cidade');

  // Inicializa o Choices.js
  const choices = new Choices(element, {
    removeItemButton: true, // permite remover itens selecionados
    searchPlaceholderValue: 'Buscar cidade...', // placeholder da busca
    noResultsText: 'Nenhum resultado encontrado',
    noChoicesText: 'Sem opções disponíveis',
    itemSelectText: 'Clique para selecionar',
    shouldSort: false // mantém a ordem original das opções
  });

  // Exemplo: capturar valores selecionados
  element.addEventListener('change', () => {
    console.log('Selecionadas:', choices.getValue(true)); // retorna array com os valores
  });
});
