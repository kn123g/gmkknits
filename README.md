# Credentials

username of application should be : gmkknits , password can be any 

# Install node package and electron
npm i

npm i electron -g

# Build project 
ng build --prod

# Electron app run
electron .

# Generate Exe file
ng build --prod

electron-builder -w

# package electron app
ng build --prod

electron-packager .

electron-packager . --platform=win32 --arch=x64 gmkknits

# MSI installer file creation
## install below software
  https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311.exe

  press install button on wix installed app

  find bin directory and add to path environment variable(C:\Program Files (x86)\WiX Toolset v3.11\bin)
## verify by below command
  candle
## install electron-wix-msi package
  npm install electron-wix-msi --save-dev
## Run build_installer
  node build_installer.js
  
  
# GmkknitsInvoiceElectron

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

