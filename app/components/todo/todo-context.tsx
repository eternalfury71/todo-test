"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { Task } from "../../types/types";
import { v4 as uuidv4 } from "uuid";

type ToDoContextType = {
  todos: Task[];
  addNewToDo: (todo: string) => void;
  deleteToDo: (id: string) => void;
  toggleCompletedToDo: (id: string) => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  filterTasks: (status: string) => void;
  filteredTodos: Task[];
};

export const ToDoContext = createContext<ToDoContextType | {}>({});

export function ToDoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Task[]>([]);
  const [filterValue, setFilterValue] = useState("all");

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

  const filterTasks = (status: string) => setFilterValue(status);
  const filteredTodos = todos.filter((todo) => {
    if (filterValue === "completed") {
      return todo.completed;
    } else if (filterValue === "incompleted") {
      return !todo.completed;
    }
    return true;
  });
  return (
    <ToDoContext.Provider
      value={{
        todos,
        addNewToDo,
        deleteToDo,
        toggleCompletedToDo,
        filterTasks,
        filteredTodos,
        filterValue,
        setFilterValue,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error("Error");
  }
  return context as ToDoContextType;
}
