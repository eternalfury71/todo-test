"use client";
import { Task } from "@/app/types/types";
import { useTodo } from "./todo-context";
import { useEffect, useState } from "react";
import { GrInProgress } from "react-icons/gr";

export function ToDoTask({ title, id, status }: Task) {
  const { deleteToDo, toggleStatus } = useTodo();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleDelete = () => {
    deleteToDo(id);
    closeModal();
  };

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  const handleInProgress = () => {
    if (status === "inprogress") toggleStatus(id, "pending");
    else if (status === "pending") toggleStatus(id, "inprogress");
  };

  const handleCompleted = () => {
    if (status === "completed") toggleStatus(id, "pending");
    else toggleStatus(id, "completed");
  };

  return (
    <div className="flex justify-between items-center my-6 text-lg relative">
      <h3 className={status === "completed" ? "line-through" : ""}>
        {title}
        {status === "pending" && (
          <div className="text-blue-600 inline"> Pending</div>
        )}
        {status === "inprogress" && (
          <div className="text-green-600 inline"> In progress</div>
        )}
      </h3>
      <div className="flex items-center">
        <GrInProgress
          className={`${
            status === "pending"
              ? "mr-3 h-12 w-10 text-green-600 cursor-pointer"
              : "mr-3 h-12 w-10 text-blue-600 cursor-pointer"
          }`}
          onClick={handleInProgress}
        />
        <input
          onChange={handleCompleted}
          className="mr-3 h-10 w-10"
          type="checkbox"
          checked={status === "completed"}
        />
        <button
          onClick={openModal}
          className="bg-red-500 p-2 rounded-md text-white text-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-hidden">
          <div className="bg-white p-6 rounded-lg shadow-lg w-84 max-w-lg">
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-center space-x-8">
              <button onClick={handleDelete} className="btn text-green-500">
                Confirm
              </button>
              <button onClick={closeModal} className="btn text-red-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
