import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {  MatTableDataSource } from '@angular/material/table';
import{InvoiceTable,Invoice} from './Invoice.Model';
import{InvoicePouch} from './pouchdb/invoicePouch';
import{InvoiceReport} from './invoice.report';
import{Router} from '@angular/router';
import { Fabric,Mill } from '../add-items/Items.Model';
import {ItemPouch} from '../add-items/pouchdb/itemsPouch';
import {CustomerModel} from './customer.Model';
import {CustomerPouch} from './pouchdb/customerPouch';
import {MatDialog} from '@angular/material/dialog';
import {DialogInvoiceNotFoundElementsDialog,DialogNoItemsAddedElementsDialog,
  DialogCancelConfirmationElementsDialog,DialogLicenseElementsDialog} from '../../dialog/DialogElementsDialog';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})


export class InvoiceComponent implements OnInit {



  tableRowformValid = true;
  invoiceFormValid = true;
  date = new FormControl(new Date());
  rowDate = new FormControl(new Date());
  rowWeight : number ;
  rowPrice : number ;
  rowCount : number =1;
  customerControl = new FormControl();
  customerGSTNo : string;
  customerAddress : string;
  customerPhoneNo : string;
  fabricControl = new FormControl();
  millControl = new FormControl();
  customerOptions: string[] =  [];
  //['One', 'Two', 'Three'];
  customer : CustomerModel = new CustomerModel() ;
  fabricOptions: string[] = [];
  //['cotton', 'polyester', 'somethng'];
  millOptions: string[] = [];
  //['TCS', 'CSK', 'MI'];
  fabricAddRow : Fabric ;
  millAddRow : Mill ;
  displayedColumns: string[] = ['sno','dc', 'date', 'fabric', 'count','mill','dia','weight','price','amount','edit','delete'];
 // tableDate : Date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  listData: InvoiceTable[] = [];
  invoice  : Invoice ;
  invoiceNo : number;
  invoiceLicenseNo : number;
  // = [
  //  {sno: 1, dc: "dc",date: this.tableDate.toDateString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
  //    weight:4,price:600000,amount:1000000},
  //  {sno: 2, dc: "dc",date:  this.tableDate.toDateString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
  //    weight:4,price:600000,amount:1000000}
  //];
  dataSource : MatTableDataSource<InvoiceTable>;
  addRow : InvoiceTable ;
  sgst : number = 0;
  cgst : number = 0;
  total : number =0;
  grandTotal : number =0;

  filteredCustomerOptions: Observable<string[]>;
  filteredFabricOptions: Observable<string[]>;
  filteredMillOptions: Observable<string[]>;
  invoiceReport ;

