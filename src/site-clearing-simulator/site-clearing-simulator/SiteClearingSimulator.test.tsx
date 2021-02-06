import { renderWithStore } from '../test-helpers';
import { SiteClearingSimulator } from './SiteClearingSimulator';

describe('SiteClearingSimulator component', () => {
  it('should match snapshot', () => {
    const wrapper = renderWithStore(<SiteClearingSimulator />);

    expect(wrapper).toMatchSnapshot();
  });
});