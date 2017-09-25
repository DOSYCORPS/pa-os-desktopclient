"use strict";
{
  const electron = require('electron')
  const app = electron.app
  const BrowserWindow = electron.BrowserWindow
  const path = require('path');
  const url = require('url');
  const comms = require('./comms.js');
  const appMenu = require('./appMenu.js');

  // enable our switches
  app.setPath('userData', path.join( require('os').homedir(), 'chrome-working-directory'));
  app.commandLine.appendSwitch('remote-debugging-port','9222');
  app.commandLine.appendSwitch('touch-events', 'enabled');

  let mainWindow;

  Object.assign( global, { mainWindow } );

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });

  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  });

  function createWindow () {
    // Create the browser window.
    // TODO: keep resizable to false while we develop the various app components and interface
    // later we deal with interface workability under window resize
    const {height} = electron.screen.getPrimaryDisplay().size;

    mainWindow = new BrowserWindow({x: 50, y: 50, width: 1450, height: 680, useContentSize: true, resizable: false});

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    appMenu.install();
    comms.install();

    // Open the DevTools.
    mainWindow.webContents.openDevTools({mode:'undocked'});

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    });
  }
}

