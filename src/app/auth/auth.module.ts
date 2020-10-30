import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component'
import {AngularMaterialModule} from '../angular-material.module';
import { FlexLayoutModule } from '../../../node_modules/@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports:[
    LoginComponent,
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule
 ]
})
export class AuthModule { }
