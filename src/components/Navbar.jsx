import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg py-3 px-4" style={{ background: '#e0e0e0', boxShadow: 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-dark" to="/" style={{ fontSize: '1.5rem' }}>💰 Finance Tracker</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: '/', label: 'Dashboard' },
              { to: '/expenses', label: 'Expenses' },
              { to: '/income', label: 'Income' },
              { to: '/budgets', label: 'Budgets' },
              { to: '/reports', label: 'Reports' },
              { to: '/goals', label: 'Goals' },
              { to: '/reminders', label: 'Reminders' },
              { to: '/settings', label: 'Settings' }
            ].map((item, idx) => (
              <li className="nav-item mx-2" key={idx}>
                <Link className="nav-link text-dark fw-medium px-3 py-2 rounded" style={{ boxShadow: '2px 2px 5px #bebebe, -2px -2px 5px #ffffff' }} to={item.to}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
