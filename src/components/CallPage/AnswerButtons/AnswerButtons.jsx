import { statusCallTypes } from '../../../constants/constants';
import PhoneButton from '../../PhoneButton/PhoneButton';
import './AnswerButtons.css';

function AnswerButtons({ answerHandler, rejectHandler, statusCall }) {
  return (
    <div className="answerBtnBlock">
      {statusCall === statusCallTypes.incomingCall && (
        <>
          <PhoneButton onClickHandler={answerHandler} disabled={false} type="call" />
          <PhoneButton onClickHandler={rejectHandler} disabled={false} type="reject" />
        </>
      )}
      {statusCall === statusCallTypes.connectingAnswer && (
        <PhoneButton onClickHandler={rejectHandler} disabled={false} type="reject" />
      )}
    </div>
  );
}

export default AnswerButtons;
