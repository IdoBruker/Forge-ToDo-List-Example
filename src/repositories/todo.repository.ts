import storage from "@forge/kvs";
import type { Todo } from "../types/entities/todo.entity";

const TODOS_KEY = "todos";

export const getTodos = async (): Promise<Todo[]> => {
  const result = (await storage.get<Todo[]>(TODOS_KEY)) as Todo[] | undefined;
  return result ?? [];
};

export const getTodoById = async (id: string): Promise<Todo | undefined> => {
  const todos = await getTodos();
  return todos.find((todo) => todo.id === id);
};

export const createTodo = async (todo: Todo): Promise<Todo> => {
  const todos = await getTodos();
  await storage.set(TODOS_KEY, [todo, ...todos]);
  return todo;
};

export const updateTodo = async (todoToUpdate: Todo): Promise<Todo> => {
  const todos = await getTodos();
  const updatedTodos = todos.map((todo) =>
    todo.id === todoToUpdate.id ? todoToUpdate : todo
  );
  await storage.set(TODOS_KEY, updatedTodos);
  return todoToUpdate;
};

export const deleteTodo = async (id: string): Promise<void> => {
  const todos = await getTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  await storage.set(TODOS_KEY, updatedTodos);
};
