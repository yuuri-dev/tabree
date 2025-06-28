import React from 'react';
import { Search } from 'lucide-react'; // 虫眼鏡アイコン

const SearchForm = () => {
  return (
    <div className="flex justify-center mt-8">
      <form className="flex items-center max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <input
          type="text"
          placeholder="曲名やアーティストを検索"
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 h-full"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
