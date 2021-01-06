import { compare, hash, hashSync } from 'bcryptjs';
import { InvoiceTable,Invoice } from '../Invoice.Model';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { sync } from 'pouchdb';
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
    public replicationDateId ;
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
        startkey: 'invoice:' +(Number(invoiceNo.toString().substr(0,2))),
        endkey: 'invoice:' +(Number(invoiceNo.toString().substr(0,2))) + '\ufff0'
      })
      .then(
        ( result: IPouchDBAllDocsResult ) : any[] => {
          //console.log(result);
          return result.rows.filter(row  =>
            row.doc.invoice.invoiceNo == invoiceNo);

         });
         return promise;
        }

        public getLastInvoiceReplicationDate(){ 
          var returnResult ;
         // debugger;
         var promise = this.db
          .allDocs({
            include_docs: true,
            startkey: 'invoiceReplication:' ,
            endkey: 'invoiceReplication:'+ '\ufff0'
          })
          .then(
            ( result: IPouchDBAllDocsResult ) : any[] => {
              returnResult = [...result.rows];
                this.replicationDateId = returnResult[0].id;
              return  returnResult ;
              }
              );
             return promise;
            }
        public getInvoicesToBeReplicated(){ 

         return( this.getLastInvoiceReplicationDate().then(date => {

           return ( this.db
          .allDocs({
            include_docs: true,
            startkey: 'invoice:' ,
            endkey: 'invoice:' + '\ufff0'
          })
          .then(
            ( result: IPouchDBAllDocsResult ) : any[] => {
              //console.log(result);
              if(date.length ==0){
                return result.rows;
              }
              else{
               return result.rows.filter(row  => {
                 console.log( new Date(row.doc.invoice.invoiceDate));
                 console.log( new Date(date[0].doc.invoiceReplicatedDate));
                 console.log(new Date(row.doc.invoice.invoiceDate) > new Date (date[0].doc.invoiceReplicatedDate));
                return new Date(row.doc.invoice.invoiceDate) > new Date (date[0].doc.invoiceReplicatedDate)
                } );
              }
             }));
          }));

        }

        public updateReplicationDate(date : any){
          this.db.get(this.replicationDateId)
                  .then(( updateResult: any )  => {
                    updateResult.invoiceReplicatedDate= date;
                      this.db.put( updateResult ).then(data => {
                        console.log(data);
                      }) ;
                  } );
        }
        public createInvoiceReplicationDate(){
          
          var date = new Date(); 
          date.setDate(date.getDate() - 1);
          this.db.put({
            _id: ( "invoiceReplication:" + ( new Date(date) ).getTime() ),
            invoiceReplicatedDate : String(new Date(date)),
            });
        }
}
