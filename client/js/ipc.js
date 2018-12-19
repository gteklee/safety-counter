const ipcRenderer = require('electron').ipcRenderer;
let update = false;

/**
 * Checking for update - inform user.
 */
ipcRenderer.on('checkingForUpdate', (event, text) => {
    $('#update-ready p').text('Checking for updates...');
});

/**
 * Downloading update - inform user.
 */
ipcRenderer.on('downloadProgress', (event, text) => {
    $('#update-ready p').text('Downloading update...');
});

/**
 * When no update is found, inform the user they are
 * up-to-date.
 */
ipcRenderer.on('updateNotAvailable', (event, text) => {
    $('#update-ready p').text('Up To Date!');
});

/**
 * When the update is ready, inform the user and provide
 * the option to install the new update.
 */
ipcRenderer.on('updateReady', (event, text) => {
    $('#update-ready p').text('Update Is Available!');
    $('#update-ready p').css('color', 'red');
    $('#update-ready').addClass('version-update');
    update = true;
});




/**
 * On version click - update software if needed.
 */
$('#update-ready').on('click', () => {
    if(update)  // If we are ready to update.
    {
        ipcRenderer.send('quitAndInstall');
        $('#update-ready p').text('Updating...');
        update = false;
    }
});