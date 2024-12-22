export const maxItem = (arr: number[]): number => {
  return arr.reduce((max, item, i) => (max < item ? item : max), -Infinity);
};
