import React from 'react';
import { SiteClearingSimulator } from '../site-clearing-simulator/site-clearing-simulator/SiteClearingSimulator';
import styles from './styles.module.css';

function App() {
  return (
    <div className={styles.app}>
      <SiteClearingSimulator />
    </div>
  );
}

export default App;
