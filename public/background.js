/* eslint-disable no-undef */
importScripts('jssip.js');

const socket = new JsSIP.WebSocketInterface('wss://voip.uiscom.ru');
const configuration = {
  sockets: [socket],
  uri: '',
  password: '',
  username: '',
  register: false,
};

function registration(login, password, server, cb) {
  configuration.uri = `sip:${login}@${server}`;
  configuration.password = password;
  configuration.username = login;
  configuration.register = true;

  JsSIP.debug.enable('JsSIP:*');
  const coolPhone = new JsSIP.UA(configuration);
  coolPhone.start();

  coolPhone.on('registered', function () {
    cb({ type: 'register', result: 'ok' });
  });

  coolPhone.on('registrationFailed', function () {
    cb({ type: 'register', result: 'failed' });
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const { type, login, password, server } = msg;
  if (type === 'register') {
    registration(login, password, server, sendResponse);
  }
  return true;
});
