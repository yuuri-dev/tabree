import React from 'react'

const Search = () => {
  return (
    <div>
      <form className="max-w-md mx-auto p-4 bg-white shadow rounded space-y-4">
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="a"
        />
      </form>
    </div>
  );
}

export default Search