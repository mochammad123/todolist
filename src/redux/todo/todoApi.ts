import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "todos",
    }),
    getTodos: builder.query({
      query: ({ _start = 0, _limit = 12 }) =>
        `todos?_start=${_start}&_limit=${_limit}`,
    }),
    createTodo: builder.mutation({
      query: (data) => ({
        url: "todos",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useGetAllTodosQuery, useCreateTodoMutation } =
  todoApi;
