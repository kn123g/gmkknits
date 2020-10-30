import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';



export interface InvoiceTable{
  sno: number;
  dc: string;
  date: Date;
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

  date = new FormControl(new Date());
  customerControl = new FormControl();
  fabricControl = new FormControl();
  customerOptions: string[] = ['One', 'Two', 'Three'];
  fabricOptions: string[] = ['cotton', 'polyester', 'somethng'];
  displayedColumns: string[] = ['sno','dc', 'date', 'fabric', 'count','mill','dia','weight','price','amount'];
  tableDate : Date = new Date();
  ELEMENT_DATA: InvoiceTable[] = [
    {sno: 1, dc: "dc",date: this.tableDate,fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
    {sno: 2, dc: "dc",date: this.tableDate,fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000}
  ];
  dataSource = this.ELEMENT_DATA;
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

   add(){
    this.addRow =
      {
    sno: 100, dc: "dcadd",date: this.tableDate,fabric: 'addstrn',count: 2,mill : 'string',dia:'string',amount:6,price:6,weight:123
       };
      this.ELEMENT_DATA.push(this.addRow);

      console.log(this.ELEMENT_DATA);
       }

  constructor() { }


}
