import React from 'react';
import { renderWithStore } from '../site-clearing-simulator/test-helpers';
import App from './App';

describe('App component', () => {
  it('should match snapshot', () => {
    const wrapper = renderWithStore(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});