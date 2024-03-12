import JsSIP from 'jssip';
import { messageTypes, responseType } from '../constants/constants';

let coolPhone;
let session;
let callStartTime;
let callEndTime;
let phone;
const sound = new window.Audio();
sound.autoplay = true;
sound.loop = true;

const incomingSound = new window.Audio();
incomingSound.src = 'sound/rington.mp3';
incomingSound.loop = true;

const socket = new JsSIP.WebSocketInterface('wss://voip.uiscom.ru');
const configuration = {
  sockets: [socket],
  uri: '',
  password: '',
  username: '',
  register: false,
};

export function registration(login, password, server) {
  configuration.uri = `sip:${login}@${server}`;
  configuration.password = password;
  configuration.username = login;
  configuration.register = true;

  JsSIP.debug.enable('JsSIP:*');
  coolPhone = new JsSIP.UA(configuration);

  coolPhone.on('registered', () => {
    chrome.runtime.sendMessage({ type: messageTypes.register, result: responseType.ok });
    chrome.runtime.sendMessage({
      type: messageTypes.save,
      key: 'register',
      value: { server, password, login, register: true },
    });
  });

  coolPhone.on('registrationFailed', () => {
    chrome.runtime.sendMessage({
      type: messageTypes.register,
      result: responseType.failed,
    });
  });

  coolPhone.on('connected', () => {
    chrome.runtime.sendMessage({
      type: messageTypes.connect,
      result: responseType.ok,
    });
  });

  coolPhone.on('disconnected', () => {
    chrome.runtime.sendMessage({
      type: messageTypes.connect,
      result: responseType.failed,
    });
  });

  coolPhone.on('newRTCSession', (data) => {
    console.log(data);

    session = data.session;

    session.on('connecting', () => {
      chrome.runtime.sendMessage({
        type: messageTypes.answer,
        result: responseType.ok,
      });
    });

    session.on('progress', () => {
      phone = session.remote_identity.uri.user;
      const type = data.originator === 'remote' ? 'incomingCall' : 'outgoingCall';

      if (type === 'incomingCall') {
        incomingSound.play();
        chrome.runtime.sendMessage({
          type: messageTypes.answer,
          phone,
        });
      }
      if (type === 'outgoingCall') {
        chrome.runtime.sendMessage({
          type: messageTypes.call,
          result: 'progress',
        });
      }
    });

    session.on('accepted', (e) => {
      console.log('accepted', e);
    });

    session.on('confirmed', () => {
      callStartTime = session.start_time;
      chrome.runtime.sendMessage({
        type: messageTypes.answer,
        result: responseType.ok,
      });
      chrome.runtime.sendMessage({
        type: messageTypes.timer,
        result: responseType.start,
      });

      const localStream = session.connection.getLocalStreams()[0];
      const dtmfSender = session.connection.createDTMFSender(
        localStream.getAudioTracks()[0]
      );
      session.sendDTMF = (tone) => {
        dtmfSender.insertDTMF(tone);
      };
    });

    session.on('peerconnection', () => {
      session.connection.addEventListener('track', (e) => {
        const localStream = e.streams[0];
        sound.srcObject = localStream;
        sound.play();
      });
    });

    if (session.direction === 'outgoing') {
      session.connection.addEventListener('track', (e) => {
        const localStream = e.streams[0];
        sound.srcObject = localStream;
        sound.play();
      });
    }

    session.on('failed', () => {
      incomingSound.pause();
      chrome.runtime.sendMessage({
        type: messageTypes.answer,
        result: responseType.failed,
      });
    });

    session.on('ended', () => {
      incomingSound.pause();
      callEndTime = session.end_time;
      const newCall = {
        start: callStartTime,
        end: callEndTime,
        phone,
        direction: session.direction,
        callDuration: (callEndTime - callStartTime) / 1000,
      };

      chrome.runtime.sendMessage({
        type: messageTypes.updateHistory,
        newCall,
      });

      chrome.runtime.sendMessage({
        type: messageTypes.end,
      });
      chrome.runtime.sendMessage({
        type: messageTypes.timer,
        result: responseType.stop,
      });
    });
  });

  coolPhone.start();
}

export function answer() {
  incomingSound.pause();
  session.answer({
    mediaConstraints: { audio: true, video: false },
  });
}

export function endCall() {
  session.terminate();
  chrome.runtime.sendMessage({
    type: messageTypes.end,
  });
}

export function call(uri) {
  coolPhone.call(uri, {
    pcConfig: {
      hackStripTcp: true,
      rtcpMuxPolicy: 'negotiate',
      iceServers: [],
    },
    mediaConstraints: { audio: true, video: false },
    rtcOfferConstraints: { offerToReceiveAudio: 1, offerToReceiveVideo: 0 },
  });
}
