import { compare, hash, hashSync } from 'bcryptjs';
import { CustomerModel } from '../customer.Model';
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
interface IPouchDBRemoveResult {
	ok: boolean;
	id: string;
	rev: string;
}


@Injectable({providedIn : 'root'})
export class CustomerPouch{

    private db : any;
    constructor(private router : Router) {
        this.db = new PouchDB(
                "gmkknits-pouchdb",
                {
                    auto_compaction: true
                }
            );
      }

    public addCustomerToDoc(newCustomer : CustomerModel){
      var getPromise =  this.db
                  .put({
                    _id: ( "customer:" + ( new Date() ).getTime() ),
                    customer: newCustomer.customer,
                    gstNo : newCustomer.gstNo,
                    phoneNo: newCustomer.phoneNo,
                    address:newCustomer.address
                  })
                  .then(
                    ( result: any ) : string => {
                     return result;
                    }
                  );
          return getPromise;
    }

    public getCustomer (customer : string){
      var promise = this.db
      .allDocs({
        include_docs: true,
        startkey: 'customer:',
        endkey: 'customer:\uffff'
      })
      .then(
        ( result: IPouchDBAllDocsResult ) : any[] => {
          if (result.rows.length > 0){
            console.log(result);
            return result.rows.filter(row  =>
              (String(row.doc.customer)).toLowerCase() === (String(customer)).toLowerCase()
            );
          }else{
            return result.rows;
          }
        }
      );
     return  promise;
    }

    public deleteCustomer (customer : any){
      return this.db.remove( customer);
    }

    public getAllCustomers (){
      var promise = this.db
      .allDocs({
        include_docs: true,
        startkey: 'customer:',
        endkey: 'customer:\uffff'
      })
      .then(
        ( result: IPouchDBAllDocsResult ) : any[] => {
            return result.rows;
        }
      );
     return  promise;
    }
}

