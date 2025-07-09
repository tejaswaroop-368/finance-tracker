import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Fetch existing user if any
    const existingUser = JSON.parse(localStorage.getItem('user'));

    if (existingUser && existingUser.email === form.email) {
      setError('Email already exists. Please sign in.');
      return;
    }

    // Save new user to localStorage
    localStorage.setItem('user', JSON.stringify(form));
    localStorage.setItem('token', 'dummy-token'); // simulate login
    navigate('/');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" type="submit">Sign Up</button>
      </form>
      <div className="mt-2">
        Already have an account? <a href="/signin">Sign In</a>
      </div>
    </div>
  );
}

export default Signup;
