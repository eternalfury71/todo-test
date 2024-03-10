"use client";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useTodo } from "./todo-context";

export function ToDoForm() {
  const { addNewToDo } = useTodo();
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const resetInput = () => setValue("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    if (trimmedValue !== "") {
      addNewToDo(trimmedValue);
    }
    resetInput();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <form
        className="flex items-center justify-between my-4"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          className="flex-1 outline-none border-none p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type Here"
          value={value}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-500 ml-2 text-white p-3 rounded-lg cursor-pointer hover:bg-green-600"
        >
          Add Task
        </button>
      </form>
    </>
  );
}
