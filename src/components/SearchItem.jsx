import React from 'react';
import router from 'next/router';

const ResultItem = ({ result }) => {
  const handlePushDetail = () => {
    router.push(`/SongDetail/${result.id}`);
  };
  return (
    <div
      className="p-4 border rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
      onClick={handlePushDetail}
    >
      <h3 className="text-lg font-semibold">{result.title}</h3>
      <p className="text-sm text-gray-600">{result.artist}</p>
    </div>
  );
};

export default ResultItem;
