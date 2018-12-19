// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {remote} = require('electron');
// Open console on 'f12' key press
$(window).keydown(event => {
    if(event.keyCode === 123) {
        let BrowserWindow = remote.getCurrentWindow();
        BrowserWindow.toggleDevTools();
    }
});

console.log($);