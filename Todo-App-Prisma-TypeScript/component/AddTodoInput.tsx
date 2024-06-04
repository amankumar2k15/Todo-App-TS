"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiLocationArrow1, CiPaperplane } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setTodo } from "@/redux/TodoSlice";
import toast from "react-hot-toast";

const AddTodoInput = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!data.title || !data.startDate || !data.endDate || !data.dueDate)
        return;
      setIsLoading(true);

      const transformedData = {
        ...data,
        dueDate: new Date(data.dueDate).toISOString(),
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      await axios.post("/api/todo", transformedData);
      const response = await axios.get("/api/todo");
      dispatch(setTodo(response.data.todos));
      toast.success("Todo added successfully");

      setData({
        title: "",
        description: "",
        dueDate: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      toast.error("Failed to add todo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Add a new task"
        className="text-[#fff] placeholder-[#777] p-2 w-[381px] h-[40px] bg-[#1D1825] border border-[#9E78CF] rounded-md outline-none"
        name="title"
        value={data.title}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-[#9E78CF] p-1 text-white w-[32px] h-[32px] flex items-center justify-center rounded-sm"
        onClick={() => {
          //@ts-ignore
          document.getElementById("my_modal_2").showModal();
        }}
      >
        <IoMdAdd />
      </button>

      <dialog id="my_modal_2" className="modal">
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
              Add Todo
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

export default AddTodoInput;
