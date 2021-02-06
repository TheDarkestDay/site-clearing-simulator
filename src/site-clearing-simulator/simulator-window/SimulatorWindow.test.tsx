import { renderWithStore } from '../test-helpers';
import { SimulatorWindow } from './SimulatorWindow';

describe('SimulatorWindow component', () => {
  it('should match snapshot', () => {
    const wrapper = renderWithStore(<SimulatorWindow />);

    expect(wrapper).toMatchSnapshot();
  });
});