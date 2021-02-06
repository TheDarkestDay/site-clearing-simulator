import { SiteMap } from '../site-map';
import { ControlPanel } from '../control-panel';
import React from 'react';
import { ExpensesReport } from '../expenses-report';
import { EventsLog } from '../events-log';
import styles from './styles.module.css';

export const SimulatorWindow = () => {
  return (
    <section className={styles.simulatorWindowGrid}>
      <SiteMap className={styles.siteMap} />

      <ExpensesReport className={styles.expensesReport} />

      <EventsLog className={styles.eventsLog} />

      <ControlPanel className={styles.controlPanel} />
    </section>
  );
};