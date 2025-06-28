import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-50 py-6 px-4 shadow-sm border-b border-blue-100 mb-10" >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700">Tabree</h2>
        <p className="mt-2 text-gray-600 text-sm">
          歌詞とコードを入力・保存・共有できるアプリ
        </p>
      </div>
    </header>
  );
};

export default Header;
