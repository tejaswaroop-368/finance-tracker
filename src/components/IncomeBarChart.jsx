import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function IncomeBarChart({ incomes }) {
  // Group by month
  const months = [...new Set(incomes.map(txn => txn.date?.slice(0, 7)))].sort();
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        backgroundColor: '#28a745',
        data: months.map(month =>
          incomes.filter(txn => txn.date?.startsWith(month))
            .reduce((sum, txn) => sum + txn.amount, 0)
        )
      }
    ]
  };

  return (
    <div>
      <h5>Monthly Income</h5>
      <Bar data={data} />
    </div>
  );
}

export default IncomeBarChart;

localStorage.removeItem('transactions');