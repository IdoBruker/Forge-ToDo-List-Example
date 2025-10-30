import { v4 as uuidv4 } from "uuid";
import type { CreateTodoDto, TodoDto } from "../types/dtos/todo.dto";
import type { Todo } from "../types/entities/todo.entity";

export const toTodo = (todoDto: CreateTodoDto): Todo => {
  const now = new Date().toISOString();

  return {
    title: todoDto.title,
    priority: todoDto.priority,
    id: uuidv4(),
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
};

export const toTodoDto = (todo: Todo): TodoDto => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  priority: todo.priority,
  createdAt: todo.createdAt,
  updatedAt: todo.updatedAt,
});

export const toTodoDtoList = (todos: Todo[]): TodoDto[] => todos.map(toTodoDto);
