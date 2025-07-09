import { useState } from 'react';

function CategoryManager() {
  const [categories, setCategories] = useState(['Food', 'Travel', 'Bills']);
  const [newCat, setNewCat] = useState('');

  const addCategory = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat('');
    }
  };

  return (
    <div>
      <h5>Manage Categories</h5>
      <ul>
        {categories.map(cat => <li key={cat}>{cat}</li>)}
      </ul>
      <input
        type="text"
        value={newCat}
        onChange={e => setNewCat(e.target.value)}
        placeholder="New category"
        className="form-control d-inline w-auto me-2"
      />
      <button className="btn btn-primary btn-sm" onClick={addCategory}>Add</button>
    </div>
  );
}

export default CategoryManager;