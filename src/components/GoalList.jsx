import { useEffect, useState } from 'react';
import AddGoalForm from './AddGoalForm';

function GoalList({ transactions }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('goals')) || [];
    setGoals(stored);
  }, []);

  const addGoal = goal => {
    const updated = [goal, ...goals];
    setGoals(updated);
    localStorage.setItem('goals', JSON.stringify(updated));
  };

  const deleteGoal = id => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    localStorage.setItem('goals', JSON.stringify(updated));
  };

  const getProgress = (goal) =>
    transactions
      .filter(txn => goal.transactions.includes(txn.id))
      .reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div>
      <h3>Goals</h3>
      <AddGoalForm onAdd={addGoal} />
      {goals.map(goal => {
        const progress = getProgress(goal);
        const percent = Math.min(100, (progress / goal.targetAmount) * 100);
        return (
          <div key={goal.id} className="mb-3">
            <strong>{goal.name} (Target: {goal.targetAmount})</strong>
            <div className="progress mb-1">
              <div
                className={`progress-bar ${percent >= 100 ? 'bg-success' : 'bg-info'}`}
                style={{ width: `${percent}%` }}
              >
                {progress} / {goal.targetAmount}
              </div>
            </div>
            {percent >= 100 && <div className="text-success">Goal achieved!</div>}
            <button className="btn btn-danger btn-sm" onClick={() => deleteGoal(goal.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;