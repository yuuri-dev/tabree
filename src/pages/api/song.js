// Supabaseクライアントをインポートします
// このパスはあなたのプロジェクト構成に合わせて調整してください
import { supabase } from '../../../lib/supabaseClient';
/**
 * 文字列形式のタブ譜をJSONオブジェクトに変換するヘルパー関数
 * @param {string} contentString - 例: "風の強さが[C]ちょっと..."
 * @returns {Array<Object>} - 例: [{type: "lyric", value: "風の強さが"}, {type: "chord", value: "C"}, ...]
 */
function parseTabContent(contentString) {
  // コード部分にマッチする正規表現 (例: [C], [G/B])
  const regex = /(\[[^\]]+\])/;

  // 正規表現で文字列を歌詞とコードのパーツに分割
  const parts = contentString.split(regex);

  // 各パーツを {type, value} の形式に変換
  const components = parts
    .filter(part => part && part.trim() !== '') // 空の要素を除外
    .map(part => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return {
          type: 'chord',
          value: part.slice(1, -1) // 角括弧[]を削除
        };
      } else {
        return {
          type: 'lyric',
          value: part
        };
      }
    });
  return components;
}

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
    const parsedComponents = parseTabContent(content);
    const jsonDataToInsert = { components: parsedComponents };
    const { data: newTabData, error } = await supabase
      .from('tab') // 'tab'という名前のテーブルを指定
      .insert([     // 配列形式で挿入するデータを指定
        {
          track_name: title,   // "title"を"track_name"カラムに
          artist_name: artist, // "artist"を"artist_name"カラムに
          data: jsonDataToInsert,     // "content"を"data"カラムに
          good: 0 // 0(初期値)として"good"カラムに
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
