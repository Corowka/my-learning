import { Stats } from "@/types";
import { getDateTimestamp } from "../time/get-date-timestamp";
import { convertDayNumber } from "../time/convert-day-number";

export const splitStatsToDays = (stats: Stats[]): Stats[][] => {
  return stats.reduce(
    (splittedStats, stat) => {
      const day = new Date(stat.start).getDay();
      const dayConverted = convertDayNumber(day);

      splittedStats[dayConverted].push(stat);

      return splittedStats;
    },
    new Array(7).fill(null).map(() => [] as Stats[])
  );
};
