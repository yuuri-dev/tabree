import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // フロントエンドから送られてきたデータを取得
      const { track_name, artist_name, data } = req.body;

      // Supabaseの'tabs'テーブルにデータを挿入し、挿入したデータを返す
      const { data: newTab, error } = await supabase
        .from('tabs')
        .insert([{ track_name, artist_name, data }])
        .select()
        .single();

      if (error) throw error;

      // 成功したら201 Createdステータスとデータを返す
      res.status(201).json(newTab);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // POST以外のメソッドは許可しない
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
