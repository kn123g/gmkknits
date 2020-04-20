const electron = require('electron');
//import electron from 'electron';

const {app,BrowserWindow} = electron;
app.on('ready',()=>{
  const mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  //mainWindow.loadURL('https://www.google.com');
  console.log('app is ready');
});
