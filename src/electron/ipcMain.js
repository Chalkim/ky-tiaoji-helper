import { ipcMain } from 'electron';

const clc = require('cli-color');
const log = text => {
  console.log(`${clc.blueBright('[ipcMain.js]')} ${text}`);
}

export default function initIpcMain(win, store) {
  ipcMain.on('minimize', () => {
    log('minimize');
    win.minimize();
  });

  ipcMain.on('addToFavorities', (event, record) => {
  })
}
