import { useEffect, useState } from 'react';
import AddBudgetForm from './AddBudgetForm';

function BudgetList({ transactions }) {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(stored);
  }, []);

  const addBudget = budget => {
    const updated = [budget, ...budgets];
    setBudgets(updated);
    localStorage.setItem('budgets', JSON.stringify(updated));
  };

  const deleteBudget = id => {
    const updated = budgets.filter(b => b.id !== id);
    setBudgets(updated);
    localStorage.setItem('budgets', JSON.stringify(updated));
  };

  const getSpent = (budget) =>
    transactions
      .filter(txn =>
        txn.category === budget.category &&
        txn.type === "expense" &&
        txn.date >= budget.startDate &&
        txn.date <= budget.endDate
      )
      .reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div>
      <h3>Budgets</h3>
      <AddBudgetForm onAdd={addBudget} />
      {budgets.map(budget => {
        const spent = getSpent(budget);
        const percent = Math.min(100, (spent / budget.amount) * 100);
        const month = new Date(budget.startDate).toLocaleString('default', { month: 'long' });
        const year = new Date(budget.startDate).getFullYear();
        return (
          <div key={budget.id} className="mb-3">
            <strong>{budget.category} - {month} {year}</strong>
            <div className="progress mb-1">
              <div
                className={`progress-bar ${percent >= 100 ? 'bg-danger' : 'bg-success'}`}
                style={{ width: `${percent}%` }}
              >
                {spent} / {budget.amount}
              </div>
            </div>
            {percent >= 100 && <div className="text-danger">Budget exceeded!</div>}
            <button className="btn btn-danger btn-sm" onClick={() => deleteBudget(budget.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default BudgetList;