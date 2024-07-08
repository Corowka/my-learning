import { HOUR_TIMESTAMP } from "./constants";

export const convertTimestampToHours = (timestamp: number) => {
  return timestamp / HOUR_TIMESTAMP;
};
