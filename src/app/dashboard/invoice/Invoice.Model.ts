
export class InvoiceTable{
  sno: number;
  dc: string;
  date: string;
  fabric: string;
  count: string;
  mill : string;
  dia:string;
  weight:number;
  price:number;
  amount:number;
  invoiceNo : number;
}

export class Invoice{

  invoiceNo : number;
  invoiceDate : string;
  gstNo : string;
  address : string;
  customer : string;
  phoneNo : string;
  job : string;
  partyDcNo : string;
  reference : string;
  invoiceTable : InvoiceTable[];
  cgst : number;
  sgst : number;
  total : number;
  grandTotal : number;
  roundOff:number;
}
