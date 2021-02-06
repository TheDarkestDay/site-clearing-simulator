import { siteClearingSimulatorReducer } from "..";
import {
  BulldozerDirection,
  moveForward,
  resetSimulation,
  rotateLeft,
  rotateRight,
  SiteCellType,
  startSimulation,
  stopSimulation,
} from "./store-slice";
import { getTestState } from '../test-helpers';
import { LogEntryType } from './log-entry-type';

describe("Site clearing simulator store slice", () => {
  describe("reducer", () => {
    const siteMap: SiteCellType[][] = [
      ["o", "o", "T"],
      ["r", "o", "r"],
      ["t", "t", "t"],
    ];

    const siteMapInProgress: SiteCellType[][] = [
      ["o", "o", "T"],
      ["r", "B", "r"],
      ["t", "t", "t"],
    ];

    it("should allow to start simulation", () => {
      const { isStarted } = siteClearingSimulatorReducer(
        getTestState(),
        startSimulation(siteMap)
      );

      expect(isStarted).toEqual(true);
    });

    it("should not have bulldozer present on the map on simulation start", () => {
      const { map } = siteClearingSimulatorReducer(
        getTestState(),
        startSimulation(siteMap)
      );

      const allCells = map.reduce((total, row) => {
        return total.concat(row);
      }, []);

      expect(allCells).not.toContain("B");
    });

    it("should allow to reset simulation", () => {
      const originalState = getTestState({
        map: siteMapInProgress,
        fuelUsed: 4,
        bulldozerPosition: {
          x: 1,
          y: 1,
        },
      });

      const expectedState = getTestState();

      const newState = siteClearingSimulatorReducer(
        originalState,
        resetSimulation()
      );

      expect(newState).toEqual(expectedState);
    });

    describe("moving forward", () => {
      it("should correctly move bulldozer up", () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Up,
        };
        const {
          map,
          bulldozerPosition: { x, y },
        } = siteClearingSimulatorReducer(getTestState(state), moveForward());

        expect(x).toEqual(0);
        expect(y).toEqual(1);
        expect(map[0][1]).toEqual("B");
      });

      it("should correctly move bulldozer to the right", () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 },
        };
        const {
          map,
          bulldozerPosition: { x, y },
        } = siteClearingSimulatorReducer(getTestState(state), moveForward());

        expect(x).toEqual(1);
        expect(y).toEqual(2);
        expect(map[1][2]).toEqual("B");
      });

      it("should correctly move bulldozer down", () => {
        const state = {
          isStarted: true,
          bulldozerPosition: { x: 1, y: 1 },
          map: siteMapInProgress,
          bulldozerDirection: BulldozerDirection.Down,
        };
        const {
          map,
          bulldozerPosition: { x, y },
        } = siteClearingSimulatorReducer(getTestState(state), moveForward());

        expect(x).toEqual(2);
        expect(y).toEqual(1);
        expect(map[2][1]).toEqual("B");
      });

      it("should correctly move bulldozer to the left", () => {
        const state = {
          isStarted: true,
          bulldozerPosition: { x: 1, y: 1 },
          map: siteMapInProgress,
          bulldozerDirection: BulldozerDirection.Left,
        };
        const {
          map,
          bulldozerPosition: { x, y },
        } = siteClearingSimulatorReducer(getTestState(state), moveForward());

        expect(x).toEqual(1);
        expect(y).toEqual(0);
        expect(map[1][0]).toEqual("B");
      });
    });

    describe("rotation", () => {
      it("should correctly move bulldozer forward after rotation to the right", () => {
        const { bulldozerDirection } = siteClearingSimulatorReducer(
          getTestState(),
          rotateRight()
        );

        expect(bulldozerDirection).toEqual(BulldozerDirection.Down);
      });

      it("should correctly move bulldozer forward after rotation to the left", () => {
        const { bulldozerDirection } = siteClearingSimulatorReducer(
          getTestState(),
          rotateLeft()
        );

        expect(bulldozerDirection).toEqual(BulldozerDirection.Up);
      });

      it("should correctly switch direction from left to up", () => {
        const { bulldozerDirection } = siteClearingSimulatorReducer(
          getTestState({
            bulldozerDirection: BulldozerDirection.Left
          }),
          rotateRight()
        );

        expect(bulldozerDirection).toEqual(BulldozerDirection.Up);
      });

      it("should correctly switch direction from up to left", () => {
        const { bulldozerDirection } = siteClearingSimulatorReducer(
          getTestState({
            bulldozerDirection: BulldozerDirection.Up
          }),
          rotateLeft()
        );

        expect(bulldozerDirection).toEqual(BulldozerDirection.Left);
      });
    });

    it("should correctly mark already visited cells", () => {
      const state = {
        isStarted: true,
        map: siteMap,
        bulldozerPosition: { x: 1, y: 1 },
        bulldozerDirection: BulldozerDirection.Left,
      };
      const { map } = siteClearingSimulatorReducer(
        getTestState(state),
        moveForward()
      );

      expect(map[1][1]).toEqual("C");
    });

    describe("fuel usage", () => {
      it("should correctly track movement fuel usage", () => {
        const siteMap: SiteCellType[][] = [
          ["B", "C", "T"],
          ["r", "o", "r"],
          ["t", "t", "t"],
        ];

        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 0 },
          bulldozerDirection: BulldozerDirection.Right,
        };
        const { fuelUsed } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        expect(fuelUsed).toEqual(1);
      });

      it("should correctly track plain land clearing fuel usage", () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Up,
        };
        const { fuelUsed } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        expect(fuelUsed).toEqual(1);
      });

      it("should correctly track rocky land clearing fuel usage", () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Left,
        };
        const { fuelUsed } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        expect(fuelUsed).toEqual(2);
      });

      it("should correctly track regular tree clearing fuel usage", () => {
        const state = {
          isStarted: true,
          map: siteMapInProgress,
          bulldozerPosition: { x: 1, y: 1 },
          bulldozerDirection: BulldozerDirection.Down,
        };
        const { fuelUsed } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        expect(fuelUsed).toEqual(2);
      });
    });

    describe('logging', () => {
      it('should properly log rotation to the left', () => {
        const { eventsLog } = siteClearingSimulatorReducer(
          getTestState(),
          rotateLeft()
        );

        const [trackedEvent] = eventsLog;

        expect(trackedEvent).toEqual({
          type: LogEntryType.RotateLeft,
          description: 'Rotate left',
        });
      });

      it('should properly log rotation to the right', () => {
        const { eventsLog } = siteClearingSimulatorReducer(
          getTestState(),
          rotateRight()
        );

        const [trackedEvent] = eventsLog;

        expect(trackedEvent).toEqual({
          type: LogEntryType.RotateRight,
          description: 'Rotate right',
        });
      });

      it('should properly log move forward', () => {
        const testState = getTestState({
          map: siteMapInProgress,
          bulldozerPosition: {
            x: 1,
            y: 1,
          }
        });

        const { eventsLog } = siteClearingSimulatorReducer(
          testState,
          moveForward()
        );
        
        const [trackedEvent] = eventsLog;

        expect(trackedEvent).toEqual({
          type: LogEntryType.MoveTo,
          description: 'Move to 1-2',
        });
      });

      it('should properly log simulation halt by a user', () => {
        const { eventsLog } = siteClearingSimulatorReducer(
          getTestState({ isStarted: true }),
          stopSimulation()
        );
        const [trackedEvent] = eventsLog;

        expect(trackedEvent).toEqual({
          type: LogEntryType.Stop,
          description: 'Simulation was stopped by the user',
        });
      });

      it('should properly log stop message for fully cleared field', () => {
        const siteMap: SiteCellType[][] = [
          ["B", "o"],
          ["C", "C"],
        ];
        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 0 },
        };

        const { eventsLog } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );
        const [ , stopEventEntry] = eventsLog;

        expect(stopEventEntry).toEqual({
          type: LogEntryType.Stop,
          description: 'Simulation stopped: there are no more fields to clear',
        });
      });

      it('should properly log stop message for moving out of bounds', () => {
        const siteMap: SiteCellType[][] = [
          ["o", "B", "T"],
          ["r", "C", "r"],
          ["t", "t", "t"],
        ];
        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 1 },
          bulldozerDirection: BulldozerDirection.Up,
        };
        const { eventsLog } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        const [trackedEvent] = eventsLog;

        expect(trackedEvent).toEqual({
          type: LogEntryType.Stop,
          description: 'Simulation stopped: bulldozer left the site boundaries',
        });
      });

      it('should properly log stop message for removing preservable tree', () => {
        const siteMap: SiteCellType[][] = [
          ["o", "B", "T"],
          ["r", "C", "r"],
          ["t", "t", "t"],
        ];
        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 1 },
        };
        const { eventsLog } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        const [trackedEvent] = eventsLog;

        expect(trackedEvent).toEqual({
          type: LogEntryType.Stop,
          description: 'Simulation stopped: an attempt to remove preservable tree was performed',
        });
      });
    });

    describe("stopping simulation", () => {
      it("should allow to stop simulation", () => {
        const { isStopped } = siteClearingSimulatorReducer(
          getTestState({ isStarted: true }),
          stopSimulation()
        );

        expect(isStopped).toEqual(true);
      });

      it("should stop simulation immediately when attempt to remove preservable tree is performed", () => {
        const siteMap: SiteCellType[][] = [
          ["o", "B", "T"],
          ["r", "C", "r"],
          ["t", "t", "t"],
        ];
        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 1 },
        };
        const { isStopped } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        expect(isStopped).toEqual(true);
      });

      it("should stop the simulation if bulldozer goes out of map bounds", () => {
        const siteMap: SiteCellType[][] = [
          ["o", "B", "T"],
          ["r", "C", "r"],
          ["t", "t", "t"],
        ];
        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 1 },
          bulldozerDirection: BulldozerDirection.Up,
        };
        const { isStopped } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        expect(isStopped).toEqual(true);;
      });

      it("should stop automatically when there are no more fields to clear", () => {
        const siteMap: SiteCellType[][] = [
          ["B", "o"],
          ["T", "C"],
        ];
        const state = {
          isStarted: true,
          map: siteMap,
          bulldozerPosition: { x: 0, y: 0 },
        };
        const { isStopped } = siteClearingSimulatorReducer(
          getTestState(state),
          moveForward()
        );

        expect(isStopped).toEqual(true);
      });
    });
  });
});
