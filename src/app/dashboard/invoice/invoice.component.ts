import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {  MatTableDataSource } from '@angular/material/table';
import{InvoiceTable} from'./InvoiceTable.Model';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})


export class InvoiceComponent implements OnInit {

  tableRowformValid = true;
  date = new FormControl(new Date());
  rowDate = new FormControl(new Date());
  rowWeight : number ;
  rowPrice : number ;
  rowCount : number =1;
  customerControl = new FormControl();
  fabricControl = new FormControl();
  millControl = new FormControl();
  customerOptions: string[] = ['One', 'Two', 'Three'];
  fabricOptions: string[] = ['cotton', 'polyester', 'somethng'];
  millOptions: string[] = ['TCS', 'CSK', 'MI'];
  displayedColumns: string[] = ['sno','dc', 'date', 'fabric', 'count','mill','dia','weight','price','amount','edit','delete'];
 // tableDate : Date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  listData: InvoiceTable[] = [];
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

  ngOnInit() {
    this.autoCompleteReset();
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
    if(tableRow.invalid)
    {
      this.tableRowformValid = false;
      console.log("invoice.component.ts = > invalid tableRow form");
    }
    else{
       this.addRow =
        {
        sno: this.listData.length + 1,
        dc: tableRow.value.dc,
        date: String(this.rowDate.value).substr(4, 12),
        fabric: this.fabricControl.value,
        count: tableRow.value.count,
        mill :  this.millControl.value,
        dia: tableRow.value.dia,
        amount: tableRow.value.price * tableRow.value.weight * tableRow.value.count ,
        price: tableRow.value.price,
        weight: tableRow.value.weight
        };
        this.listData.push(this.addRow);
        this.dataSource = new MatTableDataSource<InvoiceTable>(this.listData);
        tableRow.resetForm();
        this.autoCompleteReset();
        this.fabricControl.reset();
        this.millControl.reset();
        this.filteredFabricOptions;
        this.rowCount = 1;
        console.log(this.dataSource);
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
      this.getTotalCost();
      this.getCGST();
      this.getSGST();
    }
    getTotalCost()   {
      this.total = this.listData.map(t => t.amount).reduce((acc, value) => acc + value, 0);
      this.cgst = this.total * ( 12/100);
      this.sgst = this.total * ( 12/100);
      this.grandTotal = this.total + this.cgst + this.sgst;
      return this.total.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    }
    getCGST(){
      return (this.total.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')).toString();
    }
    getSGST(){
      return (this.total.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')).toString();
    }
    getGrandTotal(){
      return this.grandTotal.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    }
  constructor() { }


}
