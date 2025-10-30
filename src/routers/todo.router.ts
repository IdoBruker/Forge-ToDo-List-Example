import Resolver from "@forge/resolver";
import {
  createTodo as createTodoInService,
  deleteTodo as deleteTodoInService,
  getTodos as getTodosInService,
  updateTodo as updateTodoInService,
} from "../services/todo.service";
import type { CreateTodoDto, UpdateTodoDto } from "../types/dtos/todo.dto";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../types/dtos/baseDto";
import type { TodoDto } from "../types/dtos/todo.dto";

const todoHandlers = {
  getTodos: async () => {
    try {
      const todos = await getTodosInService();
      return createSuccessResponse(todos);
    } catch (e) {
      return createErrorResponse<TodoDto[]>((e as Error).message);
    }
  },
  createTodo: async (req: { payload: CreateTodoDto }) => {
    try {
      const todo = req.payload;
      const newTodo = await createTodoInService(todo);
      return createSuccessResponse(newTodo);
    } catch (e) {
      return createErrorResponse<CreateTodoDto>((e as Error).message);
    }
  },
  updateTodo: async (req: { payload: { id: string; todo: UpdateTodoDto } }) => {
    try {
      const { id, todo } = req.payload;
      const updatedTodo = await updateTodoInService(id, todo);
      return createSuccessResponse(updatedTodo);
    } catch (e) {
      return createErrorResponse<UpdateTodoDto>((e as Error).message);
    }
  },
  deleteTodo: async (req: { payload: { id: string } }) => {
    try {
      const { id } = req.payload;
      await deleteTodoInService(id);
      return createSuccessResponse(true);
    } catch (e) {
      return createErrorResponse<boolean>((e as Error).message);
    }
  },
};

export const registerTodoRoutes = (resolver: Resolver, baseUrl: string) => {
  resolver.define(`${baseUrl}/get-all`, todoHandlers.getTodos);
  resolver.define(`${baseUrl}/create`, todoHandlers.createTodo);
  resolver.define(`${baseUrl}/update`, todoHandlers.updateTodo);
  resolver.define(`${baseUrl}/delete`, todoHandlers.deleteTodo);
};
