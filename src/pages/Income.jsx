import React, { useState, useEffect } from "react";
import "./Income.css";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions")) || [];
    const incomeData = data.filter(item => item.type === "income");
    setIncomes(incomeData);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncome = { ...form, type: "income" };
    const data = JSON.parse(localStorage.getItem("transactions")) || [];
    data.push(newIncome);
    localStorage.setItem("transactions", JSON.stringify(data));
    setIncomes([...incomes, newIncome]);
    setForm({ title: "", amount: "", category: "", date: "" });

    // Trigger update for other components
    window.dispatchEvent(new Event("storageUpdate"));
  };

  const handleDelete = (index) => {
    const data = JSON.parse(localStorage.getItem("transactions")) || [];
    const updated = data.filter((_, i) => i !== index || data[i].type !== "income");
    localStorage.setItem("transactions", JSON.stringify(updated));
    setIncomes(updated.filter(i => i.type === "income"));

    window.dispatchEvent(new Event("storageUpdate"));
  };

  return (
    <div className="income-container">
      <h2 className="page-title">Add Income</h2>

      <form className="neu-card income-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Income</button>
      </form>

      <div className="income-list">
        <h3>Income History</h3>
        {incomes.length === 0 ? (
          <p className="empty">No income entries yet.</p>
        ) : (
          incomes.map((item, index) => (
            <div key={index} className="neu-card income-item">
              <div>
                <strong>{item.title}</strong> <br />
                ₹{item.amount} - {item.category} <br />
                <small>{item.date}</small>
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

export default Income;
