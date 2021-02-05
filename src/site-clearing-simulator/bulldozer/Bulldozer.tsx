import { useSelector } from 'react-redux';
import { getBulldozerDirection } from '../store/selectors';
import { BulldozerDirection } from '../store/store-slice';
import styles from './styles.module.css';

const getBulldozerDirectionClass = (direction: BulldozerDirection) => {
  switch (direction) {
    case BulldozerDirection.Down:
      return styles.bulldozerHeadingDown;
    case BulldozerDirection.Right:
      return styles.bulldozerHeadingRight;
    case BulldozerDirection.Up:
      return styles.bulldozerHeadingUp;
  }
};

export const Bulldozer = () => {
  const bulldozerDirection = useSelector(getBulldozerDirection);
  const bulldozerClassName = `${styles.bulldozer} ${getBulldozerDirectionClass(bulldozerDirection)}`

  return (
    <div className={bulldozerClassName}>
      <span>🚜</span>
    </div>
  );
};