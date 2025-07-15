import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    api: {
      getUsers: () => Promise<any>|undefined;
      getUserRanks: () => Promise<any>|undefined;
      getAvgUserTime: () => Promise<any>|undefined;
      getTimeofDays: (time: number) => Promise<any>|undefined;
      getTotalTimeTdy: () => Promise<any>|undefined;
      getTimeBreakdown: (username: string, date: string) => Promise<any>|undefined;
    };
  }
}

export {};
