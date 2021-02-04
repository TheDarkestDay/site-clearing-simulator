import { SiteMap } from '../site-map/SiteMap';
import { ControlPanel } from '../control-panel/ControlPanel';

export const SimulatorWindow = () => {
  return (
    <div>
      <SiteMap />

      <ControlPanel />
    </div>
  );
};