  constructor(public invoicePdb : InvoicePouch,public items : ItemPouch,
    public customers : CustomerPouch, private router : Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.customerGSTNo="";
    this.customerAddress ="";
    this.customerPhoneNo ="";
    this.invoicePdb.getInvoiceNo().then((result)=> {
      console.log("invoice number : " +  (( (Number(new Date().getFullYear().toString().substr(-2))) * 10000) + (result.length +1)));
   //  this.invoiceNo = (((new Date().getDate() * 100) + (new Date().getMonth() + 1))*10000)  + (result.length +1);
   this.invoiceNo = (( (Number(new Date().getFullYear().toString().substr(-2))) * 10000) + (result.length +1));
      this.invoiceLicenseNo  = result.length;
    });

    this.items.getAllFabrics().then(result => {
      result.forEach((data)=>{
        this.fabricOptions.push(data.doc.fabricName);
      });
      this.autoCompleteReset();
    });

    this.items.getAllMills().then(result => {
      result.forEach((data)=>{
        this.millOptions.push(data.doc.millName);
      });
      this.autoCompleteReset();
    });

    this.customers.getAllCustomers().then(result => {
      result.forEach((data)=>{
        this.customerOptions.push(data.doc.customer);
      });
      this.autoCompleteReset();
    });


  }
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.customerOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  private _filterFabric(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fabricOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  private _filterMill(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.millOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private autoCompleteReset(){
    this.filteredCustomerOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCustomer(value))
    );
    this.filteredFabricOptions = this.fabricControl.valueChanges.pipe(

      startWith(''),
      map(value => this._filterFabric(value))
    );
    this.filteredMillOptions = this.millControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMill(value))
    );
   }

   add(tableRow:NgForm){
     console.log("add");
    if(tableRow.invalid)
    {
      this.tableRowformValid = false;
      console.log("invoice.component.ts = > invalid tableRow form");
    }
    else{
       this.addRow =
        {
        invoiceNo : this.invoiceNo ,
        sno: this.listData.length + 1,
        dc: tableRow.value.dc,
        date: String(this.rowDate.value).substr(4, 12),
        fabric: this.fabricControl.value,
        count: tableRow.value.count,
        mill :  this.millControl.value,
        dia: tableRow.value.dia,
        amount: Number (Number (tableRow.value.price * tableRow.value.weight * tableRow.value.count).toFixed(2)) ,
        price: tableRow.value.price,
        weight: tableRow.value.weight
        };
        this.listData.push(this.addRow);
        this.dataSource = new MatTableDataSource<InvoiceTable>(this.listData);
        tableRow.resetForm();
        this.autoCompleteReset();
        this.fabricControl.reset();
        this.millControl.reset();
        this.tableRowformValid = true;
        this.rowCount = 1;
        console.log(this.dataSource);
        this.rowDate.setValue(new Date());
        this.calculate();
    }
    }


    delete(sno:number){
      const deletedData : InvoiceTable[] =
      this.listData.filter((element, index, array) => {
        return (element.sno != sno);
     });
     var count : number = 0;
     var modifiedSno : InvoiceTable[] =  deletedData.map((element)=>{
      element.sno = count+1;
      count++;
      return element;
     });
     this.listData = modifiedSno;
     this.dataSource = new MatTableDataSource<InvoiceTable>(this.listData);
     this.calculate();
    }

    edit(sno:number,tableRow:NgForm){

      var editData : InvoiceTable ;
      editData = this.listData[sno-1];
      const deletedData : InvoiceTable[] =
      this.listData.filter((element, index, array) => {
        return (element.sno != sno);
     });
     var count : number = 0;
     var modifiedSno : InvoiceTable[] =  deletedData.map((element)=>{
      element.sno = count+1;
      count++;
      return element;
     });
     this.listData = modifiedSno;
     this.dataSource = new MatTableDataSource<InvoiceTable>(this.listData);

     console.log(editData);
     tableRow.controls.dc.setValue(editData.dc);
     this.rowDate.setValue( new  Date (editData.date));
     this.fabricControl.setValue(editData.fabric);
     tableRow.controls.count.setValue(editData.count);
     this.millControl.setValue(editData.mill);
     tableRow.controls.dia.setValue(editData.dia);
     tableRow.controls.weight.setValue(editData.weight);
     tableRow.controls.price.setValue(editData.price);
     this.calculate();
    }

    calculate(){
      if(this.listData.length > 0){
        this.total = this.listData.map(t => t.amount).reduce((acc, value) => acc + value, 0);
        this.cgst = Number( Number(this.total * ( 2.5/100)).toFixed(2));
        this.sgst = Number( Number(this.total * ( 2.5/100)).toFixed(2));
        this.grandTotal = this.total + this.cgst + this.sgst;
      }
      else{
        this.grandTotal=0;
        this.total = 0;
        this.cgst =0;
        this.sgst=0;
      }
        this.getTotalCost();
        this.getCGST();
        this.getSGST();
        this.getGrandTotal();
    }
    getTotalCost()   {
      return this.total.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    }
    getCGST(){
      return this.cgst.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    }
    getSGST(){
      return this.sgst.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    }
    getGrandTotal(){
      return this.grandTotal.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    }

    saveInvoice(invoiceForm:NgForm,tableRowForm:NgForm){
      if(invoiceForm.invalid)
      {
        this.date.markAsTouched();
        this.customerControl.markAsTouched();
        invoiceForm.controls.gstNo.markAsTouched();
        invoiceForm.controls.phoneNo.markAsTouched();
        this.invoiceFormValid = false;
        console.log("invoice.component.ts = > invalid invoice form");
      }
      else{
        if(this.listData.length > 0){
          this.invoice = new Invoice();
          this.invoice.invoiceNo = this.invoiceNo;
          this.invoice.invoiceDate = String(this.date.value);
          this.invoice.customer = this.customerControl.value.trim();
          this.invoice.gstNo = String(invoiceForm.value.gstNo).toUpperCase().trim();
          this.invoice.phoneNo = invoiceForm.value.phoneNo;

          this.customer.customer= this.customerControl.value.trim();
          this.customer.gstNo= String(invoiceForm.value.gstNo).toUpperCase().trim();
          this.customer.phoneNo = invoiceForm.value.phoneNo;
          if(invoiceForm.value.address == null || invoiceForm.value.address.trim() =="")
          {
            this.invoice.address = "";
            this.customer.address = "";
          }
          else{
            this.invoice.address = invoiceForm.value.address.trim();
            this.customer.address = invoiceForm.value.address.trim();
          }
          if(invoiceForm.value.job == null || invoiceForm.value.job.trim() =="")
          {
            this.invoice.job = "";
          }
          else{
            this.invoice.job = invoiceForm.value.job.trim();
          }
          if(invoiceForm.value.partyDcNo == null|| invoiceForm.value.partyDcNo.trim() =="")
          {
            this.invoice.partyDcNo = "";
          }
          else{
            this.invoice.partyDcNo = invoiceForm.value.partyDcNo.trim()
          }
          if(invoiceForm.value.reference == null || invoiceForm.value.reference.trim() =="")
          {
            this.invoice.reference = "";
          }
          else{
            this.invoice.reference =invoiceForm.value.reference.trim() ;
          }
          this.invoice.invoiceTable = this.listData;
          this.invoice.sgst = Number(this.getSGST() );
          this.invoice.cgst = Number(this.getCGST() );
          this.invoice.total = this.total;
          this.invoice.grandTotal = Math.round(this.grandTotal);

          this.invoice.roundOff =  Number((Math.round(this.grandTotal) - this.grandTotal).toFixed(2));

          this.invoiceFormValid = true;
        this.invoiceReport = new InvoiceReport();
        this.invoicePdb.addInvoice(this.invoice).then(result => {
          if(result.ok){
            this.invoice.invoiceTable.forEach((row)=> {
              this.addFabricIfNot(row.fabric);
              this.addMillIfNot(row.mill);
              this.addCustomerIfNot();
            });
            this.checkLicense();
            this.invoicePdb.getInvoiceNo().then((result)=> {
              console.log("invoice number : " + result.length + 1);
              this.invoiceNo = (( (Number(new Date().getFullYear().toString().substr(-2))) * 10000) + (result.length +1));
            });
            this.invoiceReport = null;
            this.reSetAllForms(invoiceForm,tableRowForm);
          }
        });

      }
        else{
          this.dialog.open(DialogNoItemsAddedElementsDialog);
          //  alert("No items added to Invoice");
        }

      }

    }
    cancelInvoice(invoiceForm:NgForm,tableRowForm:NgForm){
      console.log();
      this.reSetAllForms(invoiceForm,tableRowForm);
     // const dialogRef =  this.dialog.open(DialogCancelConfirmationElementsDialog);
     // dialogRef.afterClosed().subscribe((confirmed: boolean) => {
     //   if (confirmed) {
     //     this.reSetAllForms(invoiceForm,tableRowForm);
     //   }
     // });
      //confirm("Do you want to cancel")
      //if( this.dialog.DialogCancelConfirmationElementsDialog.o){
        //  console.log( "cancelling");
        //  this.reSetAllForms(invoiceForm,tableRowForm);
      //}
    }

    reSetAllForms(invoiceForm:NgForm,tableRowForm:NgForm){
      this.dataSource = null;
      this.listData = [];
      this.invoice = null;
      this.sgst = 0;
      this.cgst = 0;
      this.total = 0;
      this.grandTotal = 0;
      this.calculate();
        tableRowForm.resetForm();
        this.rowDate.setValue(new Date());
        this.date.setValue(new Date());
          this.autoCompleteReset();
          this.fabricControl.reset();
          this.millControl.reset();
          this.tableRowformValid = true;
          this.customerControl.reset();
          invoiceForm.resetForm();
    }

    addFabricIfNot(newfabric : string){
      this.fabricAddRow =
          {
          sno: this.fabricOptions.length + 1,
          fabric: newfabric,
          };
          this.items.getFabrics(this.fabricAddRow.fabric).then(result => {
            if (result.length == 0)
            {
               this.items.addFabricToDoc(this.fabricAddRow).then(result => {
                    if(result.ok){
                      console.log("added " + newfabric);
                      this.fabricOptions.push(newfabric);
                      this.autoCompleteReset();
                    }
              });
            }

          });
       }

       addMillIfNot(newmill : string){
        this.millAddRow =
            {
            sno: this.millOptions.length + 1,
            mill: newmill,
            };
            this.items.getMills(this.millAddRow.mill).then(result => {
              if (result.length == 0)
              {
                 this.items.addMillToDoc(this.millAddRow).then(result => {
                      if(result.ok){
                        console.log("added " + newmill);
                        this.millOptions.push(newmill);
                        this.autoCompleteReset();
                      }
                });
              }

            });
         }

         addCustomerIfNot(){

              this.customers.getCustomer(this.customer.customer).then(result => {
                if (result.length == 0)
                {
                   this.customers.addCustomerToDoc(this.customer).then(addResult => {
                        if(addResult.ok){
                          console.log("added " + this.customer);
                          this.customerOptions.push(this.customer.customer);
                          this.autoCompleteReset();
                        }
                  });
                }
                else{
                  console.log("into deleting proccess " + this.customer);
                  this.customers.deleteCustomer(result[0].doc).then(result => {

                    if(result.ok){
                      console.log("deleted " + this.customer);
                      this.customers.addCustomerToDoc(this.customer).then(result => {
                        if(result.ok){
                          console.log("deleted and added " + this.customer);
                           this.customerOptions.push(this.customer.customer);
                           this.autoCompleteReset();
                        }
                      });
                    }
                  });
                }

              });
           }

          public fetchCustomer(customer : string){
              console.log("Customer" + customer);
              this.customers.getCustomer(customer).then((fetchedCustomer)=>{
                  if(fetchedCustomer.length > 0)
                  {
                    console.log(fetchedCustomer);
                    console.log(fetchedCustomer[0].doc.gstNo);
                    this.customerGSTNo = fetchedCustomer[0].doc.gstNo;
                    this.customerAddress = fetchedCustomer[0].doc.address;
                    this.customerPhoneNo = fetchedCustomer[0].doc.phoneNo;
                  }

              });

          }
         public viewInvoice (invoiceNo : number){
           this.invoicePdb.getInvoice(invoiceNo).then((resultInvoice)=>{
             if(resultInvoice.length > 0){
              console.log(resultInvoice);
              this.invoice = new Invoice();
              this.invoiceReport = new InvoiceReport();
              this.invoice = resultInvoice[0].doc.invoice;
              this.checkLicense();
              console.log(this.invoice);
              this.invoiceReport = null;
             }
             else{
              this.dialog.open(DialogInvoiceNotFoundElementsDialog);
               // alert("Invoice Record Not found");
             }

           });
          }

          private checkLicense(){
            if(this.invoiceLicenseNo<200)
            {
              this.invoiceReport.print(this.invoice);
            }
          }
}
