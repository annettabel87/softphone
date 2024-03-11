chrome.runtime.onMessage.addListener((msg) => {
  const { type, keyName, value, result, phone } = msg;
  if (type === 'save') {
    chrome.storage.local.set({ [keyName]: JSON.stringify(value) });
    return true;
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
});
