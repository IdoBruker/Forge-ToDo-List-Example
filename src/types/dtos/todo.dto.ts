import type { Todo } from "../entities/todo.entity";

export type TodoDto = Todo;

export type CreateTodoDto = Omit<
  Todo,
  "id" | "createdAt" | "updatedAt" | "completed"
>;

export type UpdateTodoDto = Partial<
  Omit<Todo, "id" | "createdAt" | "updatedAt">
>;
