import { useState } from 'react';
import { Heart } from 'lucide-react'; // ハートアイコン
import { supabase } from '../../lib/supabaseClient';

const LikeButton = ({ initialCount = 0,songId }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleLike = async() => {
    const newLiked = !liked;
    const newCount = count + (newLiked ? 1 : -1);

    setLiked(newLiked);
    setCount(newCount);

    const { error } = await supabase
      .from('tab')
      .update({ good: newCount })
      .eq('id', songId);

    if (error) {
      console.error('更新失敗:', error.message);
      setLiked(!newLiked);
      setCount(count);
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
