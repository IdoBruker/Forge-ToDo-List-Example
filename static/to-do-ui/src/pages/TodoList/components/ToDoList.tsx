import { PartyPopper } from "lucide-react";
import ToDoListItem from "./ToDoListItem";
import { useTodos } from "../hooks/useTodosContext";

const ToDoList = () => {
  const { todos, isLoading, isError } = useTodos();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500">Error fetching todos.</div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="text-center text-gray-500 flex flex-col items-center">
          <PartyPopper className="w-16 h-16 mb-4 text-gray-400" />
          <p className="text-xl font-semibold">Woohoo! All clear.</p>
          <p>Ready to add a new adventure?</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <ToDoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default ToDoList;
