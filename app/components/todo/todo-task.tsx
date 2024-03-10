"use client";
import { Task } from "@/app/types/types";

type TaskProps = Pick<Task, "title" | "id" | "completed"> & {
  deleteToDo: (id: string) => void;
  toggleCompleted: (id: string) => void;
};

export function ToDoTask({
  title,
  id,
  completed,
  deleteToDo,
  toggleCompleted,
}: TaskProps) {
  return (
    <div className="flex justify-between items-center my-6 text-lg">
      <h3 className={completed ? "line-through" : ""}>{title}</h3>
      <div className="flex items-center">
        <input
          onClick={() => toggleCompleted(id)}
          className="mr-3 h-10 w-10"
          type="checkbox"
        />
        <button
          onClick={() => deleteToDo(id)}
          className="bg-red-500 p-2 rounded-md text-white text-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
