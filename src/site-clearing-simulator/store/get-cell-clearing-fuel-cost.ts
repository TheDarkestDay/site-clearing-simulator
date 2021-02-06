import { SiteCellType } from './store-slice';

export const getCellClearingFuelCost = (cellType: SiteCellType): number => {
  switch (cellType) {
    case 'o':
    case 'C':
      return 1;
    case 'r':
    case 't':
      return 2;
    default:
      throw new Error('Clearing of a cell with bulldozer or preservable tree is not allowed');
  }
};