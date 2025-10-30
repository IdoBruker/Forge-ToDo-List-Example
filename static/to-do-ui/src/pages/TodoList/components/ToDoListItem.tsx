import { useState, memo } from "react";
import type { Todo } from "../../../types/todo";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useTodos } from "../hooks/useTodosContext";

interface ToDoListItemProps {
  todo: Todo;
}

const priorityClasses = {
  low: "border-green-500",
  medium: "border-yellow-500",
  high: "border-red-500",
};

const ToDoListItem: React.FC<ToDoListItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState(todo.priority);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, title, priority);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setPriority(todo.priority);
    setIsEditing(false);
  };

  return (
    <li
      className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 ${
        priorityClasses[todo.priority]
      } transition-all duration-300 ${
        todo.completed ? "opacity-50 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700"
        />
        {isEditing ? (
          <div className="flex flex-col ml-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm text-gray-900 dark:text-white"
              autoFocus
            />
            <div className="flex space-x-2 mt-2">
              <button
                type="button"
                onClick={() => setPriority("low")}
                className={`px-2 py-1 text-xs rounded-full ${
                  priority === "low"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                Low
              </button>
              <button
                type="button"
                onClick={() => setPriority("medium")}
                className={`px-2 py-1 text-xs rounded-full ${
                  priority === "medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority("high")}
                className={`px-2 py-1 text-xs rounded-full ${
                  priority === "high"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                High
              </button>
            </div>
          </div>
        ) : (
          <span
            className={`ml-3 text-lg ${
              todo.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="p-1 text-gray-500 hover:text-green-600"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-gray-500 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-blue-600"
            >
              <Pencil className="h-5 w-5" />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default memo(ToDoListItem);
