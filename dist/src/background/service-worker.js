chrome.runtime.onInstalled.addListener(() => {
    console.log('Extensão instalada com sucesso.');
    chrome.storage.local.set({ install_time: Date.now() });
  });
  
  // Listener para responder à mensagem 'PING' do popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'PING') {
      console.log('Recebido PING do popup.');
      sendResponse({ ok: true, time: new Date().toISOString() });
    }
    // Retornar true é importante para indicar que a resposta será assíncrona
    return true;
  });