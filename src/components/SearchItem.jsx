import React from 'react';
import Router from 'next/router';

const ResultItem = ({ result }) => {
  const handlePushDetail = (e) => {
    e.preventDefault();
    Router.push('/SongDetail');
  };
  return (
    <div
      className="p-4 border rounded-md shadow-sm bg-white hover:bg-gray-50 transition"
      onClick={(e) => handlePushDetail(e)}
    >
      <h3 className="text-lg font-semibold">{result.title}</h3>
      <p className="text-sm text-gray-600">{result.artist}</p>
    </div>
  );
};

export default ResultItem;
