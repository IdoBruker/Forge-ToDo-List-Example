import { useCallback, useMemo } from "react";
import type { Todo, TodoPriority } from "../../types/todo";
import { TodoContext } from "./hooks/useTodosContext";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../store/api/todoApi";
import type { TodoDto } from "../../store/api/server-dtos/todo.dto";

const toTodo = (dto: TodoDto): Todo => ({
  id: dto.id,
  title: dto.title,
  completed: dto.completed,
  priority: dto.priority,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: todosDto, isFetching, isError } = useGetTodosQuery();
  const [addTodoMutation, { isLoading: isAdding }] = useAddTodoMutation();
  const [updateTodoMutation, { isLoading: isUpdating }] =
    useUpdateTodoMutation();
  const [deleteTodoMutation, { isLoading: isDeleting }] =
    useDeleteTodoMutation();

  const isLoading = isFetching || isAdding || isUpdating || isDeleting;

  const todos = useMemo(() => (todosDto ?? []).map(toTodo), [todosDto]);

  const addTodo = useCallback(
    (title: string, priority: TodoPriority) => {
      addTodoMutation({ title, priority });
    },
    [addTodoMutation]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        updateTodoMutation({ id, todo: { completed: !todo.completed } });
      }
    },
    [todos, updateTodoMutation]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      deleteTodoMutation({ id });
    },
    [deleteTodoMutation]
  );

  const editTodo = useCallback(
    (id: string, title: string, priority: TodoPriority) => {
      updateTodoMutation({ id, todo: { title, priority } });
    },
    [updateTodoMutation]
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        isLoading,
        isError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
