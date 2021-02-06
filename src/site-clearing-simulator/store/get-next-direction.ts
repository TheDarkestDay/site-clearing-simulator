import { BulldozerDirection } from './store-slice';

export const getNextDirection = (direction: BulldozerDirection, turnDirection: 'left' | 'right'): BulldozerDirection => {
  const directions = [
    BulldozerDirection.Up,
    BulldozerDirection.Right,
    BulldozerDirection.Down,
    BulldozerDirection.Left,
  ];

  const directionDelta = turnDirection === 'right' ? 1 : -1;
  const newDirectionIndex = directions.indexOf(direction) + directionDelta;

  if (newDirectionIndex < 0) {
    return BulldozerDirection.Left;
  }

  if (newDirectionIndex >= directions.length) {
    return BulldozerDirection.Up;
  }

  return directions[newDirectionIndex];
}