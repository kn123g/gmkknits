import {Component} from '@angular/core';


@Component({
  template: `<h1 mat-dialog-title>No items added to Invoice</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" mat-dialog-close>Close</button>
  </div>`,
})
export class DialogNoItemsAddedElementsDialog{
}

@Component({
  template: `<h1 mat-dialog-title>Invoice record not found</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary"  mat-dialog-close>Close</button>
  </div>`,
})
export class DialogInvoiceNotFoundElementsDialog{
}


@Component({
  template: `<h1 mat-dialog-title>Fabric already exist, Please add new one or edit existing one</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" mat-dialog-close>Close</button>
  </div>`,
})
export class DialogFabricFoundElementsDialog{
}


@Component({
  template: `<h1 mat-dialog-title>Mill already exist, Please add new one or edit existing one</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" mat-dialog-close>Close</button>
  </div>`,
})
export class DialogMillFoundElementsDialog{
}


@Component({
  template: `<h1 mat-dialog-title>Do you want to cancel</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" (click)="confirmation()">Yes</button>
    <button mat-raised-button color="primary" (click)="nonConfirmation()">No</button>
  </div>`,
})
export class DialogCancelConfirmationElementsDialog{

  confirmation(){}
  nonConfirmation(){}

  constructor() {
  }
}


@Component({
  template: `<h1 mat-dialog-title>Wrong User ID</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" mat-dialog-close>Close</button>
  </div>`,
})
export class DialogLoginWrongUserElementsDialog{
}
@Component({
  template: `<h1 mat-dialog-title>Wrong Password</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" mat-dialog-close>Close</button>
  </div>`,
})
export class DialogLoginWrongPasswordElementsDialog{
}
@Component({
  template: `<h1 mat-dialog-title>Hobby Corporation License Expired</h1>
  <div mat-dialog-actions>
    <button mat-raised-button color="primary" mat-dialog-close>Close</button>
  </div>`,
})
export class DialogLicenseElementsDialog{
}
