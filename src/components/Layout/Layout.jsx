import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';

function LayoutComponent() {
  return (
    <div className="body">
      <header className="header">
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
