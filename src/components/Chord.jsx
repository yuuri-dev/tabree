const Chord = ({ chord }) => (
  <span className="text-blue-600 font-semibold mr-1">
    [{chord}]
    <img
      src={`/chords/${chord}.png`}
      alt={chord}
      className="inline w-6 h-6 ml-1 align-middle"
    />
  </span>
);

export default Chord;