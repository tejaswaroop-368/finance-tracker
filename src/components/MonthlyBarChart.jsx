import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function MonthlyBarChart({ transactions }) {
  // Group by month
  const months = [...new Set(transactions.map(txn => txn.date?.slice(0, 7)))].sort();
  const incomeData = months.map(month =>
    transactions.filter(txn => txn.type === 'income' && txn.date?.startsWith(month))
      .reduce((sum, txn) => sum + txn.amount, 0)
  );
  const expenseData = months.map(month =>
    transactions.filter(txn => txn.type === 'expense' && txn.date?.startsWith(month))
      .reduce((sum, txn) => sum + txn.amount, 0)
  );

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        backgroundColor: '#28a745',
        data: incomeData
      },
      {
        label: 'Expense',
        backgroundColor: '#dc3545',
        data: expenseData
      }
    ]
  };

  return (
    <div>
      <h5>Monthly Income vs Expense</h5>
      <Bar data={data} />
    </div>
  );
}

export default MonthlyBarChart;