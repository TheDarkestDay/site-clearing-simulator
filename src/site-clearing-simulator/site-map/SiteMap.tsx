import { Card } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { getSiteMap } from '../selectors';
import { SiteCell } from '../site-cell/SiteCell';
import styles from './styles.module.css';

export const SiteMap = () => {
  const siteRows = useSelector(getSiteMap);
  console.log(siteRows);

  return (
    <Card>
      <div className={styles.siteMapWrapper}>
        <div>

        </div>

        <div className={styles.siteMap}>
          {
            siteRows.map((siteCells, i) => {
              return <div key={i} className={styles.siteRow}>
                {
                  siteCells.map((siteCell, j) => <SiteCell key={`${i}-${j}`} type={siteCell} />)
                }
              </div>
            })
          }
        </div>
      </div>
    </Card>
  );
};