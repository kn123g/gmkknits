import { Injectable } from '@angular/core';
import{Router} from '@angular/router';
import {Subject} from 'rxjs';
import { compare,compareSync, hash, hashSync } from 'bcryptjs';
import {MatDialog} from '@angular/material/dialog';
import {InvoicePouch} from '../pouchdb/invoicePouch';
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn : 'root'})
export class InvoiceReplicationService {
    constructor(private invoicePdb : InvoicePouch,private http:HttpClient){

    }
    public replicateInvoice(){
        this.invoicePdb.getInvoicesToBeReplicated().then(element => {
            element.forEach(data =>   {
                const invoice : any = {
                    invoice:data.doc.invoice
                    ,id : data.doc._id};
                this.http.post<{message:any,id:any}>("http://angulartutorialpostapp-env.eba-c2yjsxze.us-east-2.elasticbeanstalk.com/api/gmkknits/invoiceReplicate",invoice).
                subscribe((responseData)=>{
                    if(responseData.message === "invoice added successfully"){
                        this.invoicePdb.updateReplicationDate(invoice.invoice.invoiceDate);
                      //  this.replicated = true;
                       // console.log("replicated : true");
                    }
                    console.log(responseData);
             });
            });
            // console.log("replicated value in if :" + this.replicated);
            // if(this.replicated)
            // {
            //     console.log("updating replication date");
            //     this.invoicePdb.updateReplicationDate();
            //     this.replicated = false;
            // }
        });
    }
}