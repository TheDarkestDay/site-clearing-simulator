import { useSelector } from 'react-redux';
import { isSimulationStarted } from '../selectors';
import { SimulationFileInput } from '../simulation-file-input/SimulationFileInput';
import { SimulatorWindow } from '../simulator-window/SimulatorWindow';

export const SiteClearingSimulator = () => {
  const isStarted = useSelector(isSimulationStarted);

  return (
    <main>
      {
        isStarted
          ? <SimulatorWindow />
          : <SimulationFileInput />
      }
    </main>
  );
};