// components/AddSong.jsx
export default function AddSong() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎵 新しい曲の追加
      </h2>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            曲名
          </label>
          <input
            type="text"
            placeholder="例：小さな恋のうた"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            アーティスト名
          </label>
          <input
            type="text"
            placeholder="例：MONGOL800"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            歌詞・コード
          </label>
          <textarea
            rows={6}
            placeholder="例：[C]君が[D]代わり[E]に..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          追加する
        </button>
      </form>
    </div>
  );
}
