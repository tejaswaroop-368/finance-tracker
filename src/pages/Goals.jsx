import React, { useState, useEffect } from "react";
import "./Goals.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    targetDate: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("goals")) || [];
    setGoals(data);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = { ...form };
    const updatedGoals = [...goals, newGoal];
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
    setForm({ title: "", targetAmount: "", targetDate: "" });
  };

  const handleDelete = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoals(updatedGoals);
  };

  return (
    <div className="goals-container">
      <h2 className="page-title">Set Financial Goals</h2>

      <form className="neu-card goal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Goal Title"
          required
        />
        <input
          type="number"
          name="targetAmount"
          value={form.targetAmount}
          onChange={handleChange}
          placeholder="Target Amount (₹)"
          required
        />
        <input
          type="date"
          name="targetDate"
          value={form.targetDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      <div className="goal-list">
        <h3>Your Goals</h3>
        {goals.length === 0 ? (
          <p className="empty">No goals added yet.</p>
        ) : (
          goals.map((goal, index) => (
            <div key={index} className="neu-card goal-item">
              <div>
                <strong>{goal.title}</strong><br />
                ₹{goal.targetAmount} by {goal.targetDate}
              </div>
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Goals;
