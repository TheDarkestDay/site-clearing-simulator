import { SiteCellType } from './store-slice';

export const getUnclearedCells = (map: SiteCellType[][]): SiteCellType[] => {
  return map.reduce((row, total) => total.concat(row), [])
    .filter((cell) => cell === 'o' || cell === 't' || cell === 'r');
};