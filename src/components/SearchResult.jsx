import React from 'react';
import ResultItem from './SearchItem';


const SearchResult = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">検索結果がありません</p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {results.map((result, index) => (
        <ResultItem key={index} result={result} />
      ))}
    </div>
  );
};

export default SearchResult;
