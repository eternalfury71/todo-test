export type Task = {
  id: string;
  title: string;
  status: "completed" | "inprogress" | "pending";
};

export type NewToDo = {
  todo: Task;
};

export type AddNewToDo = {
  addNewToDo: (todo: Task["title"]) => void;
};
