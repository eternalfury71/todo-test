"use client";
import { ToDoForm } from "./todo-form";
import { ToDoTask } from "./todo-task";
import { filters, Filters, useTodo } from "./todo-context";

export function ToDoWrapper() {
  const { filterTasks, filteredTodos } = useTodo();
  return (
    <>
      <ToDoForm />
      <select
        onChange={(e) => filterTasks(e.target.value as Filters)}
        className="p-2 border border-gray-300 rounded-md mb-4"
      >
        {Object.keys(filters).map((filter) => (
          <option value={filter} key={filter}>
            {filter}
          </option>
        ))}
      </select>

      {filteredTodos.map((todo) => (
        <ToDoTask
          key={todo.id}
          title={todo.title}
          id={todo.id}
          status={todo.status}
        />
      ))}
    </>
  );
}
