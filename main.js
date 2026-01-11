const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require("electron");
const path = require("path");

let overlayWindow;
let controlWindow;

function createOverlayWindow() {
  const { width, height } = screen.getPrimaryDisplay().bounds;

  overlayWindow = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    show: false, // 👈 IMPORTANT
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  overlayWindow.loadFile("overlay.html");
  overlayWindow.setIgnoreMouseEvents(true, { forward: true });
  overlayWindow.setAlwaysOnTop(true, "screen-saver");
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
    show: false, // 👈 IMPORTANT
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  controlWindow.loadFile("control.html");
}


app.whenReady().then(() => {
  createOverlayWindow();
  createControlWindow();

  // 🔦 Toggle ring light
  globalShortcut.register("CommandOrControl+Shift+K", () => {
    if (!overlayWindow) return;

    overlayWindow.isVisible()
      ? overlayWindow.hide()
      : overlayWindow.show();
  });

  // 🎛 Toggle control panel
  globalShortcut.register("CommandOrControl+Shift+C", () => {
    if (!controlWindow) return;

    controlWindow.isVisible()
      ? controlWindow.hide()
      : controlWindow.show();
  });
});


app.on("window-all-closed", (e) => {
  e.preventDefault();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});


ipcMain.on("update-overlay", (event, settings) => {
  if (overlayWindow) {
    overlayWindow.webContents.send("settings-changed", settings);
  }
});

ipcMain.on("toggle-overlay", (event, visible) => {
  if (!overlayWindow) return;

  visible ? overlayWindow.show() : overlayWindow.hide();
});

ipcMain.on("minimize-control", () => {
  if (controlWindow) controlWindow.hide();
});

ipcMain.on("close-control", () => {
  if (controlWindow) controlWindow.hide();
});

ipcMain.on("quit-app", () => {
  app.quit();
});
