import axios from "axios";
import { Task } from "./app/types/types";

const baseUrl = "http://localhost:3001";

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const { data } = await axios.get(`${baseUrl}/tasks`);
    return data;
  } catch (error) {
    console.error("Error getting all tasks:", error);
    return [];
  }
};

export const postNewTask = async (todo: Task): Promise<Task> => {
  const res = await axios.post(`${baseUrl}/tasks`, todo);
  const newTodo = res.data;
  return newTodo;
};

export const deleteTask = async (id: Task["id"]): Promise<Task | null> => {
  try {
    const { data } = await axios.delete<Task>(`${baseUrl}/tasks/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    return null;
  }
};

export const changeStatus = async (
  id: Task["id"],
  status: Task["status"],
  taskToUpdate: Task
) => {
  try {
    const { data } = await axios.put<Task>(`${baseUrl}/tasks/${id}`, {
      ...taskToUpdate,
      status,
    });
    console.log("Status updated!");
    return data;
  } catch (error) {
    console.error("Error changing status:", error);
    return null;
  }
};
