import { useState } from 'react';
import './App.css';

function App() {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [server, setServer] = useState();

  const loginHandler = (e) => {
    e.preventDefault();
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
              onChange={(e) => setLogin(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setServer(e.target.value)}
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
    </div>
  );
}

export default App;
