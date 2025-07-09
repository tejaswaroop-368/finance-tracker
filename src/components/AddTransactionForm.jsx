import { useState } from 'react';

function AddTransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    date: '',
    type: 'expense',
    category: '',
    amount: '',
    note: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const newTxn = {
      ...form,
      id: Date.now().toString(),
      amount: parseFloat(form.amount),
      goalId: null,
      receiptUrl: null
    };
    onAdd(newTxn);
    setForm({ date: '', type: 'expense', category: '', amount: '', note: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col">
          <input type="date" name="date" className="form-control" required value={form.date} onChange={handleChange} />
        </div>
        <div className="col">
          <select name="type" className="form-control" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
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

export default AddTransactionForm;