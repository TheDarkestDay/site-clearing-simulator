import { shallow } from 'enzyme';
import { SiteMap } from './SiteMap';

describe('SiteMap', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SiteMap />);

    expect(wrapper).toMatchSnapshot();
  });
});