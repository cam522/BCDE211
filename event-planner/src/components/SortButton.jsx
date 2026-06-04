export default function SortButton({ onClick, sortBy, currentSort }) {
  return (
    <button onClick={onClick} className={`sort-btn ${currentSort === sortBy ? 'active' : ''}`}>
      Sort by {sortBy}
    </button>
  );
}