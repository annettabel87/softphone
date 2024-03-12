import { Outlet, NavLink } from 'react-router-dom';
import Connect from '../Connect/Connect';
import Timer from '../Timer/Timer';
import './Layout.css';

function LayoutComponent({ setIsConnect, isConnect, running }) {
  return (
    <div className="body">
      <header className="header">
        <div className="head">
          <Connect setIsConnect={setIsConnect} isConnect={isConnect} />
          {running && <Timer running={running} />}
        </div>

        <nav className="navigation">
          <NavLink to="/">Registration</NavLink>
          <NavLink to="/call">Call</NavLink>
          <NavLink to="/history">History</NavLink>
        </nav>
        <h1 className="title">SoftPhone</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutComponent;
