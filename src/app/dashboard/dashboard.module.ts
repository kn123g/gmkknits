import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {  AngularMaterialModule } from '../angular-material.module';
import { AppRoutingModule } from '../app-routing.module';
import {FormsModule} from '@angular/forms';
import{DashboardRoutingModule} from './dashboard-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { FlexLayoutModule } from '../../../node_modules/@angular/flex-layout';

@NgModule({
  declarations: [ DashboardComponent, InvoiceComponent],
  imports:[AngularMaterialModule,CommonModule,FormsModule,AppRoutingModule,DashboardRoutingModule,FlexLayoutModule],
  exports : [DashboardComponent,DashboardRoutingModule,InvoiceComponent,FlexLayoutModule]
})
export class DashboardModule {

 }
