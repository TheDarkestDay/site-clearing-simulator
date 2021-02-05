import { renderWithStore } from '../test-helpers';
import { SiteMap } from './SiteMap';

describe('SiteMap', () => {
  it('should match snapshot for empty map', () => {
    const wrapper = renderWithStore(<SiteMap className='siteMap'/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for valid map', () => {
    const wrapper = renderWithStore(<SiteMap className='siteMap'/>, {
      map: [
        ['o', 'o', 'o'],
        ['t', 'r', 'o'],
        ['t', 'r', 'T'],
      ]
    });

    expect(wrapper).toMatchSnapshot();
  });
});