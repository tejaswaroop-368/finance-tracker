import { useState } from 'react';

function IncomeList({ incomes, onDelete, onEdit }) {
  const [search, setSearch] = useState('');

  const filtered = incomes.filter(
    inc =>
      inc.source.toLowerCase().includes(search.toLowerCase()) ||
      inc.category.toLowerCase().includes(search.toLowerCase()) ||
      inc.note.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        className="form-control mb-2"
        placeholder="Search income..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Date</th><th>Source</th><th>Category</th><th>Amount</th><th>Note</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No income records found.</td>
            </tr>
          ) : (
            filtered.map(inc => (
              <tr key={inc.id}>
                <td>{inc.date}</td>
                <td>{inc.source}</td>
                <td>{inc.category}</td>
                <td>{inc.amount}</td>
                <td>{inc.note}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(inc.id)}>Delete</button>
                  {/* Optionally add edit button here */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default IncomeList;