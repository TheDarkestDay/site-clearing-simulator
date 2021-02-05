import React from 'react';
import { create } from 'react-test-renderer';
import { SiteCellType } from '../store/store-slice';
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
      const wrapper = create(<SiteCell type={cellType}/>);

      expect(wrapper).toMatchSnapshot();
    });
  });
});