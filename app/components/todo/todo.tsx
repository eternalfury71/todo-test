"use client";
import { ToDoForm } from "./todo-form";
import { ToDoTask } from "./todo-task";
import { ToDoProvider, useTodo } from "./todo-context";

export function ToDoWrapper() {
  const { todos, deleteToDo, toggleCompletedToDo } = useTodo();
  return (
    <ToDoProvider>
      <ToDoForm />
      {todos?.map((todo) => (
        <ToDoTask
          key={todo.id}
          title={todo.title}
          id={todo.id}
          completed={todo.completed}
          deleteToDo={deleteToDo}
          toggleCompleted={toggleCompletedToDo}
        />
      ))}
    </ToDoProvider>
  );
}
