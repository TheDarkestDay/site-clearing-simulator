import { renderWithStore } from '../test-helpers';
import { ExpensesReport } from './ExpensesReport';

describe('ExpensesReport component', () => {
  it('should match snapshot for expenses without preserved tree charge', () => {
    const wrapper = renderWithStore(<ExpensesReport />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for expenses with preserved tree charge', () => {
    const wrapper = renderWithStore(<ExpensesReport />, {
      isPreservedTreeRemoved: true,
    });

    expect(wrapper).toMatchSnapshot();
  });
});