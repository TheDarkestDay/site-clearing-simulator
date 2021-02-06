import { BulldozerDirection } from '../store/store-slice';
import { renderWithStore } from '../test-helpers';
import { Bulldozer } from './Bulldozer';

describe('Bulldozer', () => {
  it('should match snapshot for bulldozer direction up', () => {
    const wrapper = renderWithStore(<Bulldozer />, {
      bulldozerDirection: BulldozerDirection.Up,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for bulldozer direction right', () => {
    const wrapper = renderWithStore(<Bulldozer />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for bulldozer direction down', () => {
    const wrapper = renderWithStore(<Bulldozer />, {
      bulldozerDirection: BulldozerDirection.Down,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot for bulldozer direction left', () => {
    const wrapper = renderWithStore(<Bulldozer />, {
      bulldozerDirection: BulldozerDirection.Left,
    });

    expect(wrapper).toMatchSnapshot();
  });
});