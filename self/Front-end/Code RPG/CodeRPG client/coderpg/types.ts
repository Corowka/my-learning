import { UserCredential, User as UserFirebase } from "firebase/auth";
import { StaticImageData } from "next/image";

export type User = UserFirebase & UserStorage;

export type UserStorage = {
  experience: number;
  cards: {
    name: number;
    amount: number;
  }[];
  squad: string[];
};

export type StatsStorage = StatsValues & {
  data: Stats[];
};

export type Stats = {
  start: number;
  end: number;
  actions: number;
};

export type StatsValues = {
  time: number;
  actions: number;
};
