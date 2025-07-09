import { useState } from 'react';

function AddGoalForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    deadline: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const newGoal = {
      ...form,
      id: Date.now().toString(),
      targetAmount: parseFloat(form.targetAmount),
      transactions: []
    };
    onAdd(newGoal);
    setForm({ name: '', targetAmount: '', deadline: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col">
          <input type="text" name="name" className="form-control" placeholder="Goal Name" required value={form.name} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="number" name="targetAmount" className="form-control" placeholder="Target Amount" required value={form.targetAmount} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="date" name="deadline" className="form-control" required value={form.deadline} onChange={handleChange} />
        </div>
        <div className="col">
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
    </form>
  );
}

export default AddGoalForm;