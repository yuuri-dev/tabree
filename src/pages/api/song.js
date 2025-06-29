// Supabaseクライアントをインポートします
// このパスはあなたのプロジェクト構成に合わせて調整してください
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  // POSTメソッド以外のリクエストは拒否します
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // try...catchでエラーハンドリングを行います
  try {
    // 1. フロントエンドから送信されたデータを取得します
    const { title, artist, content } = req.body;

    // 2. 入力データのバリデーション（簡易的）
    // titleとcontentがなければエラーを返します
    if (!title || !content) {
      res.status(400).json({ message: 'titleとcontentは必須項目です。' });
      return;
    }

    // 3. Supabaseの'tabs'テーブルにデータを挿入します
    // これが console.log の代わりとなる処理です
    const { data: newTabData, error } = await supabase
      .from('tabs') // 'tabs'という名前のテーブルを指定
      .insert([     // 配列形式で挿入するデータを指定
        {
          track_name: title,   // "title"を"track_name"カラムに
          artist_name: artist, // "artist"を"artist_name"カラムに
          data: content        // "content"を"data"カラムに
        },
      ])
      .select()  // 挿入したレコードを返却するよう指定
      .single(); // 結果を配列ではなく単一オブジェクトで取得

    // 4. データベース操作でエラーが発生した場合の処理
    if (error) {
      // エラーを投げると下のcatchブロックで処理されます
      throw error;
    }

    // 5. 成功した場合、作成されたデータと201ステータスを返します
    res.status(201).json(newTabData);

  } catch (error) {
    // 6. 予期せぬエラーが発生した場合の処理
    console.error('Supabaseへのデータ挿入時にエラーが発生しました:', error);
    res.status(500).json({ message: 'サーバー側でエラーが発生しました。' });
  }
}
