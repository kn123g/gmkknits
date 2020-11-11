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
 const isWindows = process.platform === 'mainWindow32';
  let needsFocusFix = false;
  let triggeringProgrammaticBlur = false;

  mainWindow.on('blur', (event) => {
    if(!triggeringProgrammaticBlur) {
      needsFocusFix = true;
    }
  })

  mainWindow.on('focus', (event) => {
    if(isWindows && needsFocusFix) {
      needsFocusFix = false;
      triggeringProgrammaticBlur = true;
      setTimeout(function () {
        mainWindow.blur();
        mainWindow.focus();
        setTimeout(function () {
          triggeringProgrammaticBlur = false;
        }, 100);
      }, 100);
    }
  })


  //mainWindow.setFullScreen(true);
  mainWindow.maximize();
});

