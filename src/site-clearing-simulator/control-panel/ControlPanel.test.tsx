import { renderWithStore } from '../test-helpers';
import { ControlPanel } from './ControlPanel';

describe('ControlPanel component', () => {
  it('should match snapshot for ongoing simulation', () => {
    const wrapper = renderWithStore(<ControlPanel />, {
      bulldozerPosition: {
        x: 1,
        y: 1,
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for stopped simulation', () => {
    const wrapper = renderWithStore(<ControlPanel />, {
      isStopped: true,
      bulldozerPosition: {
        x: 1,
        y: 1,
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for bulldozer being on the starting position', () => {
    const wrapper = renderWithStore(<ControlPanel />);

    expect(wrapper).toMatchSnapshot();
  });
});