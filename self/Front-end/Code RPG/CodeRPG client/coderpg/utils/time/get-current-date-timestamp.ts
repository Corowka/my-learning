import { DAY_TIMESTAMP } from "./constants";

export const getCurrentDateTimestamp = (): number => {
  const today = new Date();
  return today.getTime() - (today.getTime() % DAY_TIMESTAMP);
};
