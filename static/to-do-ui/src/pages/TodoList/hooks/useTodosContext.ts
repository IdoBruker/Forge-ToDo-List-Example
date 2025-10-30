import { createContext, useContext } from "react";
import type { Todo, TodoPriority } from "../../../types/todo";

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, priority: TodoPriority) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string, priority: TodoPriority) => void;
  isLoading: boolean;
  isError: boolean;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
