"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const SearchBar = ({ onEnterKeyPress }) => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onEnterKeyPress(searchValue);
      router.push('/');
      setSearchValue('');
    }
  };

  return (
    <div className="w-full flex pt-2 pl-5 pb-2">
      <div className="w-96 login rounded-lg overflow-hidden"> {/* Increased max-width */}
        <div className="flex items-center px-4 py-2">
          <input
            type="text"
            placeholder="Search tasks, residents..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-gray-100 input-text leading-tight focus:outline-none text-left w-full"
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
