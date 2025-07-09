import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

function ExpensePieChart({ transactions }) {
  const expenses = transactions.filter(txn => txn.type === 'expense');
  const categories = [...new Set(expenses.map(txn => txn.category))];
  const data = {
    labels: categories,
    datasets: [{
      data: categories.map(cat =>
        expenses.filter(txn => txn.category === cat)
          .reduce((sum, txn) => sum + txn.amount, 0)
      ),
      backgroundColor: [
        '#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6f42c1', '#fd7e14'
      ]
    }]
  };

  return (
    <div>
      <h5>Expenses by Category</h5>
      <Pie data={data} />
    </div>
  );
}

export default ExpensePieChart;