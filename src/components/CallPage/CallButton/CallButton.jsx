import { statusCallTypes } from '../../../constants/constants';
import PhoneButton from '../../PhoneButton/PhoneButton';
import './CallButton.css';

function CallButton({ callHandler, statusCall, isConnect }) {
  return (
    <div className="callButtonBlock">
      {statusCall === statusCallTypes.default && (
        <PhoneButton onClickHandler={callHandler} disabled={!isConnect} type="call" />
      )}
      {(statusCall === statusCallTypes.progress ||
        statusCall === statusCallTypes.connectingCall) && (
        <PhoneButton onClickHandler={callHandler} disabled={!isConnect} type="reject" />
      )}
    </div>
  );
}

export default CallButton;
