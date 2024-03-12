"use client";
import { Task } from "@/app/types/types";
import { useTodo } from "./todo-context";
import { useRef, useState } from "react";
import { GrInProgress } from "react-icons/gr";
import Modal, { ModalRef } from "./modal";
import { createPortal } from "react-dom";
export function ToDoTask({ title, id, status }: Task) {
  const { toggleStatus, deleteToDo } = useTodo();
  const openModalRef = useRef<ModalRef>(null);
  const handleDelete = () => {
    deleteToDo(id);
    openModalRef.current?.closeModal();
  };
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
          onClick={() => openModalRef.current?.openModal()}
          className="bg-red-500 p-2 rounded-md text-white text-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      {createPortal(
        <Modal onConfirm={handleDelete} ref={openModalRef}>
          <p className="mb-6">Are you sure you want to delete this task?</p>
        </Modal>,
        document.getElementById("modal-root") || document.body
      )}
    </div>
  );
}
