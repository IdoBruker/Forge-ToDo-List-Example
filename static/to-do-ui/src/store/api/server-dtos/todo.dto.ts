import type { TodoPriority } from "../../../types/todo";

export interface TodoDto {
  id: string;
  title: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  updatedAt: string;
}

export type CreateTodoDto = Pick<TodoDto, "title" | "priority">;

export type UpdateTodoDto = Partial<
  Pick<TodoDto, "title" | "completed" | "priority">
>;
