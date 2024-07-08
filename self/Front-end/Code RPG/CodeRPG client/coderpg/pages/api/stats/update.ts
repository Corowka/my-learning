import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/utils/firestore/firebase";
import { setDoc, arrayUnion, doc } from "firebase/firestore";
import { StatsApi } from "@/utils/firestore/stats-api";
type Stats = {
  apiKey: string;
  date: string;
  stats: {
    start: number;
    end: number;
    actions: number;
  };
};

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { stats } = req.body;
    console.log(stats);

    // TODO: add real apikey
    const uid = "YbCiVsmWcnSL8esm0iY36OQgqZs1";

    await StatsApi.addStats(uid, stats);

    console.log("Received statistics:", stats);
    res.status(200).send("Data received successfully!");
  } catch (error) {
    console.error("Error processing key:", error);
    res.status(500).json({ error });
  }
}
