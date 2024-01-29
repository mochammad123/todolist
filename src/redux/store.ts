import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./todo/todoApi";
import { userApi } from "./user/userApi";

const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware, userApi.middleware),
});

export default store;
