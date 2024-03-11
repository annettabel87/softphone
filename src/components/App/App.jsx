import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import CallPage from '../CallPage/CallPage';
import HistoryPage from '../HistoryPage/HistoryPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import { ROUTE } from '../../constants/constants';
import './App.css';

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [isConnect, setIsConnect] = useState(false);

  return (
    <div>
      <Routes>
        <Route
          path={ROUTE.REGISTER}
          element={<Layout setIsConnect={setIsConnect} isConnect={isConnect} />}
        >
          <Route
            index
            element={
              <RegistrationPage setIsRegister={setIsRegister} isRegister={isRegister} />
            }
          />
          <Route path={ROUTE.CALL} element={<CallPage isConnect={isConnect} />} />
          <Route path={ROUTE.HISTORY} element={<HistoryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
