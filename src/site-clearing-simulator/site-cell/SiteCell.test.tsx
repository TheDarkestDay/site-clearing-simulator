import { shallow } from 'enzyme';
import React from 'react';
import { SiteCellType } from '../store-slice';
import { SiteCell } from './SiteCell';

const cellTypes: SiteCellType[] = [
  'o',
  't',
  'r',
  'T'
];

describe('SiteCell', () => {
  cellTypes.forEach((cellType) => {
    it(`should match snapshot for cell type ${cellType}`, () => {
      const wrapper = shallow(<SiteCell type={cellType}/>);

      expect(wrapper).toMatchSnapshot();
    });
  });
});