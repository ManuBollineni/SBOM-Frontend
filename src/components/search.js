import React, { useState } from 'react';
import './components.css';

const SearchComponent  = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value); // Pass value back to parent
    };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
    </div>
  );

}

export default SearchComponent;
