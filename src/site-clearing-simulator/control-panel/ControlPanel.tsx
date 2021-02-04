import { Card, Fab } from '@material-ui/core';
import { NavigationOutlined, RedoOutlined, StopOutlined, UndoOutlined } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isSimulationStopped } from '../selectors';
import { moveForward, rotateRight, rotateLeft } from '../store-slice';
import styles from './styles.module.css';

type Props = {
  className: string;
}

export const ControlPanel = ({ className }: Props) => {
  const dispatch = useDispatch();
  const isDisabled = useSelector(isSimulationStopped);

  const handleMoveForwardClick = () => {
    dispatch(moveForward());
  };

  const handleRotateLeftClick = () => {
    dispatch(rotateLeft());
  };

  const handleRotateRightClick = () => {
    dispatch(rotateRight());
  };

  return (
    <Card className={`${styles.controlPanel} ${className}`}>
      <div className={styles.controlButton}>
        <Fab color="primary" onClick={handleRotateLeftClick} disabled={isDisabled}>
          <UndoOutlined />
        </Fab>
      </div>

      <div className={styles.controlButton}>
        <Fab color="primary" onClick={handleMoveForwardClick} disabled={isDisabled}>
          <NavigationOutlined />
        </Fab>
      </div>

      <div className={styles.controlButton}>
        <Fab color="primary" onClick={handleRotateRightClick} disabled={isDisabled}>
          <RedoOutlined />
        </Fab>
      </div>

      <div className={styles.controlButton}>
        <Fab color="secondary" disabled={isDisabled}>
          <StopOutlined />
        </Fab>
      </div>
    </Card>
  );
};