import { messageTypes, responseType } from '../../constants/constants';
import connectIcon from '../../../public/icons/connect.svg';
import disconnectIcon from '../../../public/icons/disconnect.svg';
import './Connect.css';

export default function Connect({ setIsConnect, isConnect }) {
  chrome.runtime.onMessage.addListener((msg) => {
    const { type, result } = msg;
    if (type === messageTypes.connect) {
      if (result === responseType.ok) {
        setIsConnect(true);
      }
      if (result === responseType.failed) {
        setIsConnect(false);
      }
    }
  });

  return (
    <div className="connect">
      <img
        src={isConnect ? connectIcon : disconnectIcon}
        alt="connect icon"
        width={20}
        height={20}
      />
    </div>
  );
}
