export const messageTypes = {
  register: 'register',
  call: 'call',
  answer: 'answer',
  save: 'save',
  connect: 'connect',
  end: 'end',
};

export const responseType = {
  ok: 'ok',
  failed: 'failed',
  progress: 'progress',
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
