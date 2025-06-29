// pages/song-detail/[id].jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Chord from '@/components/Chord';
import Link from 'next/link';
import LikeButton from '@/components/LikeButton';

export default function SongDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [song, setSong] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchSong = async () => {
      const { data, error } = await supabase
        .from('tab')
        .select('id, track_name, artist_name, data, good')
        .eq('id', id)
        .single();

      if (error) {
        console.error('取得エラー:', error);
      } else {
        setSong(data);
      }
    };

    fetchSong();
    console.log(song);
  }, [id]);

  if (!song) return <p className="text-center mt-10">読み込み中...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-12">
      <div className="flex justify-end mt-4">
        <LikeButton initialCount={song.good || 0} songId={song.id} />
      </div>
      <h1 className="text-3xl font-extrabold mb-4 text-gray-900">
        {song.track_name}
      </h1>
      <p className="text-gray-700 mb-6 text-lg">
        アーティスト名:{' '}
        <span className="font-semibold">{song.artist_name}</span>
      </p>

      <div className="bg-gray-50 p-6 rounded-lg leading-relaxed whitespace-pre-wrap text-base text-gray-800 border border-gray-200">
        {song.data.components.map((item, index) =>
          item.type === 'chord' ? (
            <Chord key={index} chord={item.value} />
          ) : (
            <span key={index} className="text-black">
              {item.value}
            </span>
          )
        )}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
