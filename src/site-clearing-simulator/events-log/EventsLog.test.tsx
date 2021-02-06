import { LogEntryType } from '../store/log-entry-type';
import { renderWithStore } from '../test-helpers';
import { EventsLog } from './EventsLog';

describe('EventsLog component', () => {
  it('should match snapshot', () => {
    const wrapper = renderWithStore(<EventsLog />, {
      eventsLog: [
        {
          type: LogEntryType.RotateLeft,
          description: 'Rotate left'
        },
        {
          type: LogEntryType.RotateRight,
          description: 'Rotate left'
        }, {
          type: LogEntryType.MoveTo,
          description: 'Move to 1-1',
        },
        {
          type: LogEntryType.Stop,
          description: 'Simulation was stopped',
        }
      ]
    });

    expect(wrapper).toMatchSnapshot();
  });
});