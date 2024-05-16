export const padTime = (time) => {
  const timeString = String(time);
  if (timeString.length < 2) {
    return "0" + timeString;
  }
  return timeString;
};
