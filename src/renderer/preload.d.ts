import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    api: {
      getUsers: () => Promise<any>;
      getUserRanks: () => Promise<any>;
      getAvgUserTime: () => Promise<any>;
      getTimeofDays: (time: number) => Promise<any>;
      getTotalTimeTdy: () => Promise<any>;
      getTimeBreakdown: (username: string, date: string) => Promise<any>;
    };
  }
}

export {};
