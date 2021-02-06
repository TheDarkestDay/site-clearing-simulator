import { Card, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import { NavigationOutlined, RedoOutlined, Stop, UndoOutlined } from '@material-ui/icons';
import React, { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { LogEntryType } from '../store/log-entry-type';
import { getEvents } from '../store/selectors';
import styles from './styles.module.css';

type Props = {
  className?: string;
}

const getLogEntryIcon = (type: LogEntryType) => {
  switch (type) {
    case LogEntryType.MoveTo:
      return <NavigationOutlined />;
    case LogEntryType.RotateLeft:
      return <UndoOutlined />;
    case LogEntryType.RotateRight:
      return <RedoOutlined />;
    case LogEntryType.Stop:
      return <Stop />;
  }
};

export const EventsLog = ({ className }: Props) => {
  const events = useSelector(getEvents);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const listElement = listRef.current;
    if (!listElement) {
      return;
    }

    listElement.scrollTop = listElement.offsetHeight;
  });

  return (
    <Card className={className}>
      <Typography component="h2" className={styles.logTitle}>
        Log
      </Typography>

      <List ref={listRef} className={styles.logList} dense>
        {events.map((event, index) => <ListItem key={index}>
          <ListItemIcon>
            {getLogEntryIcon(event.type)}
          </ListItemIcon>

          <ListItemText primary={event.description} />
        </ListItem>)}
      </List>
    </Card>
  );
};