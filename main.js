const electron = require('electron');
const getCurrentWindow = electron.getCurrentWindow;
const globalShortcut = electron.globalShortcut
//***//
function createWindow () {
	//***//

}

const {app,BrowserWindow} = electron;
const reload = ()=> getCurrentWindow().reload();

app.on('ready',()=>{
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/appLogo.png'
  });

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

  globalShortcut.register('f5',reload);
  globalShortcut.register('CommandOrControl+R', reload);
  globalShortcut.register('CommandOrControl+R', reload);
  globalShortcut.register('CommandOrControl+U', reload);
  globalShortcut.register('Alt+CommandOrControl+I',reload);
  globalShortcut.register('Alt+CommandOrControl+R',reload);
  // mainWindow.on('closed', function () {
  //   mainWindow = null
  // });
 mainWindow.setMenu(null);
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

