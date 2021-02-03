import { siteClearingSimulatorReducer } from '.';
import { BulldozerDirection, moveForward, rotateLeft, rotateRight, SiteCellType, SiteClearingSimulatorState, startSimulation, stopSimulation } from './store-slice';

describe('Site clearing simulator store slice', () => {
  describe('reducer', () => {
    const siteMap: SiteCellType[][] = [
      ['o', 'o', 'T'],
      ['r', 'o', 'r'],
      ['t', 't', 't'],
    ];

    const siteMapInProgress: SiteCellType[][] = [
      ['o', 'o', 'T'],
      ['r', 'B', 'r'],
      ['t', 't', 't'],
    ];

    const getTestState = (overrides: Partial<SiteClearingSimulatorState> = {}): SiteClearingSimulatorState => {
      return {
        map: [],
        isStarted: false,
        bulldozerDirection: BulldozerDirection.Right,
        isStopped: false,
        bulldozerPosition: {
          x: -1,
          y: -1,
        },
        isPreservedTreeRemoved: false,
        fuelUsed: 0,
        ...overrides,
      };
    };

    it('should allow to start simulation', () => {
      const { isStarted } = siteClearingSimulatorReducer(
        getTestState(),
        startSimulation(siteMap)
      );

      expect(isStarted).toEqual(true);
    });

    it('should not have bulldozer present on the map on simulation start', () => {
      const { map } = siteClearingSimulatorReducer(
        getTestState(),
        startSimulation(siteMap)
      );

      const allCells = map.reduce((total, row) => {
        return total.concat(row);
      }, []);

      expect(allCells).not.toContain('B');
    });

    it('should allow to restart simulation', () => {
      const originalState = getTestState({
        map: siteMapInProgress,
        fuelUsed: 4,
        bulldozerPosition: {
          x: 1,
          y: 1,
        }
      });

      const expectedState = getTestState({ map: siteMap });

      const newState = siteClearingSimulatorReducer(
        originalState,
        startSimulation(siteMap),
      );

      expect(newState).toEqual(expectedState);
    });

    describe('moving forward', () => {
      it('should correctly move bulldozer up', () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 }
        };
        const { map, bulldozerPosition: { x, y } } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );

        expect(x).toEqual(0);
        expect(y).toEqual(1);
        expect(map[0][1]).toEqual('B');
      });

      it('should correctly move bulldozer to the right', () => {
        const state = {
          isStarted: true,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Right,
        };
        const { map, bulldozerPosition: { x, y } } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );

        expect(x).toEqual(1);
        expect(y).toEqual(2);
        expect(map[1][2]).toEqual('B');
      });

      it('should correctly move bulldozer down', () => {
        const state = {
          isStarted: true,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Down,
        };
        const { map, bulldozerPosition: { x, y } } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );

        expect(x).toEqual(2);
        expect(y).toEqual(1);
        expect(map[2][0]).toEqual('B');
      });

      it('should correctly move bulldozer to the left', () => {
        const state = {
          isStarted: true,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Left,
        };
        const { map, bulldozerPosition: { x, y } } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );

        expect(x).toEqual(1);
        expect(y).toEqual(0);
        expect(map[1][0]).toEqual('B');
      });
    });

    describe('rotation', () => {
      it('should correctly move bulldozer forward after rotation to the right', () => { 
        const { bulldozerDirection } = siteClearingSimulatorReducer(
          getTestState(),
          rotateRight()
        );

        expect(bulldozerDirection).toEqual(BulldozerDirection.Down);
      });

      it('should correctly move bulldozer forward after rotation to the left', () => {
        const { bulldozerDirection } = siteClearingSimulatorReducer(
          getTestState(),
          rotateLeft()
        );

        expect(bulldozerDirection).toEqual(BulldozerDirection.Up);
      });
    });

    it('should correctly mark already visited cells', () => {
      const state = {
        isStarted: true,
        bulldozerPosition: { x: 1, y: 1 },
        bulldozerDirection: BulldozerDirection.Left,
      };
      const { map } = siteClearingSimulatorReducer(
        getTestState(state),
        moveForward(),
      );

      expect(map[1][1]).toEqual('C');
    });

    describe('fuel usage', () => {
      it('should correctly track movement fuel usage', () => {
        const siteMap: SiteCellType[][] = [
          ['B', 'C', 'T'],
          ['r', 'o', 'r'],
          ['t', 't', 't'],
        ];

        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 0 },
          bulldozerDirection: BulldozerDirection.Right,
        };
        const { fuelUsed } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );

        expect(fuelUsed).toEqual(1);
      });

      it('should correctly track plain land clearing fuel usage', () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Up,
        };
        const { fuelUsed } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );

        expect(fuelUsed).toEqual(1);
      });

      it('should correctly track rocky land clearing fuel usage', () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Left,
        };
        const { fuelUsed } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );

        expect(fuelUsed).toEqual(2);
      });

      it('should correctly track regular tree clearing fuel usage', () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Down,
        };
        const { fuelUsed } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );

        expect(fuelUsed).toEqual(2);
      });
    });

    describe('stopping simulation', () => {
      it('should allow to stop simulation', () => {
        const { isStopped } = siteClearingSimulatorReducer(
          getTestState({ isStarted: true, }),
          stopSimulation()
        );
  
        expect(isStopped).toEqual(true);
      });
  
      it('should stop simulation immediately when attempt to remove preservable tree is performed', () => {
        const siteMap: SiteCellType[][] = [
          ['o', 'B', 'T'],
          ['r', 'C', 'r'],
          ['t', 't', 't'],
        ];
        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 1 },
        };
        const { isStopped } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );
  
        expect(isStopped).toEqual(true);
      });
  
      it('should stop the simulation if bulldozer goes out of map bounds', () => {
        const siteMap: SiteCellType[][] = [
          ['o', 'B', 'T'],
          ['r', 'C', 'r'],
          ['t', 't', 't'],
        ];
        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 1 },
          bulldozerDirection: BulldozerDirection.Up,
        };
        const { isStopped } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward(),
        );
  
        expect(isStopped).toEqual(true);
      });
    });
  });
});
