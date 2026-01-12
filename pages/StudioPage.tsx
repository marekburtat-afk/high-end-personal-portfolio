import { Studio } from 'sanity';
import config from '../sanity.config';

export const StudioPage = () => {
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      <Studio config={config} />
    </div>
  );
};