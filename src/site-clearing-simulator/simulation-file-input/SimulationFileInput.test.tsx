import { renderWithStore } from '../test-helpers';
import { SimulationFileInput } from './SimulationFileInput';

describe('SimulationFileInput component', () => {
  it('should match snapshot', () => {
    const wrapper = renderWithStore(<SimulationFileInput />);

    expect(wrapper).toMatchSnapshot();
  });
});