export default function TodoItem({ item, onRemove, onToggle }) {
  return (
    <div className="list-item  flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg mb-2 border border-slate-200 hover:border-slate-300">

      <span
        className={
          "list-item-text inline" +
          (item.completed ? " line-through text-slate-400" : "")
        }
      >
        {item.text}
      </span>
      <button
        onClick={() => onRemove(item.tempId || item._id)}
        className="remove-btn "
        aria-label={`Remove todo: ${item.text}`}
      >
        ✕
      </button>
    </div>
  );
}
