import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const TaskContainer = ({title,data: _data,}: {
  title: string;
  data: any[];
}) => {
  const [data, setData] = useState(_data);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(_data.length);
  const [defaultItemsPerPage, setDefaultItemsPerPage] = useState(10);

  useEffect(() => {
    filterData(search, startDate, endDate, currentPage);
  }, [search, startDate, endDate, currentPage, itemsPerPage]);

  useEffect(() => {
    setItemsPerPage(defaultItemsPerPage);
  }, [defaultItemsPerPage]);

  const handleSearchFilter = (e: any) => {
    const search = e.target.value;
    setSearch(search);
    setCurrentPage(1);
  };

  const handleDateFilter = () => {
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e: any) => {
    const itemsPerPage = Number(e.target.value);
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleDefaultItemsPerPageChange = (e: any) => {
    const inputValue = e.target.value;
    if (inputValue.trim() !== "" || inputValue.trim() !== "0") {
      const defaultItemsPerPage = Number(inputValue);
      setDefaultItemsPerPage(defaultItemsPerPage);
    } else {
      setDefaultItemsPerPage(1);
    }
  };

  const filterData = (
    search: string,
    startDate: string,
    endDate: string,
    page: number
  ) => {
    let filteredData = _data;

    if (search) {
      filteredData = filteredData.filter((item: any) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter(
        (item: any) =>
          new Date(item.dueDate) >= new Date(startDate) &&
          new Date(item.dueDate) <= new Date(endDate)
      );
    }

    setTotalItems(filteredData.length);

    const startIndex = (page - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    setData(paginatedData);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <div className="text-white">
        <p className="mb-2">
          {title} {totalItems}
        </p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="text-[#fff] placeholder-[#777] p-2 w-full h-[40px] bg-[#1D1825] border border-[#9E78CF] rounded-md outline-none mb-2"
            name="search"
            value={search}
            onChange={handleSearchFilter}
          />
          <div className="flex gap-4">
            <input
              type="date"
              className="text-[#fff] placeholder-[#777] p-2 w-full h-[40px] bg-[#1D1825] border border-[#9E78CF] rounded-md outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="text-[#fff] placeholder-[#777] p-2 w-full h-[40px] bg-[#1D1825] border border-[#9E78CF] rounded-md outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button
              onClick={handleDateFilter}
              className="bg-[#9E78CF] text-white p-2 rounded-md"
            >
              Filter
            </button>
          </div>
        </div>

        <div className="flex gap-4 items-center mb-4">
          <div className="gap-3 flex items-center">
            Limit items per page:
            <input
              type="number"
              value={defaultItemsPerPage}
              onChange={handleDefaultItemsPerPageChange}
              className="text-[#fff] placeholder-[#777] p-2 w-24 bg-[#1D1825] border border-[#9E78CF] rounded-md outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {data.map((item: any) => {
            return <TodoItem key={item.id} {...item} />;
          })}
          {!data.length && (
            <p className="text-[#9E78CF] w-full flex items-center justify-center border border-dashed border-[#9E78CF] p-4 rounded-md pointer-events-none">
              No task available
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between items-center mt-4 gap-3">
          <div>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{" "}
            to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
            {totalItems} items
          </div>
          <div className="flex">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 bg-[#9E78CF] text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 mx-1 ${
                  index + 1 === currentPage
                    ? "bg-[#9E78CF] text-white"
                    : "bg-[#1D1825] text-[#9E78CF] border border-[#9E78CF]"
                } rounded-md`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 bg-[#9E78CF] text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskContainer;
