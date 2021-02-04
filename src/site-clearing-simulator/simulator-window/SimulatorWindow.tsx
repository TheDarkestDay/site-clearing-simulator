import { SiteMap } from '../site-map/SiteMap';
import { ControlPanel } from '../control-panel/ControlPanel';
import React from 'react';
import { ExpensesReport } from '../expenses-report/ExpensesReport';
import { EventsLog } from '../events-log/EventsLog';
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