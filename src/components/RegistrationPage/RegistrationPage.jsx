import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE, messageTypes, responseType } from '../../constants/constants';
import { registration } from '../../api/phone';
import eyeIcon from '../../../public/icons/eye.svg';
import './RegistrationPage.css';

function RegistrationPage({ setIsRegister, isRegister }) {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [server, setServer] = useState();
  const [error, setError] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const clearForm = () => {
    setLogin('');
    setPassword('');
    setServer('');
  };

  useEffect(() => {
    chrome.storage.local
      .get(['register'])
      .then(({ register }) => {
        if (register) {
          const data = JSON.parse(register);
          setLogin(data.login);
          setPassword(data.password);
          setServer(data.server);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();
    registration(login, password, server);
  };

  const toggleShowingPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  chrome.runtime.onMessage.addListener((msg) => {
    const { type, result } = msg;
    if (type === messageTypes.register) {
      if (result === responseType.ok) {
        setIsRegister(true);
        clearForm();
        setTimeout(() => navigate(ROUTE.CALL), 2000);
      }
      if (result === responseType.failed) {
        setIsRegister(false);
        setError(`Failed registration. Try again!`);
        setTimeout(() => setError(''), 2000);
      }
    }
  });

  return (
    <form onSubmit={loginHandler} className="form">
      <div className="input-box">
        <input
          type="text"
          name="login"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value.trim())}
          className="input"
          required
        />
        <label htmlFor="login" className="label">
          Login:{' '}
        </label>
      </div>
      <div className="input-box">
        <input
          type={isShowPassword ? 'text' : 'password'}
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          className="input"
          required
        />
        <label htmlFor="password" className="label">
          Password:
        </label>
        <button type="button" className="showBtn" onClick={toggleShowingPassword}>
          <img src={eyeIcon} alt="eye" width={20} height={20} />
        </button>
      </div>
      <div className="input-box">
        <input
          type="server"
          name="server"
          id="server"
          value={server}
          onChange={(e) => setServer(e.target.value.trim())}
          className="input"
          required
        />
        <label htmlFor="server" className="label">
          Server:
        </label>
      </div>
      <button type="submit" className="button">
        Registration
      </button>
      {error && <p className="error">{error}</p>}
      {isRegister && <p className="result">Registration success</p>}
    </form>
  );
}

export default RegistrationPage;
