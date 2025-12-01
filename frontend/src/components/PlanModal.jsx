import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";
import NoteItem from "./NoteItem";

export default function PlanModal({
  isOpen,
  onClose,
  onSave,
  initialPlan = null,
  loading = false,
}) {
  const [title, setTitle] = useState(initialPlan?.title || "");
  const [todoText, setTodoText] = useState("");
  const [noteText, setNoteText] = useState("");
  const [todos, setTodos] = useState(initialPlan?.todos || []);
  const [notes, setNotes] = useState(initialPlan?.notes || []);
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleAddTodo = () => {
    const trimmed = todoText.trim();
    if (trimmed && trimmed.length <= 150) {
      setTodos([
        ...todos,
        { tempId: Date.now(), text: trimmed, completed: false },
      ]);
      setTodoText("");
    }
  };

  const handleAddNote = () => {
    const trimmed = noteText.trim();
    if (trimmed && trimmed.length <= 300) {
      setNotes([...notes, { tempId: Date.now(), text: trimmed }]);
      setNoteText("");
    }
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter((t) => (t.tempId || t.id || t._id) !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        (t.tempId || t.id || t._id) === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const handleRemoveNote = (id) => {
    setNotes(notes.filter((n) => (n.tempId || n.id) !== id));
  };

  const handleSave = async () => {
    if (todos.length === 0 && notes.length === 0) {
      alert("Please add at least one todo or note");
      return;
    }
    const planData = {
      title: title.trim() || null,
      todos: todos.map((t) => ({ text: t.text, completed: !!t.completed })),
      notes: notes.map((n) => ({ text: n.text })),
    };
    await onSave(planData);
    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setTodoText("");
    setNoteText("");
    setTodos([]);
    setNotes([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="modal-content"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-3xl font-bold mb-6 text-slate-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          ✨ Create New Plan
        </h2>

        <input
          ref={firstInputRef}
          type="text"
          placeholder="Plan title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value.slice(0, 100))}
          className="input-field mb-6"
          maxLength="100"
          aria-label="Plan title"
        />

        <div className="mb-6">
          <label className="section-header">📋 Add Todos</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add a todo and press Enter or Add"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value.slice(0, 150))}
              onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
              className="input-field flex-1"
              aria-label="Todo input"
              maxLength="150"
            />
            <button
              onClick={handleAddTodo}
              className="btn-primary px-4"
              aria-label="Add todo"
            >
              Add
            </button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {todos.map((todo) => (
              <TodoItem
                key={todo.tempId || todo._id}
                item={todo}
                onRemove={handleRemoveTodo}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="section-header">📝 Add Notes</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add a note and press Enter or Add"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value.slice(0, 300))}
              onKeyPress={(e) => e.key === "Enter" && handleAddNote()}
              className="input-field flex-1"
              aria-label="Note input"
              maxLength="300"
            />
            <button
              onClick={handleAddNote}
              className="btn-primary px-4"
              aria-label="Add note"
            >
              Add
            </button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {notes.map((note) => (
              <NoteItem
                key={note.tempId || note._id}
                item={note}
                onRemove={handleRemoveNote}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="btn-secondary flex-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || (todos.length === 0 && notes.length === 0)}
          >
            {loading ? "Creating..." : "Create Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
