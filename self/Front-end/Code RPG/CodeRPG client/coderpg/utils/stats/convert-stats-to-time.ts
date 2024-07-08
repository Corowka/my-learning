import { Stats } from "@/types";
import { start } from "repl";

export const convertStatsToTime = (stats: Stats[] | Stats): number => {
  stats = stats instanceof Array ? stats : [stats];
  return stats.reduce((totalTime, stat) => {
    const duration = stat.end - stat.start;
    return totalTime + Math.max(duration, 0);
  }, 0);
};
