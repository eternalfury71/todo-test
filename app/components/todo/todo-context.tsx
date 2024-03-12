"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Task } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import { changeStatus, deleteTask, getAllTasks, postNewTask } from "@/api";

export const filters = {
  all: "all",
  completed: "completed",
  incompleted: "incompleted",
  inprogress: "inprogress",
};

export type Filters = keyof typeof filters;

export type ToDoContextType = {
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

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTodos = await getAllTasks();
      setTodos(fetchedTodos);
    };
    fetchData();
  }, []);

  const addNewToDo = async (todo: string) => {
    const newTodo = { id: uuidv4(), title: todo, status: "pending" as const };
    postNewTask(newTodo);
    setTodos([...todos, newTodo]);
  };

  const deleteToDo: ToDoContextType["deleteToDo"] = async (id: string) => {
    const deletedTask = deleteTask(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleStatus: ToDoContextType["toggleStatus"] = async (id, status) => {
    const taskToUpdate = todos.find((todo) => todo.id === id);
    if (!taskToUpdate) {
      return;
    }
    const response = await changeStatus(id, status, taskToUpdate);

    if (response === null) {
      return;
    }

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
