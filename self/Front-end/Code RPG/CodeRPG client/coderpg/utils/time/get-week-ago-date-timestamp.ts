import { WEEK_TIMESTAMP } from "./constants";
import { getCurrentDateTimestamp } from "./get-current-date-timestamp";

export const getWeekAgoDateTimestamp = (): number => {
  const currentDateTimestamp = getCurrentDateTimestamp();
  return currentDateTimestamp - WEEK_TIMESTAMP;
};
