const {app, BrowserWindow, Menu,} = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
Menu.setApplicationMenu(null);

let eliteScript = fs.readFileSync('elite.js', 'utf8');

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 960,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        icon: 'favicon.ico',
    });

    mainWindow.setTitle("Pendoria");

    mainWindow.loadURL('https://pendoria.net').then(function () {

        mainWindow.webContents.executeJavaScript("(function(){" + eliteScript + "})()").then(function () {
            mainWindow.show();
        });

    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
