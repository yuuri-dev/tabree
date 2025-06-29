from http.server import BaseHTTPRequestHandler
import json
import os
import google.generativeai as genai
from dotenv import load_dotenv
# --- デバッグ用のプリントを追加 ---
print("--- Vercel Server Log: predict.py is loaded ---")
# サーバー環境でNEXT_PUBLIC_GEMINI_API_KEYがセットされているか確認
key_exists = "NEXT_PUBLIC_GEMINI_API_KEY" in os.environ
print(f"NEXT_PUBLIC_GEMINI_API_KEY is set: {key_exists}")
if key_exists:
    # キーの一部を表示して、正しく読み込まれているか確認（全部表示しないように注意）
    print(f"Key starts with: {os.environ.get(
        'NEXT_PUBLIC_GEMINI_API_KEY')[:5]}...")
# --- デバッグここまで ---
# load_dotenv('.env.local')
genai.configure(api_key=os.environ.get("NEXT_PUBLIC_GEMINI_API_KEY"))


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        body = json.loads(post_data)
        current_text = body.get("current_text", "")

        prompt = f"""
        あなたは優秀な作詞作曲アシスタントです。
        以下の歌詞とコード譜の続きを、最も自然な形で予測して補完してください。
        形式は「[コード]歌詞」の形を厳密に守り、続きの1フレーズ程度を生成してください。

        入力された譜面:
        ---
        {current_text}
        ---
        予測される続き:"""

        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(
                {"predicted_text": response.text.strip()}).encode('utf-8'))
        except Exception as e:
            self.send_response(503, str(e))
            self.end_headers()
