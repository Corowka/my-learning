import { UserStorage } from "@/types";
import { auth, db } from "@/utils/firestore/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export class UsersApi {
  static async createUser(uid: string): Promise<UserStorage | null> {
    try {
      const userStorage: UserStorage = {
        experience: 0,
        cards: [],
        squad: [],
      };
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, userStorage);
      return userStorage;
    } catch (error) {
      return null;
    }
  }

  static async getUser(uid: string): Promise<UserStorage | null> {
    try {
      const userDocRef = doc(db, "/users", uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as UserStorage;
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}
