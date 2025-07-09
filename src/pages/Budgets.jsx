import BudgetList from '../components/BudgetList';
import { useEffect, useState } from 'react';

function Budgets() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(stored);
  }, []);

  return (
    <div>
      <h2>Budgets</h2>
      <BudgetList transactions={transactions} />
    </div>
  );
}

export default Budgets;