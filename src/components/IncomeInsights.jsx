function IncomeInsights({ incomes }) {
  if (!incomes.length) return (
    <div className="mb-4">
      <h5>Income Insights</h5>
      <p>No income data yet.</p>
    </div>
  );

  // Filter out incomes with invalid or missing amount
  const validIncomes = incomes.filter(i => typeof i.amount === 'number' && !isNaN(i.amount));
  if (!validIncomes.length) return (
    <div className="mb-4">
      <h5>Income Insights</h5>
      <p>No valid income data.</p>
    </div>
  );

  const total = validIncomes.reduce((sum, i) => sum + i.amount, 0);
  const avg = (total / validIncomes.length).toFixed(2);
  const max = Math.max(...validIncomes.map(i => i.amount));
  const min = Math.min(...validIncomes.map(i => i.amount));
  const highest = validIncomes.find(i => i.amount === max);
  const lowest = validIncomes.find(i => i.amount === min);

  return (
    <div className="mb-4">
      <h5>Income Insights</h5>
      <ul>
        <li>Total Income: {total}</li>
        <li>Average Income: {avg}</li>
        <li>Highest Income: {highest?.source ?? '-'} ({highest?.amount ?? '-'})</li>
        <li>Lowest Income: {lowest?.source ?? '-'} ({lowest?.amount ?? '-'})</li>
      </ul>
    </div>
  );
}

export default IncomeInsights;