import { LogEntryType } from './log-entry-type';

export type EventsLogEntry = {
  type: LogEntryType;
  description: string;
};