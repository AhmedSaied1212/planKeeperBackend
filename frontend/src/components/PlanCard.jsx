import React, { useState } from "react";
import { apiClient } from "../services/api";

export default function PlanCard({ plan, onEdit, onDelete }) {
  const [todos, setTodos] = useState(plan.todos);
  const [updating, setUpdating] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleToggleTodo = async (todoId) => {
    if (updating) return;
    setUpdating(true);
    const newTodos = todos.map((t) =>
      t._id === todoId ? { ...t, completed: !t.completed } : t
    );
    setTodos(newTodos);
    try {
      await apiClient.updatePlan(plan._id, {
        ...plan,
        todos: newTodos.map(({ _id, text, completed }) => ({
          _id,
          text,
          completed,
        })),
        notes: plan.notes.map(({ _id, text }) => ({ _id, text })),
      });
    } catch (err) {
      // revert on error
      setTodos(todos);
      alert("Failed to update todo status");
    } finally {
      setUpdating(false);
    }
  };

  const notesPreview = plan.notes
    .slice(0, 2)
    .map((n) => n.text)
    .join(", ");

  return (
    <div className="plan-card group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {plan.title && (
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600">
              {plan.title}
            </h3>
          )}
          <p className="text-xs text-slate-500 font-medium">
            {formatDate(plan.creation_date)}
          </p>
        </div>
        <button
          onClick={() => onDelete(plan._id)}
          className="btn-danger ml-2"
          aria-label="Delete plan"
        >
          ✕
        </button>
      </div>

      {todos.length > 0 && (
        <div className="mb-4 pb-4 border-b border-slate-200">
          <p className="section-header">📋 Todos</p>
          <div className="space-y-2">
            {todos.slice(0, 2).map((t) => (
              <label
                key={t._id}
                className="flex items-center justify-between p-4 gap-2 bg-green-500/80  rounded-md cursor-pointer  "
              >
                <input
                  type="checkbox"
                  checked={!!t.completed}
                  disabled={updating}
                  onChange={() => handleToggleTodo(t._id)}
                  className="accent-green-600 w-4 h-4"
                />
                <span
                  className={
                    t.completed
                      ? "line-through text-slate-300 text-right"
                      : "text-white font-medium text-right"
                  }
                >
                  {t.text}
                </span>
              </label>
            ))}
            {todos.length > 2 && (
              <p className="text-xs text-slate-500 mt-1">
                +{todos.length - 2} more
              </p>
            )}
          </div>
        </div>
      )}

      {notesPreview && (
        <div className="mb-4">
          <p className="section-header">Notes</p>
          <p className="text-sm bg-blue-500 text-right p-4 rounded-md hover:shadow-xl transition-all duration-300 text-white  truncate font-medium">
            {notesPreview}
          </p>
          {plan.notes.length > 2 && (
            <p className="text-xs text-slate-500 mt-1">
              +{plan.notes.length - 2} more
            </p>
          )}
        </div>
      )}
    </div>
  );
}
