import phoneIcon from '../../../public/icons/phone.svg';
import './PhoneButton.css';

export default function PhoneButton({ onClickHandler, type, disabled }) {
  return (
    <button type="button" className={type} onClick={onClickHandler} disabled={disabled}>
      <img src={phoneIcon} alt="phone" width={30} height={30} />
    </button>
  );
}
