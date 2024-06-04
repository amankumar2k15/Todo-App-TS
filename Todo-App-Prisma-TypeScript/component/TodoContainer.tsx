"use client";

import React, { useEffect, useState } from "react";
import AddTodoInput from "./AddTodoInput";
import TaskContainer from "./TaskContainer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo } from "@/redux/TodoSlice";
import Loading from "./Loading";

const TodoContainer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const todos = useSelector((state: any) => state.data).todos;

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get("/api/todo");
      dispatch(setTodo(response.data.todos));
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  if (isLoading) return <Loading />;

  const completedTodos = todos.filter((item: any) => item.completed);
  const inCompletedTodos = todos.filter((item: any) => !item.completed);

  return (
    <div className="w-[583px] h-[758px] bg-[#1D1825] rounded-xl p-[50px] flex flex-col gap-10 overflow-y-auto">
      <AddTodoInput />
      <TaskContainer title="Todo to do -" data={inCompletedTodos} />
      <TaskContainer title="Done -" data={completedTodos} />
    </div>
  );
};

export default TodoContainer;
