const { MSICreator } = require('electron-wix-msi');

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: './gmkknits-invoice-electron-win32-x64',
  description:  'This is a gmkknits invoice application',
  exe: 'gmkknits-invoice-electron',
  name: 'GMKKNITS',
  manufacturer: 'karthikeyan',
  version: '1.1.2',
  outputDirectory: './windows_installer'
});



async function build() {
	await msiCreator.create();
	await msiCreator.compile();
}

build().catch(console.error);
