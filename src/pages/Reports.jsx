import React, { useEffect, useState } from "react";
import "./Reports.css";

const Reports = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedIncome = JSON.parse(localStorage.getItem("income")) || [];
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setIncome(storedIncome);
    setExpenses(storedExpenses);
  }, []);

  const totalIncome = income.reduce((acc, item) => acc + parseFloat(item.amount), 0);
  const totalExpenses = expenses.reduce((acc, item) => acc + parseFloat(item.amount), 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="reports-container">
      <h2 className="page-title">Financial Reports</h2>

      <div className="report-summary">
        <div className="neu-card summary-card">
          <h3>Total Income</h3>
          <p>₹{totalIncome.toFixed(2)}</p>
        </div>
        <div className="neu-card summary-card">
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="neu-card summary-card balance">
          <h3>Balance</h3>
          <p>₹{balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="report-section">
        <div className="neu-card data-table">
          <h3>Income Records</h3>
          {income.length === 0 ? (
            <p className="empty">No income records found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Amount (₹)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {income.map((item, index) => (
                  <tr key={index}>
                    <td>{item.source}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="neu-card data-table">
          <h3>Expense Records</h3>
          {expenses.length === 0 ? (
            <p className="empty">No expense records found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount (₹)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
