import React, { useState } from 'react';
import { Search } from 'lucide-react'; // 虫眼鏡アイコン
import SearchResult from './SearchResult';

const SearchForm = () => {
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    // 仮のデータ（あとでAPIと連携）
    const dummyResults = [
      {
        id: 'uuiduuid',
        title: '小さな恋のうた',
        artist: 'MONGOL800',
        content:
          '[C]君が〜[G]好きだよ[C]君が〜[G]好きだよ[C]君が〜[G]好きだよ[C]君が〜[G]好きだよ',
      },
      {
        id: 'uuiduuid2',
        title: 'チェリー',
        artist: 'スピッツ',
        content: '[F]愛してるの[C]響きだけで〜',
      },
    ];

    if (searchWord === "") {
      alert("検索ワードを入力してください");
      return;
    }

    const filtered = dummyResults.filter(
      (song) =>
        song.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchWord.toLowerCase())
    );

    setSearchResults(filtered);
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
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

      {/* 検索結果はフォームの下に表示 */}
      <div className="w-full max-w-lg mt-6">
        <SearchResult results={searchResults} />
      </div>
    </div>
  );
};

export default SearchForm;
