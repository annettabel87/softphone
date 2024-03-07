import { useState } from 'react';
import { messageTypes } from '../../constants/constants';

function CallPage() {
  const [sipURI, setURI] = useState('');
  const [error, setError] = useState(false);

  const callHandler = (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage({ type: messageTypes.call, uri: sipURI }, (response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <form onSubmit={callHandler} className="form">
        <div className="input-box">
          <input
            type="text"
            name="sipURI"
            id="sipURI"
            value={sipURI}
            onChange={(e) => setURI(e.target.value.trim())}
            className="input"
            required
          />
          <label htmlFor="sipURI" className="label">
            URI SIP:
          </label>
        </div>
        <button type="submit" className="button">
          Call
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CallPage;
