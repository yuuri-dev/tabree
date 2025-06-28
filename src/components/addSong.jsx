// components/AddSong.jsx
export default function AddSong() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">新しい曲の追加</h2>
      <form className="space-y-2">
        <input
          type="text"
          placeholder="曲名"
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          追加する
        </button>
      </form>
    </div>
  );
}
