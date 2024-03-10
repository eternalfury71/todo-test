export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type NewToDo = {
  todo: Task;
};

export type AddNewToDo = {
  addNewToDo: (todo: Task["title"]) => void;
};
