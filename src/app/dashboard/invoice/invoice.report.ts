import {Injectable} from '@angular/core';
import { reportImage} from './invoice.image'
import{jsPDF}  from "jspdf";
import  'jspdf-autotable';
import {RowInput, UserOptions,applyPlugin,jsPDFDocument} from 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
applyPlugin(jsPDF)

import{InvoiceTable,Invoice} from './Invoice.Model';

interface jspdfWithPlugin extends jsPDF{
  autoTable : (options : UserOptions) => jsPDF;
}

@Injectable({providedIn : 'root'})
export class InvoiceReport{

  reportImg = new reportImage();
  doc = new jsPDF('portrait','px','a4') ;// as jspdfWithPlugin; //millName
  listData: InvoiceTable[] = [
    {sno: 1, dc: "dcname123",date: Date.toString(),fabric: 'stdqwdwqfdwring',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
    {sno: 2, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 3, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 4, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 5, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 6, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'strimillNameng',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 7, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 8, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 2, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 9, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 10, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 11, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'Dr.NGP NSTTEYE PF TECHBONOLFFUY<COMNBATE',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 12, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 13, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 14, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 15, dc: "dcname123",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 16, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},

      {sno: 12, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 13, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'millName',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 14, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 15, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 16, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 12, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 13, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 14, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 15, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
      {sno: 16, dc: "dc",date:  Date.toString(),fabric: 'string',count: 2,mill : 'string',dia:'string',
      weight:4,price:600000,amount:1000000},
  ];
   start : number = 0;end : number =0;



  print(invoice : Invoice){
    var tableData : RowInput[] =[];
    invoice.invoiceTable = this.listData;
    invoice.invoiceTable.forEach(array=>{
      tableData.push({sno : array.sno,
                      dc:array.dc,
                      date : array.sno,
                      fabric : array.fabric,
                      count : array.count,
                      mill : array.mill,
                      dia : array.dia,
                      weight : array.weight,
                      price : array.price,
                      amount : array.amount});
    });

    if(this.doc.getCurrentPageInfo().pageNumber == 1 )
    {
      if(tableData.length >= 6){
        this.end = 0;
      }
      else{

      }
      this.appendPage(tableData.slice(this.start,this.end));
    }

    }

  appendPage(tableData : RowInput[]){

  if(this.doc.getCurrentPageInfo().pageNumber == 1 )
  {
    this.doc.setLineWidth(0.5);
    // this.doc.rect(20, 20, this.doc.internal.pageSize.width - 40, this.doc.internal.pageSize.height - 40, 'S');
     this.doc.line(25, 25, 420, 25);
     this.doc.line(25, 25, 25, 600);
     this.doc.line(25, 600, 420, 600);
     this.doc.line(420, 600, 420, 25);
     this.doc.addImage(this.reportImg.logoImg , 'PNG', 40, 35,35,35);
     this.doc.addImage( this.reportImg.nameImg, 'PNG', 160, 30,  125, 25);
     this.doc.setFont("Melbourne");
     this.doc.setFontSize(14);
     this.doc.text( "Tax Invoice", 350,40);
     this.doc.setFontSize(10);
     this.doc.text( "38/2,Near Kamachi Amman School,Iduvai Main Road,Andipalayam - 641687", 105,60);
     this.doc.text( "GSTTIN No : 33AAQFG8932M1ZR PAN No : AAQFG8932M", 125,68);
     this.doc.text( "Phone No : +91 7845578239 ", 181,76);
     this.doc.setLineWidth(1);
     this.doc.line(25, 80, 420, 80);
     this.doc.setFontSize(11);
     this.doc.text( "To ", 30,90);
     this.doc.text( "Customer", 30,105);
     this.doc.text( "Karthikeyan Ganesh", 100,105);
     this.doc.text( "GSTTIN", 30,120);
     this.doc.text( "GST4444445454", 100,120);
     this.doc.text( "Phone No", 30,135);
     this.doc.text( "7418999760",100,135);
     this.doc.text( "Address", 30,150);
     var splitTitle = this.doc.splitTextToSize("3/757 Bhagavathi Nagar 1st street,"+
     "Murugampalayam, Iduvampalayam POST, Tirupur-64167", 140);
     this.doc.text(splitTitle,100, 150);
     this.doc.setLineWidth(0.5);
     this.doc.line(25, 195, 420, 195);
     this.doc.line(240,80, 240, 195);

     this.doc.text( "Date ",250 ,90);
     this.doc.text( "26/11/2020", 320,90);
     this.doc.text( "Invoice No", 250,105);
     this.doc.text( "17", 320,105);
     this.doc.text( "Job", 250,120);
     this.doc.text( "Delivery", 320,120);
     this.doc.text( "Party DC No", 250,135);
     this.doc.text( "1",320,135);
     this.doc.text( "Reference", 250,150);
     this.doc.text("Reference",320, 150);
     this.doc.line(240, 155, 420, 155);
     autoTable (this.doc,{

      styles: { minCellHeight : 30,valign:'middle',fontSize:8}, // European countries centered
     body: tableData,
     columns: [
       { header: 'SNo' , dataKey: 'sno' },
       { header: 'DC', dataKey: 'dc' },
       { header: 'Date', dataKey: 'date' },
       { header: 'Fabric', dataKey: 'fabric' },
       { header: 'Count', dataKey: 'count' },
       { header: 'Mill', dataKey: 'mill' },
       { header: 'Dia', dataKey: 'dia' },
       { header: 'Weight', dataKey: 'weight' },
       { header: 'Price', dataKey: 'price' },
       { header: 'Amount', dataKey: 'amount' },
     ],
     showHead: "everyPage",
       theme :  "plain" ,
     startY : 200,
       });

     //this.doc.output('pdfobjectnewwindow');
     this.doc.autoPrint();
     this.doc.save('table.pdf');
  }
  else{

  }


      }


}
