import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import todoSlice from "./TodoSlice";

const store = configureStore({
  reducer: {
    data: todoSlice,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
