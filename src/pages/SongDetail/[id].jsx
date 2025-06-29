// pages/song-detail/[id].jsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Chord from '@/components/Chord';

export default function SongDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [song, setSong] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchSong = async () => {
      const { data, error } = await supabase
        .from('tab')
        .select('id, track_name, artist_name, data')
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-2">{song.track_name}</h1>
      <p className="text-gray-600 mb-4">アーティスト: {song.artist_name}</p>
      <div className="bg-gray-100 p-4 rounded leading-relaxed whitespace-pre-wrap">
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
    </div>
  );
}
