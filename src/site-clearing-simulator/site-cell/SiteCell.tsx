import React from 'react';
import { SiteCellType } from '../store-slice';
import styles from './styles.module.css';

type Props = {
  type: SiteCellType;
};

const getCellContent = (cellType: SiteCellType) => {
  switch(cellType) {
    case 'o':
      return '';
    case 'r':
      return '⛰️';
    case 't':
      return '🌳';
    case 'T':
      return '🎄';
    case 'B':
      return '🚜';
  }
};

export const SiteCell = React.memo(({type}: Props) => {
  return <div className={styles.siteCell}>{getCellContent(type)}</div>;
});