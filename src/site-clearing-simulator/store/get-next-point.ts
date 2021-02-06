import { Point2D } from './point-2d';
import { BulldozerDirection } from './store-slice';

export const getNextPoint = ({ x, y }: Point2D, direction: BulldozerDirection): Point2D => {
  switch (direction) {
    case BulldozerDirection.Up:
      return {
        x: x - 1,
        y,
      }
    case BulldozerDirection.Right:
      return {
        x,
        y: y + 1,
      }
    case BulldozerDirection.Down:
      return {
        x: x + 1,
        y
      }
    case BulldozerDirection.Left:
      return {
        x,
        y: y - 1
      }
  }
};