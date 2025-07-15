/* eslint global-require: off, no-console: off, promise/always-return: off */
/* eslint-disable prettier/prettier */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { emitter, getFilePath } from './filePathName';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { selectAvgUserTime, selectUserTimePerDays, selectUserRanking, selectTotalTimeToday, selectUserTimeBreakdown, selectUsers } from './db';

let dbPath = "C:\\Users\\shiva\\OneDrive\\Documents\\test\\jsotest.db";

emitter.on('db-alter', ()=>{
  console.log('new path is: ', getFilePath())
})

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug').default();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer.default(extensions.map((name) => installer[name]), forceDownload).catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

ipcMain.handle('get-user-ranks', async()=>{
  if(dbPath){
    return selectUserRanking(dbPath);
  }
});

ipcMain.handle('get-avg-time-tdy', async()=>{
  if(dbPath){
    return selectAvgUserTime(dbPath);
  }

});

ipcMain.handle('get-time-in-days', async(event: Electron.IpcMainInvokeEvent, time: number)=>{
  if(dbPath){
    return selectUserTimePerDays(dbPath, time);
  }

})

ipcMain.handle('get-active-tdy', async()=>{
  if(!dbPath) return;
  return selectTotalTimeToday(dbPath);
})

ipcMain.handle('get-user-deets-day', async(event: Electron.IpcMainInvokeEvent, username: string, date: string)=>{
  if(!dbPath) return;
  return selectUserTimeBreakdown(dbPath, username, date);
})

ipcMain.handle('get-users', async()=>{
  if(!dbPath) return;
  return selectUsers(dbPath);
})

app.on('window-all-closed', () => {
  app.quit();
});

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  }).catch(console.log);
