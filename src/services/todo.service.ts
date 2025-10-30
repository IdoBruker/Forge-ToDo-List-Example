import {
  createTodo as createTodoInDb,
  deleteTodo as deleteTodoInDb,
  getTodoById,
  getTodos as getTodosInDb,
  updateTodo as updateTodoInDb,
} from "../repositories/todo.repository";
import type { CreateTodoDto, UpdateTodoDto } from "../types/dtos/todo.dto";
import { toTodo, toTodoDto, toTodoDtoList } from "../mappers/todo.mapper";

export const getTodos = async () => {
  const todos = await getTodosInDb();
  return toTodoDtoList(todos);
};

export const createTodo = async (createTodoDto: CreateTodoDto) => {
  const todo = toTodo(createTodoDto);
  const newTodo = await createTodoInDb(todo);
  return toTodoDto(newTodo);
};

export const updateTodo = async (id: string, todoDto: UpdateTodoDto) => {
  const originalTodo = await getTodoById(id);

  if (!originalTodo) {
    throw new Error("Todo not found");
  }

  const todoToUpdate = {
    ...originalTodo,
    ...todoDto,
    updatedAt: new Date().toISOString(),
  };

  const updatedTodo = await updateTodoInDb(todoToUpdate);
  return toTodoDto(updatedTodo);
};

export const deleteTodo = (id: string) => deleteTodoInDb(id);
