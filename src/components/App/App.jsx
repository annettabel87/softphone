import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import CallPage from '../CallPage/CallPage';
import HistoryPage from '../HistoryPage/HistoryPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import './App.css';
import { ROUTE } from '../../constants/constants';

function App() {
  return (
    <div>
      <Routes>
        <Route path={ROUTE.REGISTER} element={<Layout />}>
          <Route
            index
            element={<RegistrationPage setIsRegister={false} setError={() => {}} />}
          />
          <Route path={ROUTE.CALL} element={<CallPage />} />
          <Route path={ROUTE.HISTORY} element={<HistoryPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
