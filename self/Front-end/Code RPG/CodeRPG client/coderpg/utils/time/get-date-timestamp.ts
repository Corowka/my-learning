import { DAY_TIMESTAMP } from "./constants";

export const getDateTimestamp = (timestamp: number): number => {
  return timestamp - (timestamp % DAY_TIMESTAMP);
};
