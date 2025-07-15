import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    api: {
      getTimeToday: () => Promise<any>;
      getUserTime: () => Promise<any>;
    };
  }
}

export {};
