import { Card } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Bulldozer } from '../bulldozer/Bulldozer';
import { getSiteMap, isBulldozerOnStartingPosition } from '../selectors';
import { SiteCell } from '../site-cell/SiteCell';
import styles from './styles.module.css';

type Props = {
  className: string;
}

export const SiteMap = ({ className }: Props) => {
  const siteRows = useSelector(getSiteMap);
  const showBulldozerOnStartingPosition = useSelector(isBulldozerOnStartingPosition);

  return (
    <Card className={className}>
      <div className={styles.siteMapWrapper}>
        <div className={styles.bulldozerStartingPosition}>
          { showBulldozerOnStartingPosition && <Bulldozer /> }
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