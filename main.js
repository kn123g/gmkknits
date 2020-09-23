const electron = require('electron');
const globalShortcut = electron.globalShortcut
//***//
function createWindow () {
	//***//

}

const {app,BrowserWindow} = electron;
app.on('ready',()=>{
  const mainWindow = new BrowserWindow();

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

  globalShortcut.register('f5', function() {
		console.log('f5 is pressed')
		mainWindow.reload();
	});
	globalShortcut.register('CommandOrControl+R', function() {
		console.log('CommandOrControl+R is pressed')
		mainWindow.reload();
  });
  // mainWindow.on('closed', function () {
  //   mainWindow = null
  // });
 // mainWindow.setMenu(null);


  //mainWindow.setFullScreen(true);
  mainWindow.maximize();
});

