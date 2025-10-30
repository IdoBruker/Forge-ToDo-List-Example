import { useState } from "react";
import { Plus } from "lucide-react";
import type { TodoPriority } from "../../../types/todo";
import { Priority } from "../../../types/todo";
import { useTodos } from "../hooks/useTodosContext";

const AddTodoForm = () => {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TodoPriority>(Priority.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title.trim(), priority);
      setTitle("");
      setPriority(Priority.MEDIUM);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 min-w-xl">
      <div className="flex items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white px-3"
          placeholder="Add a new task..."
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        <button
          type="button"
          onClick={() => setPriority(Priority.LOW)}
          className={`px-3 py-1 text-sm rounded-full ${
            priority === Priority.LOW
              ? "bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
          }`}
        >
          Low
        </button>
        <button
          type="button"
          onClick={() => setPriority(Priority.MEDIUM)}
          className={`px-3 py-1 text-sm rounded-full ${
            priority === Priority.MEDIUM
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
          }`}
        >
          Medium
        </button>
        <button
          type="button"
          onClick={() => setPriority(Priority.HIGH)}
          className={`px-3 py-1 text-sm rounded-full ${
            priority === Priority.HIGH
              ? "bg-red-500 text-white"
              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
          }`}
        >
          High
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
