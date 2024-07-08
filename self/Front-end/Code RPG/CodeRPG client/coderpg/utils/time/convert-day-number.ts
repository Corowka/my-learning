export const convertDayNumber = (dayNumber: number): number => {
  return (dayNumber + 6) % 7;
};
