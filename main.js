const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

const setTitle = () => {
    ipcMain.on('setTitle', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents);
        win.setTitle(title);
    })
}

const openFile = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (canceled) {}
    else {
        return filePaths[0]
    }
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html').then(r => {})
}

app.whenReady().then( () => {
    ipcMain.on('setTitle', setTitle)
    ipcMain.handle('dialog:openFile', openFile)
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process !== 'darwin')
        app.quit()
})
