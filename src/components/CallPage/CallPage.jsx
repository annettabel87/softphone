import { useState } from 'react';
import { answer, call, endCall } from '../../api/phone';
import { messageTypes, responseType, statusCallTypes } from '../../constants/constants';
import AnswerButtons from './AnswerButtons/AnswerButtons';
import CallButton from './CallButton/CallButton';
import './CallPage.css';
import Timer from '../Timer/Timer';

function CallPage({ isConnect }) {
  const [sipURI, setURI] = useState('');
  const [error, setError] = useState(false);
  const [incomingPhone, setIncomingPhone] = useState('');
  const [statusCall, setStatusCall] = useState(statusCallTypes.default);
  const [running, setRunning] = useState(false);

  const callHandler = (e) => {
    e.preventDefault();
    setError('');
    try {
      if (statusCall === statusCallTypes.default) {
        call(sipURI);
      } else {
        endCall();
      }
    } catch (er) {
      if (er.message.includes('Invalid target:')) {
        setError('invalid number');
      } else {
        setError('error');
      }
    }
  };

  const answerHandler = (e) => {
    e.preventDefault();
    setError('');
    answer();
  };

  const rejectHandler = (e) => {
    e.preventDefault();
    setError('');
    endCall();
  };

  chrome.runtime.onMessage.addListener((msg) => {
    const { type, phone, result } = msg;
    if (type === messageTypes.answer) {
      if (phone) {
        setIncomingPhone(phone);
        setStatusCall(statusCallTypes.incomingCall);
      }
      if (result === responseType.ok) {
        setStatusCall(statusCallTypes.connectingAnswer);
      }
      if (result === responseType.failed) {
        setError('rejected');
        setIncomingPhone('');
        setStatusCall(statusCallTypes.default);
        setTimeout(() => setError(''), 2000);
      }
    }

    if (type === messageTypes.call) {
      if (result === responseType.ok) {
        setStatusCall(statusCallTypes.connectingCall);
      }
      if (result === responseType.failed) {
        setError('rejected');
      }
      if (result === responseType.progress) {
        setStatusCall(statusCallTypes.progress);
      }
    }
    if (type === messageTypes.end) {
      setStatusCall('default');
      setIncomingPhone('');
    }

    if (type === messageTypes.timer) {
      if (result === responseType.stop) {
        setRunning(false);
      }
      if (result === responseType.start) {
        setRunning(true);
      }
    }
  });

  return (
    <div className="callPage">
      <form onSubmit={callHandler} className="form">
        <div className="input-box">
          <input
            type="text"
            name="sipURI"
            id="sipURI"
            value={sipURI}
            onChange={(e) => setURI(e.target.value.trim())}
            className="input"
            required
          />
          <label htmlFor="sipURI" className="label">
            URI SIP:
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        {incomingPhone && (
          <p className="phoneBlock">
            Call from: <span className="phone">{incomingPhone}</span>
          </p>
        )}
        <AnswerButtons
          answerHandler={answerHandler}
          rejectHandler={rejectHandler}
          statusCall={statusCall}
        />
        <CallButton
          callHandler={callHandler}
          statusCall={statusCall}
          isConnect={isConnect}
        />
        {running && <Timer running={running} />}
      </form>
    </div>
  );
}

export default CallPage;
