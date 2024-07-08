import { Stats } from "@/types";
import { start } from "repl";

export const convertStatsToActions = (stats: Stats[] | Stats): number => {
  stats = stats instanceof Array ? stats : [stats];
  return stats.reduce((totalActions, stat) => {
    return totalActions + stat.actions;
  }, 0);
};
