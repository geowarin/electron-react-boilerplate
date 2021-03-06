'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
let menu;
let template;
let mainWindow = null;

crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`file://${__dirname}/app/hot-dev-app.html`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/app/app.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.platform === 'darwin') {
    template = [darwinFirstMenu(), darwinEditMenu(), darwinViewMenu(), darwinWindowMenu()];
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = [fileMenu(), viewMenu()];
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
});

// OSX menus
function darwinFirstMenu() {
  return {
    label: 'Electron',
    submenu: [{
      label: 'About ElectronReact',
      selector: 'orderFrontStandardAboutPanel:'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: 'Hide ElectronReact',
      accelerator: 'Command+H',
      selector: 'hide:'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Shift+H',
      selector: 'hideOtherApplications:'
    }, {
      label: 'Show All',
      selector: 'unhideAllApplications:'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click() {
        app.quit();
      }
    }]
  };
}
function darwinEditMenu() {
  return {
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'Command+Z',
      selector: 'undo:'
    }, {
      label: 'Redo',
      accelerator: 'Shift+Command+Z',
      selector: 'redo:'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'Command+X',
      selector: 'cut:'
    }, {
      label: 'Copy',
      accelerator: 'Command+C',
      selector: 'copy:'
    }, {
      label: 'Paste',
      accelerator: 'Command+V',
      selector: 'paste:'
    }, {
      label: 'Select All',
      accelerator: 'Command+A',
      selector: 'selectAll:'
    }]
  };
}
function darwinViewMenu() {
  return {
    label: 'View',
    submenu: (process.env.NODE_ENV !== 'development') ? [{
      label: 'Reload',
      accelerator: 'Command+R',
      click() {
        mainWindow.restart();
      }
    }, {
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click() {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }, {
      label: 'Toggle Developer Tools',
      accelerator: 'Alt+Command+I',
      click() {
        mainWindow.toggleDevTools();
      }
    }] : [{
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click() {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }]
  };
}
function darwinWindowMenu() {
  return {
    label: 'Window',
    submenu: [{
      label: 'Minimize',
      accelerator: 'Command+M',
      selector: 'performMiniaturize:'
    }, {
      label: 'Close',
      accelerator: 'Command+W',
      selector: 'performClose:'
    }, {
      type: 'separator'
    }, {
      label: 'Bring All to Front',
      selector: 'arrangeInFront:'
    }]
  };
}

// default menus
function fileMenu() {
  return {
    label: '&File',
    submenu: [{
      label: '&Open',
      accelerator: 'Ctrl+O'
    }, {
      label: '&Close',
      accelerator: 'Ctrl+W',
      click() {
        mainWindow.close();
      }
    }]
  };
}
function viewMenu() {
  return {
    label: '&View',
    submenu: (process.env.NODE_ENV === 'development') ? [{
      label: '&Reload',
      accelerator: 'Ctrl+R',
      click() {
        mainWindow.restart();
      }
    }, {
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click() {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }, {
      label: 'Toggle &Developer Tools',
      accelerator: 'Alt+Ctrl+I',
      click() {
        mainWindow.toggleDevTools();
      }
    }] : [{
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click() {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }]
  };
}
