// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron');
const {ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');
const path = require('path');

// Automatically reload electron app on save
// !! MUST BE REMOVED OR COMMENTED OUT BEFORE BUILD !!
// require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Build menu from template
const options = [{
    lable: 'File',
    submenu: [
      {role: 'quit'}
    ]
  }, {
    label: 'View',
    submenu: [
      {role: 'toggledevtools'}
    ]
  }
];
const menu = Menu.buildFromTemplate(options);
Menu.setApplicationMenu(menu);

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1920, height: 1080, titleBarStyle: 'customButtonsOnHover', frame: false,
                                  icon: path.join(__dirname, 'client/icons/256x265.png')});

  // and load the index.html of the app.
  mainWindow.loadFile('./client/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  autoUpdater.checkForUpdates();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

/**
 * Auto-Updater listeners
 */

// When the updater is checking for an update
// let the browser window know.
autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('checkingForUpdate');
});

// When downloading a new update
// let the browser window know.
autoUpdater.on('download-progress', () => {
  mainWindow.webContents.send('downloadProgress');
});

// When no update is available
// let the browser window know.
autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('updateNotAvailable');
});

// When the update has been downloaded and is ready to be
// installed, let the browser window know.
autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('updateReady');
});

ipcMain.on('quitAndInstall', (event, arg) => {
  autoUpdater.quitAndInstall();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
