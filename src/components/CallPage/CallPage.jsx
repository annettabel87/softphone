import { useState } from 'react';
import { answer, call, endCall } from '../../api/phone';
import { statusCallTypes } from '../../constants/constants';
import AnswerButtons from './AnswerButtons/AnswerButtons';
import CallButton from './CallButton/CallButton';
import './CallPage.css';

function CallPage({ isConnect, setError, statusCall, error, incomingPhone }) {
  const [sipURI, setURI] = useState('');

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
        {statusCall === statusCallTypes.progress && (
          <p className="phoneBlock">calling...</p>
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
          sipURI={sipURI}
        />
      </form>
    </div>
  );
}

export default CallPage;
