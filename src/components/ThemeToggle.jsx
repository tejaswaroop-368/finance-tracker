import { useState } from 'react';

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const handleToggle = () => {
    setDark(!dark);
    document.body.className = dark ? '' : 'bg-dark text-white';
  };

  return (
    <div className="form-check form-switch mb-3">
      <input
        className="form-check-input"
        type="checkbox"
        id="themeSwitch"
        checked={dark}
        onChange={handleToggle}
      />
      <label className="form-check-label" htmlFor="themeSwitch">
        {dark ? 'Dark Mode' : 'Light Mode'}
      </label>
    </div>
  );
}

export default ThemeToggle;