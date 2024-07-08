import { UsersApi } from "./firestore/users-api";
import { StatsApi } from "./firestore/stats-api";
import { auth, db } from "@/utils/firestore/firebase";
import { useAuth } from "@/contexts/auth-context";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential,
  User as UserFirebase,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { User, UserStorage } from "@/types";

interface doSignUpWithEmailAndPasswordProps {
  email: string;
  password: string;
}

export const doSignUpWithEmailAndPassword = async ({
  email,
  password,
}: doSignUpWithEmailAndPasswordProps) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userFirebase: UserFirebase = userCredential.user;
    const userUid = userFirebase.uid;
    const userStorage = await UsersApi.createUser(userUid);
    const statsStorage = await StatsApi.createStats(userUid);
    if (!userStorage || !statsStorage) {
      return null;
    }
    return { ...userFirebase, ...userStorage } as User;
  } catch (e) {
    console.error("Error registration:", e);
    return null;
  }
};

interface doSignInWithEmailAndPasswordProps {
  email: string;
  password: string;
}

export const doSignInWithEmailAndPassword = async ({
  email,
  password,
}: doSignInWithEmailAndPasswordProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userFirebase = userCredential.user;
    const userUid = userFirebase.uid;
    const userStorage = await UsersApi.getUser(userUid);
    if (!userStorage) {
      return null;
    }
    return { ...userFirebase, ...userStorage } as User;
  } catch (e) {
    console.error("Error login:", e);
    return null;
  }
};

export const doSignOut = async () => {
  try {
    signOut(auth);
  } catch (e) {
    console.error("Error signout:", e);
    return null;
  }
};
