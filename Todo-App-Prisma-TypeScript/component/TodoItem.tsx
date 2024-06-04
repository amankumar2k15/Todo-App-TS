"use client";

import React, { FormEvent, useRef, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { LuTrash } from "react-icons/lu";
import { MdOutlineModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "@/redux/TodoSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { CiLocationArrow1 } from "react-icons/ci";

const TodoItem = (props: any) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: props.title,
    description: props.description,
    dueDate: props.dueDate.split("T")[0],
    startDate: props.startDate.split("T")[0],
    endDate: props.endDate.split("T")[0],
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!data.title || !data.startDate || !data.endDate || !data.dueDate)
        return;
      setIsLoading(true);

      const transformedData = {
        ...props,
        ...data,
        dueDate: new Date(data.dueDate).toISOString(),
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      await axios.put("/api/todo", transformedData);
      const response = await axios.get("/api/todo");
      dispatch(setTodo(response.data.todos));
      toast.success("Todo edit successfully");
    } catch (error) {
      toast.error("Failed to edit todo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEdit = async (_id: string) => {
    //@ts-ignore
    modalRef.current?.showModal();
  };

  const handleDelete = async (_id: string) => {
    const response = await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
    });
    dispatch(deleteTodo(_id));
  };

  const handleMarkCompleted = async () => {
    const toastId = toast.loading("Marking todo as completed");
    try {
      await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify({ ...props, completed: true }),
      });
      const response = await axios.get("/api/todo");
      dispatch(setTodo(response.data.todos));
      toast.success("Todo marked as completed", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to mark todo as completed", {
        id: toastId,
      });
    }
  };

  if (props.completed) {
    return (
      <div className="w-full bg-[#15101C] p-6 text-[#78CFB0] flex justify-between rounded-md line-through">
        {props.title}
      </div>
    );
  }

  return (
    <div className="w-full bg-[#15101C] p-6 text-[#9E78CF] flex justify-between rounded-md">
      {props.title}
      <div className="flex items-center gap-3">
        <MdOutlineModeEdit
          className="w-4 h-4 cursor-pointer hover:fill-blue-400"
          onClick={() => handleEdit(props.id)}
        />
        <IoMdCheckmark
          className="w-4 h-4 cursor-pointer hover:fill-green-400"
          onClick={() => handleMarkCompleted()}
        />
        <LuTrash
          className="w-4 h-4 cursor-pointer hover:stroke-red-400"
          onClick={() => handleDelete(props.id)}
        />
      </div>

      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <form
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <label className="form-control w-full max-w-xl">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                placeholder="Add a new task"
                className="text-[#fff] placeholder-[#777] p-2 w-full h-[40px] bg-[#1D1825] border border-[#9E78CF] rounded-md outline-none"
                name="title"
                value={data.title}
                onChange={handleChange}
              />
            </label>
            <label className="form-control w-full max-w-xl">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input
                type="text"
                placeholder="Description"
                className="text-[#fff] placeholder-[#777] p-2 w-full h-[40px] bg-[#1D1825] border border-[#9E78CF] rounded-md outline-none"
                name="description"
                value={data.description}
                onChange={handleChange}
              />
            </label>
            <label className="form-control w-full max-w-xl">
              <div className="label">
                <span className="label-text">Start Date</span>
              </div>
              <input
                type="date"
                placeholder="Start Date"
                name="startDate"
                value={data.startDate}
                onChange={handleChange}
              />
            </label>
            <label className="form-control w-full max-w-xl">
              <div className="label">
                <span className="label-text">End Date</span>
              </div>
              <input
                type="date"
                placeholder="End Date"
                name="endDate"
                value={data.endDate}
                onChange={handleChange}
              />
            </label>
            <label className="form-control w-full max-w-xl">
              <div className="label">
                <span className="label-text">Due Date</span>
              </div>
              <input
                type="date"
                placeholder="Due Date"
                name="dueDate"
                value={data.dueDate}
                onChange={handleChange}
              />
            </label>
            <button
              type="submit"
              className="btn mt-2 bg-[#9E78CF] p-1 text-white flex items-center justify-center rounded-sm"
            >
              {isLoading ? (
                <span className="loading loading-spinner" />
              ) : (
                <CiLocationArrow1 className=" text-xl stroke-1" />
              )}
              Edit Todo
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TodoItem;
