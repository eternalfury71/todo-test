"use client";
import { Task } from "@/app/types/types";
import { useTodo } from "./todo-context";
import { useState } from "react";

export function ToDoTask({ title, id, completed }: Task) {
  const { deleteToDo, toggleCompletedToDo } = useTodo();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleDelete = () => {
    deleteToDo(id);
    closeModal();
  };
  return (
    <div className="flex justify-between items-center my-6 text-lg">
      <h3 className={completed ? "line-through" : ""}>{title}</h3>
      <div className="flex items-center">
        <input
          onClick={() => toggleCompletedToDo(id)}
          className="mr-3 h-10 w-10"
          type="checkbox"
        />
        <button
          onClick={openModal}
          className="bg-red-500 p-2 rounded-md text-white text-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
