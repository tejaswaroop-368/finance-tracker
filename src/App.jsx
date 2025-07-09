import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Goals from './pages/Goals';
import Reminders from './pages/Reminders';
import Settings from './pages/Settings';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute'; // <-- import this
import './styles/neumorphism.css';


function App() {
  return (
    <Router>
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">Finance Tracker</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/expenses">Expenses</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/income">Income</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/budgets">Budgets</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/goals">Goals</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/reminders">Reminders</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/settings">Settings</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/signup" element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            } />
            <Route path="/signin" element={
              <AuthRoute>
                <Signin />
              </AuthRoute>
            } />
            <Route path="/*" element={
              <PrivateRoute>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/income" element={<Income />} />
                  <Route path="/budgets" element={<Budgets />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/reminders" element={<Reminders />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </>
    </Router>
  )
}

export default App