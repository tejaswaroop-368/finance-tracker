import { useState } from 'react';

function AddIncomeForm({ onAdd }) {
  const [form, setForm] = useState({
    date: '',
    source: '',
    category: '',
    amount: '',
    note: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    const newIncome = {
      ...form,
      id: Date.now().toString(),
      type: 'income',
      amount: parseFloat(form.amount)
    };

    // Get existing income from localStorage
    const prevIncome = JSON.parse(localStorage.getItem("income")) || [];

    // Add new income
    const updatedIncome = [...prevIncome, newIncome];

    // Save to localStorage
    localStorage.setItem("income", JSON.stringify(updatedIncome));

    // Dispatch custom event to update dashboard
    window.dispatchEvent(new Event("storageUpdate"));

    // Optional: call parent handler if needed
    onAdd && onAdd(newIncome);

    // Clear form
    setForm({ date: '', source: '', category: '', amount: '', note: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col">
          <input type="date" name="date" className="form-control" required value={form.date} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" name="source" className="form-control" placeholder="Source" required value={form.source} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" name="category" className="form-control" placeholder="Category" required value={form.category} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="number" name="amount" className="form-control" placeholder="Amount" required value={form.amount} onChange={handleChange} />
        </div>
        <div className="col">
          <input type="text" name="note" className="form-control" placeholder="Note" value={form.note} onChange={handleChange} />
        </div>
        <div className="col">
          <button className="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
    </form>
  );
}

export default AddIncomeForm;
