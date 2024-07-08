import { Stats, StatsStorage, StatsValues } from "@/types";
import { auth, db } from "@/utils/firestore/firebase";
import {
  query,
  collection,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
  doc,
  setDoc,
  collectionGroup,
  orderBy,
} from "firebase/firestore";

export class StatsApi {
  static async createStats(uid: string): Promise<StatsStorage | null> {
    try {
      const statsStorage: StatsValues = {
        time: 0,
        actions: 0,
      };
      const statsDocRef = doc(db, "stats", uid);
      await setDoc(statsDocRef, statsStorage);

      const indexPath = "stats/YbCiVsmWcnSL8esm0iY36OQgqZs1/data";
      const q = query(collectionGroup(db, indexPath), orderBy("start", "desc"));

      return { ...statsStorage, data: [] };
    } catch (error) {
      return null;
    }
  }

  static async getStats(
    uid: string,
    start: number,
    end: number
  ): Promise<Stats[] | [] | null> {
    try {
      const statsDocRef = doc(db, "stats", uid);
      const dataCollectionRef = collection(statsDocRef, "data");
      const q = query(dataCollectionRef, where("start", ">=", start));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const data: Stats[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as Stats);
      });
      const stats = data.filter((s) => s.end <= end);
      console.log(stats);
      return stats;
    } catch (error) {
      console.error("Error fetching stats:", error);
      return null;
    }
  }

  static async addStats(uid: string, stats: Stats[]): Promise<boolean> {
    try {
      for (let i = 0; i < stats.length; i++) {
        const id = stats[i].start;
        const docRef = doc(db, `/stats/${uid}/data/${id}`);
        await setDoc(docRef, stats[i]);
      }
      return true;
    } catch (error) {
      console.error("Error fetching stats:", error);
      return false;
    }
  }
}
