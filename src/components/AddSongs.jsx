import { useState } from 'react';
import toast from 'react-hot-toast';

// components/AddSong.jsx
export default function AddSong() {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songContent, setSongContent] = useState("");
  // Gemini API使用時にローディング状態を管理するstateを追加
  const [isLoading, setIsLoading] = useState(false);
  // 保存処理中のローディング状態を追加
  const [isSaving, setIsSaving] = useState(false);

  const handleAddSong = async (e) => {
    e.preventDefault();

    if (!songName.trim() || !artistName.trim() || !songContent.trim()) {
      toast.error('曲名と歌詞・コードは必須項目です')
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch('/api/song', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: songName,
          artist: artistName,
          content: songContent,
        }),
      });

      const data = await res.json();

      console.log('サーバーからの返答:', data);
      // APIからの応答が成功でなかった場合
      if (!res.ok) {
        // res.json()でAPIからのエラーメッセージを取得
        alert('サーバーでエラーが発生しました')
      }

      // 成功した場合
      toast.success('タブ譜の保存に成功しました！')
      // 入力フォームをリセット
      setSongName('');
      setArtistName('');
      setSongContent('');

    } catch (error) {
      // エラーが発生した場合
      console.error("保存処理中にエラーが発生しました:", error);
      toast.error(error.message || '予期せぬエラーが発生しました。')
    } finally {
      // 成功しても失敗しても、ローディング状態を解除
      setIsSaving(false);
    }
  };

  const handleGemini = async (e) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ

    // テキストエリアが空の場合は何もしない
    if (!songContent.trim()) {
      toast.error('歌詞・コードを何か入力してください。')
      return;
    }

    setIsLoading(true); // ローディング開始

    try {
      // API(/api/predict)を呼び出す
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // predict.jsが要求する`current_text`というキーでデータを送る
        body: JSON.stringify({
          current_text: songContent,
        }),

      });

      // APIからの応答が成功しなかった場合はエラー
      if (!res.ok) {
        throw new Error('APIからの応答がありませんでした。');
      }

      const data = await res.json();
      const prediction = data.predicted_text;

      // 現在のテキストの末尾に、半角スペースを挟んで予測結果を追記する
      setSongContent(prevContent => prevContent + ' ' + prediction);

    } catch (error) {
      console.error("予測処理中にエラーが発生しました:", error);
      toast.error("予測の取得に失敗しました。");
    } finally {
      setIsLoading(false); // ローディング終了 (成功しても失敗しても実行)
    }
  };

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
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
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
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
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
            value={songContent}
            onChange={(e) => setSongContent(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
          text-white font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer"
          onClick={(e) => handleGemini(e)}
          disabled={isLoading} // ローディング中はボタンを無効化
        >{isLoading ? '予測中...' : 'Geminiで予測'}</button>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 
          text-white font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer"
          onClick={(e) => handleAddSong(e)}
        >
          {isSaving ? '保存中...' : '追加する'}
        </button>
      </form>
    </div>
  );
}
