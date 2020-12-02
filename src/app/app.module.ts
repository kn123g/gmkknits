import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {AngularMaterialModule} from'./angular-material.module';
import { DashboardModule } from './dashboard/dashboard.module';
import
      { DialogInvoiceNotFoundElementsDialog,
        DialogNoItemsAddedElementsDialog ,
        DialogFabricFoundElementsDialog,
        DialogMillFoundElementsDialog,
        DialogCancelConfirmationElementsDialog,
        DialogLoginWrongPasswordElementsDialog,
        DialogLoginWrongUserElementsDialog,
        DialogLicenseElementsDialog
      }
from './dialog/DialogElementsDialog';

import { HashLocationStrategy,LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,DialogInvoiceNotFoundElementsDialog,
    DialogNoItemsAddedElementsDialog,
    DialogFabricFoundElementsDialog,
    DialogMillFoundElementsDialog,
    DialogCancelConfirmationElementsDialog,
    DialogLoginWrongPasswordElementsDialog,
    DialogLoginWrongUserElementsDialog,
    DialogLicenseElementsDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    AngularMaterialModule,
    DashboardModule
  ],
  providers: [{provide:LocationStrategy,useClass : HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
