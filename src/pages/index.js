import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import AddSong from '@/components/AddSongs';

export default function Home() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex border-b mb-4">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'search'
              ? 'border-b-2 border-blue-600 font-semibold'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('search')}
        >
          検索
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === 'add'
              ? 'border-b-2 border-blue-600 font-semibold'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('add')}
        >
          曲を追加
        </button>
      </div>

      {/* タブ切り替えの中身 */}
      {activeTab === 'search' && <SearchForm />}
      {activeTab === 'add' && <AddSong />}
    </div>
  );
}
