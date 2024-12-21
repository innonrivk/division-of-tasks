const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // For development (local dev server):
  // win.loadURL('http://localhost:3000');

  // For production (after building the React app in frontend/dist):
  // win.loadFile(path.join(__dirname, '../frontend/dist/index.html'));

  // Currently, you’re always pointing to localhost:3000:
  win.loadURL('http://localhost:3000');
} // <-- Make sure to close createWindow here

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
