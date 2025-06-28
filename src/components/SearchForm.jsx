import React, { useState } from 'react';
import { Search } from 'lucide-react'; // 虫眼鏡アイコン

const SearchForm = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('検索ワード:', searchWord);
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full max-w-lg bg-white shadow-lg rounded-full border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition duration-200"
      >
        <input
          type="text"
          placeholder="曲名やアーティストを検索"
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 flex items-center justify-center"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
