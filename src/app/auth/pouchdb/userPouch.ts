import { compare, hash, hashSync } from 'bcryptjs';
import { MUser } from '../user.model';
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
export class UserPouch{

    private db : any;
    constructor(private router : Router) {
        this.db = new PouchDB(
                "gmkknits-pouchdb",
                {
                    auto_compaction: true
                }
            );
      }

    addUser(authData : MUser ) {

        console.log(authData.firstName + '   ' +  authData.lastName + '   ' + authData.userid + '   ' +
        authData.email + '   ' + authData.password + '   ' + authData.phoneno);
        var hash = hashSync(authData.password,10);
        var promise = this.db
         .put({
           _id: ( "user:" + ( new Date() ).getTime() ),
           firstName: authData.firstName,
           lastName : authData.lastName,
           userId : authData.email,
           email : authData.email,
           password : hash,
           phoneNo : authData.phoneno
         })
         .then(
           ( result: any ) : string => {
            return result;
           }
         );
        return  promise;
    }


    public loginUser(userid : string,password :string) : any {
      var promise = this.db
        .allDocs({
          include_docs: true,
          startkey: "user:",
          endKey: "user:\uffff"
        })
        .then(
          ( result: IPouchDBAllDocsResult ) : any[] => {
            return result.rows.filter(row  => row.doc.userId === userid);
          }
        );
      //console.log(promise);
      return promise;
    }

}
