"use client";
import { ToDoForm } from "./todo-form";
import { ToDoTask } from "./todo-task";
import { useTodo } from "./todo-context";

export function ToDoWrapper() {
  const { filterTasks, filteredTodos } = useTodo();
  return (
    <>
      <ToDoForm />
      <select
        onChange={(e) => filterTasks(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="incompleted">Incomplete Tasks</option>
      </select>

      {filteredTodos.map((todo) => (
        <ToDoTask
          key={todo.id}
          title={todo.title}
          id={todo.id}
          completed={todo.completed}
        />
      ))}
    </>
  );
}
