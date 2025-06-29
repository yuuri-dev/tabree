import React from 'react';
import router from 'next/router';
import { Heart } from 'lucide-react';

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
      <span className="flex items-center text-pink-500">
        <Heart className="w-4 h-4 mr-1 fill-pink-500" />
        <span className="text-sm font-medium">{result.good}</span>
      </span>
    </div>
  );
};

export default ResultItem;
