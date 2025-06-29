import "@/styles/globals.css";
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* ★ 2. アプリの最上部にToasterコンポーネントを配置 */}
      <Toaster
        position="top-right" // ポップアップの表示位置を右上に指定
        toastOptions={{
          duration: 1500, // 表示時間を1.5秒に設定（1秒は少し短すぎるため）
        }}
      />
    </>
  );
}
