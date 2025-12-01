export default function NoteItem({ item, onRemove }) {
  return (
    <div className="list-item">
      <span className="list-item-text">📌 {item.text}</span>
      <button
        onClick={() => onRemove(item.tempId || item._id)}
        className="remove-btn"
        aria-label={`Remove note: ${item.text}`}
      >
        ✕
      </button>
    </div>
  );
}
