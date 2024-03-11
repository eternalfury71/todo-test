"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { Task } from "../../types/types";
import { v4 as uuidv4 } from "uuid";

export const filters = {
  all: "all",
  completed: "completed",
  incompleted: "incompleted",
  inprogress: "inprogress",
};

export type Filters = keyof typeof filters;

type ToDoContextType = {
  todos: Task[];
  addNewToDo: (todo: string) => void;
  deleteToDo: (id: string) => void;
  filterTasks: (status: Filters) => void;
  filteredTodos: Task[];
  toggleStatus: (id: string, status: Task["status"]) => void;
};

export const ToDoContext = createContext<ToDoContextType | null>(null);

export function ToDoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Task[]>([]);
  const [filterValue, setFilterValue] = useState<Filters>("all");

  const addNewToDo = (todo: string) => {
    setTodos([...todos, { id: uuidv4(), title: todo, status: "pending" }]);
  };

  const deleteToDo: ToDoContextType["deleteToDo"] = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleStatus: ToDoContextType["toggleStatus"] = (id, status) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const filterTasks = (status: Filters) => setFilterValue(status);
  const filteredTodos = todos.filter((todo) => {
    if (filterValue === "completed") {
      return todo.status === "completed";
    } else if (filterValue === "incompleted") {
      return todo.status !== "completed";
    } else if (filterValue === "inprogress") {
      return todo.status === "inprogress";
    }
    return true;
  });

  return (
    <ToDoContext.Provider
      value={{
        todos,
        addNewToDo,
        deleteToDo,
        filterTasks,
        filteredTodos,
        toggleStatus,
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
