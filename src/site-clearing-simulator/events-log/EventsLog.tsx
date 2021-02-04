import { Card, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import React from 'react';
import { useSelector } from 'react-redux';
import { getEvents } from '../selectors';
import styles from './styles.module.css';

type Props = {
  className: string;
}

export const EventsLog = ({className}: Props) => {
  const events = useSelector(getEvents);

  return (
    <Card className={className}>
      <Typography component="h2" className={styles.logTitle}>
        Log
      </Typography>

      <List>
        {events.map((event) => <ListItem>
          <ListItemIcon>

          </ListItemIcon>

          <ListItemText primary={event.description}/>
        </ListItem>)}
      </List>
    </Card>
  );
};