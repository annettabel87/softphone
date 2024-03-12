import { useNavigate } from 'react-router-dom';
import { call } from '../../../api/phone';
import phoneIcon from '../../../../public/icons/phone.svg';
import outgoingIcon from '../../../../public/icons/outgoing.svg';
import missedIcon from '../../../../public/icons/missed.svg';
import incomingIcon from '../../../../public/icons/incoming.svg';
import getFormattedDate from '../../../utils/getFormattedTimeDate';
import { ROUTE } from '../../../constants/constants';
import './HistoryCard.css';

function HistoryCard({ data, isConnect }) {
  const { start, phone, direction, callDuration } = data;
  const navigate = useNavigate();

  const callHandler = () => {
    call(phone);
    navigate(ROUTE.CALL);
  };

  return (
    <div className="historyCard">
      <div className="info">
        <div className="raw">
          <p>
            {direction === 'outgoing' && (
              <img src={outgoingIcon} alt="arrow" width={22} height={22} />
            )}
            {direction === 'canceled' && (
              <img src={missedIcon} alt="arrow" width={17} height={17} />
            )}
            {direction === 'incoming' && (
              <img src={incomingIcon} alt="arrow" width={22} height={22} />
            )}
          </p>
          <p>{phone}</p>
        </div>
        <div className="raw">
          <p className="smallText">{getFormattedDate(start)}</p>
          <p className="smallText">{Math.round(callDuration)} sec</p>
        </div>
      </div>
      <button
        type="button"
        onClick={callHandler}
        className="historyBtn"
        disabled={!isConnect}
      >
        <img src={phoneIcon} alt="phone" width={30} height={30} />
      </button>
    </div>
  );
}

export default HistoryCard;
