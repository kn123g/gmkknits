import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component'
import {AngularMaterialModule} from '../angular-material.module';
import { FlexLayoutModule } from '../../../node_modules/@angular/flex-layout';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports:[
    LoginComponent,
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class AuthModule { }
