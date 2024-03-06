import { useState } from 'react';
import { messageTypes, responseType } from './constants/constants';
import './App.css';

function App() {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [server, setServer] = useState();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(false);

  const clearForm = () => {
    setLogin('');
    setPassword('');
    setServer('');
  };

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
    <div className="body">
      <h1 className="title">SoftPhone</h1>
      <div className="form-wrapper">
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
        </form>
      </div>
      {error && <p className="error">{error}</p>}
      {isRegister && <p className="result">Registration success</p>}
    </div>
  );
}

export default App;
