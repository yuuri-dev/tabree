import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SearchResult from './SearchResult';
import { supabase } from '../../lib/supabaseClient';

const SearchForm = () => {
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchWord.trim() === '') {
      alert('検索ワードを入力してください');
      return;
    }

    const { data, error } = await supabase
      .from('tab')
      .select('id, track_name, artist_name, data')
      .or(`track_name.ilike.%${searchWord}%,artist_name.ilike.%${searchWord}%`);

    if (error) {
      console.error('検索エラー:', error);
      alert('検索に失敗しました');
      return;
    }

    const formatted = data.map((item) => ({
      id: item.id,
      title: item.track_name,
      artist: item.artist_name,
      content: item.data,
    }));

    setSearchResults(formatted);
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

      <div className="w-full max-w-lg mt-6">
        <SearchResult results={searchResults} />
      </div>
    </div>
  );
};

export default SearchForm;
