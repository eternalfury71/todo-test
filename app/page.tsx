import { ToDoWrapper } from "./components/todo/todo";
import { ToDoProvider } from "./components/todo/todo-context";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto mt-8 p-6 rounded-lg bg-gray-100 min-h-[10000px]">
      <ToDoProvider>
        <ToDoWrapper />
      </ToDoProvider>
    </main>
  );
}
