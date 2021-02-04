export const getRange = (end: number): number[] => {
  return Array.from({length: end}).map((_, index) => index);
};