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


    }



}
