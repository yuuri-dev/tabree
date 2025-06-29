// components/Ranking.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const Ranking = () => {
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(0); // ページ番号
  const [hasMore, setHasMore] = useState(true);

  const fetchRanking = async (pageNumber) => {
    const pageSize = 10;
    const from = pageNumber * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from('tab')
      .select('id, track_name, artist_name, good')
      .order('good', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('ランキング取得失敗:', error.message);
      return;
    }

    if (data.length < pageSize) {
      setHasMore(false); // 追加データがない
    }

    setSongs((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    fetchRanking(0); // 初回読み込み
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchRanking(nextPage);
    setPage(nextPage);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        人気曲ランキング
      </h2>
      <ul className="divide-y divide-gray-200">
        {songs.map((song, index) => (
          <li
            key={song.id}
            className="py-4 px-3 flex justify-between items-center"
          >
            <Link href={`/SongDetail/${song.id}`}>
              <div>
                <p className="font-semibold text-lg">
                  {index + 1}. {song.track_name}
                </p>
                <p className="text-sm text-gray-500">{song.artist_name}</p>
              </div>
            </Link>
            <span className="flex items-center text-pink-500">
              <Heart className="w-4 h-4 mr-1 fill-pink-500" />
              <span className="text-sm font-medium">{song.good}</span>
            </span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            もっと見る
          </button>
        </div>
      )}
    </div>
  );
};

export default Ranking;