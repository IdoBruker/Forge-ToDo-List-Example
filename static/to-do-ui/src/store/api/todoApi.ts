import { baseApi } from "./baseApi";
import type {
  CreateTodoDto,
  TodoDto,
  UpdateTodoDto,
} from "./server-dtos/todo.dto";
import TAGS from "./tags";

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TodoDto[], void>({
      query: () => ({ url: "todos/get-all" }),
      providesTags: [TAGS.Todos],
    }),
    addTodo: builder.mutation<TodoDto, CreateTodoDto>({
      query: (todo) => ({ url: "todos/create", data: todo }),
      invalidatesTags: [TAGS.Todos],
    }),
    updateTodo: builder.mutation<TodoDto, { id: string; todo: UpdateTodoDto }>({
      query: ({ id, todo }) => ({ url: "todos/update", data: { id, todo } }),
      invalidatesTags: [TAGS.Todos],
    }),
    deleteTodo: builder.mutation<boolean, { id: string }>({
      query: (id) => ({ url: "todos/delete", data: id }),
      invalidatesTags: [TAGS.Todos],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
