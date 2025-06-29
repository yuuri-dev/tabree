import Image from 'next/image';

export default function SongDetail({ components }) {
  return (
      <div className="whitespace-pre-wrap leading-relaxed text-lg">
          <p>title</p>
          <p>artist</p>

      {components.map((item, index) => {
        if (item.type === 'lyric') {
          return <span key={index}>{item.value}</span>;
        } else if (item.type === 'chord') {
          return (
            <span
              key={index}
              className="inline-flex flex-col items-center mx-1"
            >
              <span className="text-blue-600 font-semibold">
                [{item.value}]
              </span>
              <Image
                src={`/chords/${item.value}.png`} // 例: public/chords/Dm.png
                alt={`${item.value} コード`}
                width={40}
                height={60}
                onError={(e) => {
                  e.target.style.display = 'none'; // 表示失敗時は画像を消す
                }}
              />
            </span>
          );
        }
      })}
    </div>
  );
}
