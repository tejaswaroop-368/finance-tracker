import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === form.email && user.password === form.password) {
      localStorage.setItem('token', 'dummy-token');
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" required onChange={handleChange} />
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" type="submit">Sign In</button>
      </form>
      <div className="mt-2">
        Don't have an account? <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
}
export default Signin;