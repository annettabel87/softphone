import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE, messageTypes, responseType } from '../../constants/constants';
import './RegistrationPage.css';

function RegistrationPage() {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [server, setServer] = useState();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(false);

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
          setLogin(register.login);
          setPassword(register.password);
          setServer(register.server);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage(
      { type: messageTypes.register, login, password, server },
      (response) => {
        const { type, result } = response;
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
      }
    );
  };

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
          type="password"
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
