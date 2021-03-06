import { Card, CardContent } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { useSelector } from 'react-redux';
import { getRange } from '../../utils';
import { Bulldozer } from '../bulldozer';
import { getSiteMap, isBulldozerOnStartingPosition } from '../store/selectors';
import { SiteCell } from '../site-cell';
import styles from './styles.module.css';

type Props = {
  className: string;
}

export const SiteMap = ({ className }: Props) => {
  const siteRows = useSelector(getSiteMap);
  const showBulldozerOnStartingPosition = useSelector(isBulldozerOnStartingPosition);

  const rowsCount = siteRows.length;
  if (rowsCount === 0) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>

        Uploaded map appears to be invalid - please restart the simulation using the "Refresh" button below
      </Alert>
    );
  }

  const columnsCount = siteRows[0].length;

  return (
    <Card className={className}>
      <CardContent className={styles.siteMapWindow}>
        <div className={styles.siteMapWrapper}>
          <div className={styles.bulldozerStartingPosition}>
            {showBulldozerOnStartingPosition && <Bulldozer />}
          </div>

          <div className={styles.siteMapOuter}>
            <div className={styles.siteMapYGuide}>
              <div className={styles.siteMapDummyGuideCell} aria-hidden="true"></div>

              {
                getRange(columnsCount).map((yPosition) => <div className={styles.siteMapYGuideCell} key={yPosition}>{yPosition}</div>)
              }
            </div>

            <div className={styles.siteMapInner}>
              <div className={styles.siteMapXGuide}>
                {
                  getRange(rowsCount).map((xPosition) => <div className={styles.siteMapXGuideCell} key={xPosition}>{xPosition}</div>)
                }
              </div>

              <div className={styles.siteMapMainGrid}>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};