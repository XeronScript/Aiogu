const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('setTitle', title),
    openFile: () => ipcRenderer.invoke('dialog:openFile') // coś w ten deseń podczas podawania platformy i czekania na otzymanie hasła
})
