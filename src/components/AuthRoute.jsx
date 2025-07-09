import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" /> : children;
}

export default AuthRoute;