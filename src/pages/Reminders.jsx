import React, { useState, useEffect } from "react";
import "./Reminders.css";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [form, setForm] = useState({ note: "", date: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(data);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...reminders, form];
    localStorage.setItem("reminders", JSON.stringify(updated));
    setReminders(updated);
    setForm({ note: "", date: "" });
  };

  const handleDelete = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    localStorage.setItem("reminders", JSON.stringify(updated));
    setReminders(updated);
  };

  return (
    <div className="reminders-container">
      <h2 className="page-title">Bill & Budget Reminders</h2>

      <form className="neu-card reminder-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Reminder Note"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Reminder</button>
      </form>

      <div className="reminder-list">
        <h3>Your Reminders</h3>
        {reminders.length === 0 ? (
          <p className="empty">No reminders added yet.</p>
        ) : (
          reminders.map((item, index) => (
            <div key={index} className="neu-card reminder-item">
              <div>
                <strong>{item.note}</strong><br />
                {item.date}
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

export default Reminders;
