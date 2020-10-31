import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import {  MatTableDataSource } from '@angular/material/table';



export interface InvoiceTable{
  sno: number;
  dc: string;
  date: string;
  fabric: string;
  count: number;
  mill : string;
  dia:string;
  weight:number;
  price:number;
  amount:number
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})


export class InvoiceComponent implements OnInit {

  tableRowformValid = true;
  date = new FormControl(new Date());
  customerControl = new FormControl();
  fabricControl = new FormControl();
  customerOptions: string[] = ['One', 'Two', 'Three'];
  fabricOptions: string[] = ['cotton', 'polyester', 'somethng'];
  displayedColumns: string[] = ['sno','dc', 'date', 'fabric', 'count','mill','dia','weight','price','amount'];
  tableDate : Date = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  listData: InvoiceTable[] = [
    {sno: 1, dc: "dc",date: this.tableDate.toDateString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
    {sno: 2, dc: "dc",date:  this.tableDate.toDateString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000}
  ];
  dataSource : MatTableDataSource<InvoiceTable>;

  addRow : InvoiceTable ;

  filteredCustomerOptions: Observable<string[]>;
  filteredFabricOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredCustomerOptions = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCustomer(value))
    );
    this.filteredFabricOptions = this.fabricControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterFabric(value))
    );
  }
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.customerOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  private _filterFabric(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fabricOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
        sno: 100, dc: "dcadd",date: this.tableDate.toDateString(),fabric: 'addstrn',count: 2,mill : 'string',dia:'string',amount:6,price:6,weight:123
        };
        this.listData.push(this.addRow);
        this.dataSource = new MatTableDataSource<InvoiceTable>(this.listData);
        console.log(this.dataSource);
   }
   }

  constructor() { }


}
