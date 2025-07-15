// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
/* eslint-disable prettier/prettier */

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('api', {
  getUsers: () => ipcRenderer.invoke('get-users'),
  getUserRanks: () => ipcRenderer.invoke('get-user-ranks'),
  getAvgUserTime: () => ipcRenderer.invoke('get-avg-time-tdy'),
  getTimeofDays: (time: number)=> ipcRenderer.invoke('get-time-in-days', time),
  getTotalTimeTdy: ()=>ipcRenderer.invoke('get-active-tdy'),
  getTimeBreakdown: (username: string, date:string)=>ipcRenderer.invoke('get-user-deets-day', username, date),
});

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
