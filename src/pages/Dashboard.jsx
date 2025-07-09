import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#FF5722", "#2196F3", "#FFC107", "#9C27B0", "#00BCD4"];

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [incomeBreakdown, setIncomeBreakdown] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);

  const loadData = () => {
    const txns = JSON.parse(localStorage.getItem("transactions")) || [];

    const incomeTxns = txns.filter(t => t.type === "income");
    const expenseTxns = txns.filter(t => t.type === "expense");

    const totalIncome = incomeTxns.reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = expenseTxns.reduce((sum, t) => sum + Number(t.amount), 0);

    const groupByCategory = (arr) => {
      const grouped = {};
      arr.forEach(txn => {
        if (!grouped[txn.category]) grouped[txn.category] = 0;
        grouped[txn.category] += Number(txn.amount);
      });
      return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    };

    setIncome(totalIncome);
    setExpenses(totalExpense);
    setIncomeBreakdown(groupByCategory(incomeTxns));
    setExpenseBreakdown(groupByCategory(expenseTxns));
  };

  useEffect(() => {
    loadData();
    window.addEventListener("storageUpdate", loadData);
    return () => window.removeEventListener("storageUpdate", loadData);
  }, []);

  const savings = income - expenses;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard Overview</h1>
      
      <div className="dashboard-summary">
        <div className="neu-card summary-card income-card">
          <h4>Total Income</h4>
          <p>₹{income.toLocaleString()}</p>
        </div>
        <div className="neu-card summary-card expense-card">
          <h4>Total Expenses</h4>
          <p>₹{expenses.toLocaleString()}</p>
        </div>
        <div className="neu-card summary-card savings-card">
          <h4>Total Savings</h4>
          <p>₹{savings.toLocaleString()}</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="neu-card chart-card">
          <h5>Income by Category</h5>
          {incomeBreakdown.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={incomeBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#4CAF50"
                  dataKey="value"
                  label
                >
                  {incomeBreakdown.map((entry, index) => (
                    <Cell key={`income-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="empty-chart">No income data</p>
          )}
        </div>

        <div className="neu-card chart-card">
          <h5>Expenses by Category</h5>
          {expenseBreakdown.length ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#FF5722"
                  dataKey="value"
                  label
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`expense-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="empty-chart">No expense data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
