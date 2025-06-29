const Chord = ({ chord }) => (
  <span className="text-blue-700 font-mono text-lg font-bold mr-2 inline-flex items-center">
    <img
      src={`/chords/${chord}.png`}
      alt={chord}
      className="w-20 h-20 ml-2 align-middle border border-gray-300 rounded shadow-sm"
    />
  </span>
);

export default Chord;
