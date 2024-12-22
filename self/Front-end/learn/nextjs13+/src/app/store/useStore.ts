import { Task, User } from "@/utils/types";
import { create } from "zustand";

interface Store {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (userName: string) => void;
  logout: () => void;
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
}

const useStore = create<Store>((set) => ({
  users: [],
  currentUser: null,
  isLoggedIn: false,
  login: (userName) =>
    set((state) => {
      const existingUser = state.users.find((u) => u.userName === userName);
      const user =
        existingUser ||
        ({
          userName,
          tasks: [],
        } as User);
      console.log(existingUser);
      console.log(user);
      console.log(existingUser ? [...state.users] : [...state.users, user]);
      return {
        ...state,
        users: existingUser ? [...state.users] : [...state.users, user],
        currentUser: user,
        isLoggedIn: true,
      };
    }),
  logout: () =>
    set((state) => ({
      ...state,
      users: state.users.map((user) =>
        user.userName === state.currentUser?.userName
          ? { ...user, tasks: state.currentUser?.tasks || [] }
          : user
      ),
      currentUser: null,
      isLoggedIn: false,
    })),
  addTask: (task) =>
    set((state) => ({
      ...state,
      currentUser: state.currentUser
        ? {
            ...state.currentUser,
            tasks: [...state.currentUser.tasks, task],
          }
        : null,
    })),
  removeTask: (taskId) =>
    set((state) => ({
      ...state,
      currentUser: state.currentUser
        ? {
            ...state.currentUser,
            tasks: state.currentUser.tasks.filter((task) => task.id !== taskId),
          }
        : null,
    })),
}));

export default useStore;
