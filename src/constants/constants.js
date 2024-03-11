export const messageTypes = {
  register: 'register',
  call: 'call',
  answer: 'answer',
  save: 'save',
  connect: 'connect',
  end: 'end',
  timer: 'timer',
};

export const responseType = {
  ok: 'ok',
  failed: 'failed',
  progress: 'progress',
  stop: 'stop',
  start: 'start',
};

export const ROUTE = {
  REGISTER: '/',
  CALL: '/call',
  HISTORY: '/history',
};

export const statusCallTypes = {
  default: 'default',
  incomingCall: 'incomingCall',
  connectingAnswer: 'connectingAnswer',
  connectingCall: 'connectingCall',
  progress: 'progress',
};
