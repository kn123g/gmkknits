import { compare, hash, hashSync } from 'bcryptjs';
import { InvoiceTable,Invoice } from '../Invoice.Model';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
declare function require(name:string);
const PouchDB = require('pouchdb').default;




interface IPouchDBAllDocsResult {
	offset: number;
	total_rows: number;
	rows: IPouchDBRow[];
}
interface IPouchDBRow {
	id: string;
	key: string;
	value: { rev: string };
	doc?: any;
}


@Injectable({providedIn : 'root'})
export class InvoicePouch{

    private db : any;
    constructor(private router : Router) {
        this.db = new PouchDB(
                "gmkknits-pouchdb",
                {
                    auto_compaction: true
                }
            );
      }

    public addInvoice (invoice : Invoice){
      var promise = this.db
      .put({
        _id: ( "invoice:" + invoice.invoiceNo.toString().substr(0,2) + ":" + ( new Date() ).getTime() ),
        invoice : invoice,
      })
      .then(
        ( result: any ) : string => {
         return result;
        }
      );
     return  promise;

    }

    public getInvoiceNo(year : number){
      var promise = this.db
        .allDocs({
          include_docs: false,
          startkey: 'invoice:' +  year,
          endkey: 'invoice:' + year +'\ufff0'
        })
        .then(
          ( result: IPouchDBAllDocsResult ) : any[] => {
            console.log(result);
            return result.rows;
          }
        );
      //console.log(promise);
      return promise;
    }

    public getInvoice(invoiceNo : number){
      var promise = this.db
      .allDocs({
        include_docs: true,
        startkey: 'invoice:' +(Number(invoiceNo.toString().substr(2))),
        endkey: 'invoice:' +(Number(invoiceNo.toString().substr(2))) + '\ufff0'
      })
      .then(
        ( result: IPouchDBAllDocsResult ) : any[] => {
          //console.log(result);
          return result.rows.filter(row  =>
            row.doc.invoice.invoiceNo == invoiceNo);

         });
         return promise;
        }
}
