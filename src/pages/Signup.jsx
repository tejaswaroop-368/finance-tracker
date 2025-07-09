import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(form));
    localStorage.setItem('token', 'dummy-token');
    navigate('/');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" required onChange={handleChange} />
        <input className="form-control mb-2" name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button className="btn btn-primary w-100" type="submit">Sign Up</button>
      </form>
      <div className="mt-2">
        Already have an account? <a href="/signin">Sign In</a>
      </div>
    </div>
  );
}
export default Signup;