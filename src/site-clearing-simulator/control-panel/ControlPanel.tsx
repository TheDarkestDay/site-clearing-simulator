import { Card, Fab } from '@material-ui/core';
import { NavigationOutlined, RedoOutlined, SettingsBackupRestore, Stop, UndoOutlined } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isSimulationStopped } from '../store/selectors';
import { moveForward, rotateRight, rotateLeft, stopSimulation, resetSimulation } from '../store/store-slice';
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

  const handleStopButtonClick = () => {
    dispatch(stopSimulation());
  };

  const handleStartNewSimulationButtonClick = () => {
    dispatch(resetSimulation());
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

      <div className={styles.controlButton} onClick={handleStopButtonClick}>
        <Fab color="secondary" disabled={isDisabled}>
          <Stop />
        </Fab>
      </div>

      <div className={styles.controlButton} onClick={handleStartNewSimulationButtonClick}>
        <Fab color="secondary">
          <SettingsBackupRestore />
        </Fab>
      </div>
    </Card>
  );
};