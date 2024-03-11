import JsSIP from 'jssip';
import { messageTypes, responseType } from '../constants/constants';

let coolPhone;
let currentSession;

const socket = new JsSIP.WebSocketInterface('wss://voip.uiscom.ru');
const configuration = {
  sockets: [socket],
  uri: '',
  password: '',
  username: '',
  register: false,
};

const callOptions = {
  mediaConstraints: { audio: true, video: false },
};

export function registration(login, password, server) {
  configuration.uri = `sip:${login}@${server}`;
  configuration.password = password;
  configuration.username = login;
  configuration.register = true;

  JsSIP.debug.enable('JsSIP:*');
  coolPhone = new JsSIP.UA(configuration);
  coolPhone.start();

  coolPhone.on('registered', function () {
    chrome.runtime.sendMessage({ type: messageTypes.register, result: responseType.ok });
    chrome.runtime.sendMessage({
      type: 'save',
      keyName: 'register',
      value: { server, password, login, register: true },
    });
  });

  coolPhone.on('registrationFailed', function () {
    chrome.runtime.sendMessage({
      type: messageTypes.register,
      result: responseType.failed,
    });
  });

  coolPhone.on('newRTCSession', function (data) {
    currentSession = data.session;

    currentSession.on('accepted', console.log('ACCEPTED'));

    currentSession.on('peerconnection', function (e) {
      console.log('peerconnection', e);
      console.log(currentSession.connection.getRemoteStreams());
      // sound.srcObject = currentSession.connection.getRemoteStreams()[0];
    });
    currentSession.on('confirmed', (e) => {
      console.log(e);
    });
  });
}

export function answer() {}

export function call() {}
