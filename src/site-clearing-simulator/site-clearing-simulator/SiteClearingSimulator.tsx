import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { isSimulationStarted } from '../store/selectors';
import { SimulationFileInput } from '../simulation-file-input';
import { SimulatorWindow } from '../simulator-window';
import styles from './styles.module.css';

export const SiteClearingSimulator = () => {
  const isStarted = useSelector(isSimulationStarted);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">
            Site Clearing Simulator
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={styles.simulatorWrapper}>
        {
          isStarted
            ? <SimulatorWindow />
            : <SimulationFileInput />
        }
      </main>
    </>
  );
};