import { statusCallTypes } from '../../../constants/constants';
import phoneIcon from '../../../../public/icons/phone.svg';
import './CallButton.css';

function CallButton({ callHandler, statusCall, isConnect }) {
  return (
    <div className="callButtonBlock">
      {statusCall === statusCallTypes.default && (
        <button
          type="submit"
          className="callBtn"
          onClick={callHandler}
          disabled={!isConnect}
        >
          <img src={phoneIcon} alt="phone" width={30} height={30} />
        </button>
      )}
      {(statusCall === statusCallTypes.progress ||
        statusCall === statusCallTypes.connectingCall) && (
        <button type="button" className="rejectBtn" onClick={callHandler}>
          <img src={phoneIcon} alt="phone" width={30} height={30} />
        </button>
      )}
    </div>
  );
}

export default CallButton;
