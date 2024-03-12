chrome.runtime.onMessage.addListener((msg) => {
  const { type, keyName, value, result, phone, newCall } = msg;
  if (type === 'save') {
    chrome.storage.local.set({ [keyName]: JSON.stringify(value) });
    return true;
  }

  if (type === 'updateHistory') {
    if (newCall) {
      chrome.storage.local.get(['history']).then(({ history }) => {
        let arrayHistory;
        if (history) {
          arrayHistory = JSON.parse(history);
        } else {
          arrayHistory = [];
        }
        const newHistory = [newCall, ...arrayHistory];
        chrome.storage.local.set({ history: JSON.stringify(newHistory) });
      });
      return true;
    }
  }

  if (type === 'register') {
    if (result === 'ok') {
      chrome.runtime.sendMessage({ type: 'register', result: 'ok' });
      return true;
    }

    if (result === 'failed') {
      chrome.runtime.sendMessage({ type: 'register', result: 'failed' });
      return true;
    }
  }

  if (type === 'answer') {
    if (result === 'ok') {
      chrome.runtime.sendMessage({ type: 'answer', result: 'ok' });
      return true;
    }

    if (phone) {
      chrome.runtime.sendMessage({ type: 'answer', phone });
      return true;
    }

    if (result === 'failed') {
      chrome.runtime.sendMessage({ type: 'answer', result: 'failed' });
      return true;
    }
  }

  if (type === 'connect') {
    if (result === 'ok') {
      chrome.runtime.sendMessage({ type: 'connect', result: 'ok' });
      return true;
    }

    if (result === 'failed') {
      chrome.runtime.sendMessage({ type: 'connect', result: 'failed' });
      return true;
    }
  }

  if (type === 'end') {
    chrome.runtime.sendMessage({ type: 'end' });
    return true;
  }

  if (type === 'timer') {
    if (result === 'start') {
      chrome.runtime.sendMessage({ type: 'timer', result: 'start' });
      return true;
    }

    if (result === 'stop') {
      chrome.runtime.sendMessage({ type: 'timer', result: 'stop' });
      return true;
    }
  }
  return true;
});
