const button = document.getElementById('confirm');
const platformName = document.getElementById('iplatform')

button.addEventListener('click', async () => {
    const platform = platformName.value;
    // window.electronAPI.setTitle(title);
    const filePath = await window.electronAPI.openFile()
    if (filePath)
        platformName.value = filePath
    else
        platformName.value = "Twoja stara"
})
