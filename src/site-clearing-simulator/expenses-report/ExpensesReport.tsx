import { Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { getFuelCost, getTotalExpenses, getUnclearedCellsCost, isPreservedTreeRemoved, PRESERVED_TREE_REMOVAL_CHARGE } from '../store/selectors';
import styles from './styles.module.css';

type Props = {
  className: string;
}

export const ExpensesReport = ({ className }: Props) => {
  const fuelCost = useSelector(getFuelCost);
  const unclearedCellsCost = useSelector(getUnclearedCellsCost);
  const totalCost = useSelector(getTotalExpenses);
  const shouldApplyExtraCharge = useSelector(isPreservedTreeRemoved);

  return (
    <Card className={className}>
      <Typography component="h2" className={styles.reportTitle}>
        Expense report
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              Item name
            </TableCell>
            <TableCell>
              Cost
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              Fuel
            </TableCell>
            <TableCell>
              {fuelCost}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Uncleared cells
            </TableCell>
            <TableCell>
              {unclearedCellsCost}
            </TableCell>
          </TableRow>
          {
            shouldApplyExtraCharge &&
              <TableRow>
                <TableCell>
                  Preservable tree removal fine
              </TableCell>
                <TableCell>
                  {PRESERVED_TREE_REMOVAL_CHARGE}
                </TableCell>
              </TableRow>
          }
          <TableRow>
            <TableCell>
              Total
            </TableCell>
            <TableCell>
              {totalCost}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};