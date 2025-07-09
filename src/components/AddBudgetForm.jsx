import { useState } from 'react';

function AddBudgetForm({ onAdd }) {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    period: 'monthly',
    startDate: '',
    endDate: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const newBudget = {
      ...form,
      id: Date.now().toString(),
      amount: parseFloat(form.amount)
    };
    onAdd(newBudget);
    setForm({ category: '', amount: '', period: 'monthly', startDate: '', endDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col">
          <input type="text" name="category" className="form-control" placeholder="Category" required value={form.category} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="number" name="amount" className="form-control" placeholder="Amount" required value={form.amount} onChange={handleChange} />
        </div>
        <div className="col">
          <select name="period" className="form-control" value={form.period} onChange={handleChange}>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div className="col">
          <input type="date" name="startDate" className="form-control" required value={form.startDate} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="date" name="endDate" className="form-control" required value={form.endDate} onChange={handleChange} />
        </div>
        <div className="col">
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
    </form>
  );
}

export default AddBudgetForm;