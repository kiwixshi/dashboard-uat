/* eslint-disable prettier/prettier */

import { createRoot } from 'react-dom/client';
import App from './App';


const container = document.getElementById('blo') as HTMLElement;
const root = createRoot(container);
root.render(
  <App />
);

// calling IPC exposed from preload script
window.electron?.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron?.ipcRenderer.sendMessage('ipc-example', ['ping']);
