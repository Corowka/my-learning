export type Task = {
  id: string;
  title: string;
  description: string;
};

export type User = {
  userName: string;
  tasks: Task[];
};
