"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { Task } from "../../types/types";
import { v4 as uuidv4 } from "uuid";

type ToDoContextType = {
  todos: Task[];
  addNewToDo: (todo: string) => void;
  deleteToDo: (id: string) => void;
  toggleCompletedToDo: (id: string) => void;
};

export const ToDoContext = createContext<ToDoContextType | {}>({});

export function ToDoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Task[]>([]);

  const addNewToDo = (todo: string) => {
    setTodos([...todos, { id: uuidv4(), title: todo, completed: false }]);
  };

  const deleteToDo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompletedToDo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <ToDoContext.Provider
      value={{
        todos,
        addNewToDo,
        deleteToDo,
        toggleCompletedToDo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error("useTodo must be used within a ToDoProvider");
  }
  return context as ToDoContextType;
}
