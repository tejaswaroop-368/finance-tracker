function SummaryCards({ transactions }) {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="row mb-4">
      <div className="col">
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h5 className="card-title">Total Income</h5>
            <p className="card-text">{totalIncome}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card text-white bg-danger mb-3">
          <div className="card-body">
            <h5 className="card-title">Total Expense</h5>
            <p className="card-text">{totalExpense}</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card text-white bg-primary mb-3">
          <div className="card-body">
            <h5 className="card-title">Balance</h5>
            <p className="card-text">{balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;