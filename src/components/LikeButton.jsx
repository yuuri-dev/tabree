import { useState } from 'react';
import { Heart } from 'lucide-react'; // ハートアイコン
import { supabase } from '../../lib/supabaseClient';

const LikeButton = ({ initialCount = 0, songId }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);

    const { data, error: fetchError } = await supabase
      .from('tab')
      .select('good')
      .eq('id', songId)
      .single();

    if (fetchError) {
      console.error('取得失敗:', fetchError.message);
      setLiked(!newLiked);
      return;
    }

    const newCount = (data.good || 0) + (newLiked ? 1 : -1);
    setCount(newCount);

    const { error } = await supabase
      .from('tab')
      .update({ good: newCount })
      .eq('id', songId);

    if (error) {
      console.error('更新失敗:', error.message);
      setLiked(!newLiked);
      setCount(data.good);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center space-x-1 text-red-500"
    >
      <Heart fill={liked ? 'currentColor' : 'none'} />
      <span>{count}</span>
    </button>
  );
};

export default LikeButton;
