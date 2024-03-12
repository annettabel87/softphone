import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import CallPage from '../CallPage/CallPage';
import HistoryPage from '../HistoryPage/HistoryPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import {
  ROUTE,
  messageTypes,
  statusCallTypes,
  responseType,
} from '../../constants/constants';
import './App.css';

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const [statusCall, setStatusCall] = useState(statusCallTypes.default);
  const [incomingPhone, setIncomingPhone] = useState('');
  const [error, setError] = useState(false);
  const [running, setRunning] = useState(false);

  const navigate = useNavigate();

  chrome.runtime.onMessage.addListener((msg) => {
    const { type, phone, result } = msg;
    if (type === messageTypes.answer) {
      navigate(ROUTE.CALL);
      if (phone) {
        setIncomingPhone(phone);
        setStatusCall(statusCallTypes.incomingCall);
      }
      if (result === responseType.ok) {
        setStatusCall(statusCallTypes.connectingAnswer);
      }
      if (result === responseType.failed) {
        setError('rejected');
        setIncomingPhone('');
        setStatusCall(statusCallTypes.default);
        setTimeout(() => setError(''), 2000);
      }
    }

    if (type === messageTypes.call) {
      if (result === responseType.ok) {
        setStatusCall(statusCallTypes.connectingCall);
      }
      if (result === responseType.failed) {
        setError('rejected');
      }
      if (result === responseType.progress) {
        setStatusCall(statusCallTypes.progress);
      }
    }
    if (type === messageTypes.end) {
      setStatusCall('default');
      setIncomingPhone('');
    }

    if (type === messageTypes.timer) {
      if (result === responseType.stop) {
        setRunning(false);
      }
      if (result === responseType.start) {
        setRunning(true);
      }
    }
  });

  return (
    <div>
      <Routes>
        <Route
          path={ROUTE.REGISTER}
          element={
            <Layout setIsConnect={setIsConnect} isConnect={isConnect} running={running} />
          }
        >
          <Route
            index
            element={
              <RegistrationPage setIsRegister={setIsRegister} isRegister={isRegister} />
            }
          />
          <Route
            path={ROUTE.CALL}
            element={
              <CallPage
                isConnect={isConnect}
                setIsConnect={setIsConnect}
                setError={setError}
                statusCall={statusCall}
                error={error}
                incomingPhone={incomingPhone}
              />
            }
          />
          <Route path={ROUTE.HISTORY} element={<HistoryPage isConnect={isConnect} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
