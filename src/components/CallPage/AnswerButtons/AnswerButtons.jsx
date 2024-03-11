import { statusCallTypes } from '../../../constants/constants';
import './AnswerButtons.css';

function AnswerButtons({ answerHandler, rejectHandler, statusCall }) {
  return (
    <div className="answerBtnBlock">
      {statusCall === statusCallTypes.incomingCall && (
        <>
          <button type="button" className="answerButton" onClick={answerHandler}>
            Answer
          </button>
          <button type="button" className="rejectButton" onClick={rejectHandler}>
            Reject
          </button>
        </>
      )}
      {statusCall === statusCallTypes.connectingAnswer && (
        <button type="button" className="rejectButton" onClick={rejectHandler}>
          Reject
        </button>
      )}
    </div>
  );
}

export default AnswerButtons;
