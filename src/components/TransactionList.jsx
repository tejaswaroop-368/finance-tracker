import { useEffect, useState } from 'react';
import AddTransactionForm from './AddTransactionForm';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(stored);
  }, []);

  const addTransaction = txn => {
    const updated = [txn, ...transactions];
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const deleteTransaction = id => {
    const updated = transactions.filter(txn => txn.id !== id);
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  return (
    <div>
      <h3>Transactions</h3>
      <AddTransactionForm onAdd={addTransaction} />
      <table className="table">
        <thead>
          <tr>
            <th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Note</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn.id}>
              <td>{txn.date}</td>
              <td>{txn.type}</td>
              <td>{txn.category}</td>
              <td>{txn.amount}</td>
              <td>{txn.note}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTransaction(txn.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;