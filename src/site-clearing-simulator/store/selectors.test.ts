import { getFuelCost, getUnclearedCellsCost, isBulldozerOnStartingPosition } from './selectors';
import { getTestState } from '../test-helpers';

describe('Site clearing simulator selectors', () => {
  describe('getFuelCost', () => {
    it('should correctly calculate total fuel cost', () => {
      const testState = getTestState({
        fuelUsed: 6
      });

      expect(getFuelCost({ siteClearingSimulator: testState })).toEqual(6);
    });
  });

  describe('getUnclearCellsCost', () => {
    it('should correctly calculate cost of uncleared cells', () => {
      const testState = getTestState({
        map: [
          ['C', 'C', 'T'],
          ['r', 'B', 'r'],
          ['t', 't', 't'],
        ]
      });

      expect(getUnclearedCellsCost({ siteClearingSimulator: testState })).toEqual(15);
    });
  });

  describe('isBulldozerOnStartingPosition', () => {
    it('should correctly indicate that bulldozer is on its starting position', () => {
      const testState = getTestState();

      expect(isBulldozerOnStartingPosition({ siteClearingSimulator: testState })).toEqual(true);
    });

    it('should correctly indicate that bulldozer is not on its starting position', () => {
      const testState = getTestState({
        map: [
          ['C', 'C', 'T'],
          ['r', 'B', 'r'],
          ['t', 't', 't'],
        ],
        bulldozerPosition: {
          x: 1,
          y: 1
        }
      });

      expect(isBulldozerOnStartingPosition({ siteClearingSimulator: testState })).toEqual(false);
    });
  });
});