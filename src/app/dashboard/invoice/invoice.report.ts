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

export class InvoiceReport{

  reportImg = new reportImage();
  doc = new jsPDF('portrait','px','a4') ;// as jspdfWithPlugin; //millName
  listData: InvoiceTable[] ;

   start : number = 0;end : number =0; tablePosition : number;
   invoice : Invoice ;


  print(invoice : Invoice){
    var tableData : RowInput[] =[];
    this.invoice = invoice;
    invoice.invoiceTable.forEach(array=>{
      tableData.push({sno : array.sno,
                      dc:array.dc,
                      date : array.date,
                      fabric : array.fabric,
                      count : array.count,
                      mill : array.mill,
                      dia : array.dia,
                      weight : array.weight,
                      price : array.price,
                      amount : array.amount});
    });

    do{
      if(this.doc.getCurrentPageInfo().pageNumber == 1 ){
        if(tableData.length > 6){
          this.end = 12;
          //this.appendPage(tableData.slice(this.start,this.end));
          this.printHeader();
          this.appendPage(tableData.slice(this.start,this.end));
          this.start=12;
          this.doc.addPage('portrait');
          this.printHeader();
        }
        else{
          this.end = tableData.length;
          this.printHeader();
          this.appendPage(tableData);
        }
      }
      else{
        if(this.end+16 <= tableData.length ){
          this.end = this.start + 16;
          this.appendPage(tableData.slice(this.start,this.end));
          this.start = this.start + 16;
          this.doc.addPage('portrait');
          this.printHeader();
        }
        else{
          this.end = tableData.length;
          this.appendPage(tableData.slice(this.start,this.end));
          if(this.end - this.start > 10){
            this.doc.addPage('portrait');
            this.printHeader();
          }
        }


      }
     }while(this.end<tableData.length);

     this.footerPrint();
     this.savePDF();

    }

  appendPage(tableData : RowInput[]){

    console.log(tableData);

  if(this.doc.getCurrentPageInfo().pageNumber == 1 )
  {
     this.doc.setFontSize(11);
     this.doc.text( "To ", 30,90);
     this.doc.text( "Customer", 30,105);
     this.doc.text( this.invoice.customer, 100,105);
     this.doc.text( "GSTTIN", 30,120);
     this.doc.text( this.invoice.gstNo, 100,120);
     this.doc.text( "Phone No", 30,135);
     this.doc.text( this.invoice.phoneNo.toString(),100,135);
     this.doc.text( "Address", 30,150);
     var splitTitle = this.doc.splitTextToSize(this.invoice.address, 140);
     this.doc.text(splitTitle,100, 150);
     this.doc.setLineWidth(0.5);
     this.doc.line(25, 195, 420, 195);
     this.doc.line(240,80, 240, 195);

     this.doc.text( "Date ",250 ,90);
     this.doc.text( String(this.invoice.invoiceDate).substr(4, 12), 320,90);
     this.doc.text( "Invoice No", 250,105);
     this.doc.text( this.invoice.invoiceNo.toString(), 320,105);
     this.doc.text( "Job", 250,120);
     this.doc.text( this.invoice.job, 320,120);
     this.doc.text( "Party DC No", 250,135);
     this.doc.text( this.invoice.partyDcNo,320,135);
     this.doc.text( "Reference", 250,150);
     this.doc.text(this.invoice.reference,320, 150);
     this.doc.line(240, 155, 420, 155);

  }
  this.printTable(tableData);
  }



  printTable(tableData : RowInput[]){

    if (this.doc.getCurrentPageInfo().pageNumber == 1 )
    {
        this.tablePosition = 200;
    }
    else{
       this.tablePosition = 80;
    }
    autoTable (this.doc,{
      styles: { minCellHeight : 30,valign:'middle',fontSize:8},
      bodyStyles:{fontStyle:"normal"}, // European countries centered
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
       startY : this.tablePosition,
         });
  }

  printHeader(){
    this.doc.setFont("Melbourne");
    this.doc.setFontSize(11);
    this.doc.setDrawColor(0,0,0);
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
     this.doc.setDrawColor(255,153,51);
     this.doc.line(25, 80, 420, 80);
  }

  footerPrint(){
    this.doc.setLineWidth(0.5);
    this.doc.setFont("Melbourne","bold");
    this.doc.setFontSize(11);
    this.doc.setDrawColor(0,0,0);
    this.doc.line(25, 420, 420, 420);
    this.doc.text( "Bank Details", 30,430);
    this.doc.setFont("Melbourne","normal");
    this.doc.setFontSize(12);
    this.doc.text( "TOTAL", 280,435);
    this.doc.text( this.invoice.total.toString(), 360,435);
    this.doc.text( "CGST(2.5%)", 280,450);
    this.doc.text( this.invoice.cgst.toString(), 360,450);
    this.doc.text( "SGST(2.5%)", 280,465);
    this.doc.text( this.invoice.sgst.toString(), 360,465);
    this.doc.text( "ROUND OFF", 280,480);
    this.doc.text( this.invoice.roundOff.toString(), 360,480);
    this.doc.text( "GRAND TOTAL", 280,495);
    this.doc.text( this.invoice.grandTotal.toString(), 360,495);
    this.doc.line(25, 505, 420, 505);
    this.doc.setFont("Melbourne","normal");
    this.doc.setFontSize(8);
    this.doc.text( "Remarks", 35,575);
    this.doc.text( "1. No Purchase or Sales involved, Labour Charges Only", 35,585);
    this.doc.text( "2. Subject to Tirupur Jurisdiction Only", 35,592);
    this.doc.setFont("Melbourne","normal");
    this.doc.setFontSize(11);
    this.doc.text( "For GMK KNITS", 310,565);
  }
  savePDF(){
    this.doc.autoPrint();
    var file = new Blob([this.doc.output('arraybuffer')], {type: 'application/pdf'});
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    //this.doc.output( "datauristring",{filename:'Invoice_' + this.invoice.invoiceNo + Date + '.pdf'});
    //this.doc.output('bloburl', {filename: 'myFileName.pdf'}, '_blank');
    this.doc.save('table.pdf');
  }
}
