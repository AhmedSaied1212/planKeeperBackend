export default function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="floating-btn"
      aria-label="Create new plan"
    >
      +
    </button>
  );
}
