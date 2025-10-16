// Pega o elemento textarea do HTML
const notesTextarea = document.getElementById('notes');

// --- CARREGAR AS NOTAS QUANDO O POPUP ABRIR ---
// Pede ao chrome.storage para buscar as notas que foram salvas com a chave 'saved_notes'
chrome.storage.local.get(['saved_notes'], (result) => {
  // A API responde com um objeto 'result'. Verificamos se 'saved_notes' existe nele.
  if (result.saved_notes) {
    // Se existir, colocamos o valor salvo dentro da nossa textarea
    notesTextarea.value = result.saved_notes;
  }
});

// --- SALVAR AS NOTAS CONFORME O USUÁRIO DIGITA ---
// Adiciona um "ouvinte de eventos" que dispara toda vez que o usuário digita algo na textarea
notesTextarea.addEventListener('input', () => {
  // Pega o texto atual que está na textarea
  const currentNotes = notesTextarea.value;
  
  // Manda o chrome.storage salvar o texto atual.
  // Usamos um objeto com uma chave ('saved_notes') e o valor (o texto)
  chrome.storage.local.set({ saved_notes: currentNotes });
});