import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TodoStateType = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<any[]>) => {
      state.todos = action.payload;
    },
    addTodo(state: TodoStateType, action: PayloadAction<any>) {
      state.todos.push(action.payload);
    },
    deleteTodo(state: TodoStateType, action: PayloadAction<any>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, setTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;

type TodoStateType = {
  todos: any[];
};
