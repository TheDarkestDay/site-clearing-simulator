import { Point2D } from './point-2d';
import { SiteCellType } from './store-slice';

export const isPointOutOfBounds = ({x, y}: Point2D, map: SiteCellType[][]): boolean => {
  const [firstRow] = map;
  const maxX = map.length;
  const maxY = firstRow.length;

  return x < 0 || x >= maxX || y < 0 || y >= maxY; 
};