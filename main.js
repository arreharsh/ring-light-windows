const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require('electron');
const path = require('path');

let overlayWindow;
let controlWindow;

function createOverlayWindow() {
  const { width, height } = screen.getPrimaryDisplay().bounds;
  
  overlayWindow = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  overlayWindow.loadFile('overlay.html');
  overlayWindow.setIgnoreMouseEvents(true, { forward: true });
  overlayWindow.setAlwaysOnTop(true, 'screen-saver');
}

function createControlWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  controlWindow = new BrowserWindow({
    width: 300,
    height: 380,
    x: width - 400,
    y: height - 600,
    frame: false,
    transparent: true,
    hasShadow: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  controlWindow.loadFile('control.html');
}

app.setLoginItemSettings({
  openAtLogin: true,
  path: app.getPath('exe')
});

app.whenReady().then(() => {
  createOverlayWindow();
  createControlWindow();

  globalShortcut.register('CommandOrControl+Shift+k', () => {
    if (overlayWindow.isVisible()) {
      overlayWindow.hide();
    } else {
      overlayWindow.show();
    }
  });

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    if (controlWindow.isVisible()) {
      controlWindow.hide();
    } else {
      controlWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.on('update-overlay', (event, settings) => {
  overlayWindow.webContents.send('settings-changed', settings);
});

ipcMain.on('toggle-overlay', (event, visible) => {
  if (visible) {
    overlayWindow.show();
  } else {
    overlayWindow.hide();
  }
});

ipcMain.on('minimize-control', () => {
  controlWindow.minimize();
});

ipcMain.on('close-control', () => {
  controlWindow.hide();
});

ipcMain.on('quit-app', () => {
  app.quit();
});