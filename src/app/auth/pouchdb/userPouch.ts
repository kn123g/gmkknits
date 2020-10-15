import { hash, hashSync } from 'bcryptjs';
import { MUser } from '../user.model';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
declare function require(name:string);
const PouchDB = require('pouchdb').default;

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

    addUser(authData : MUser ) : string{

        console.log(authData.firstName + '   ' +  authData.lastName + '   ' + authData.userid + '   ' + 
        authData.email + '   ' + authData.password + '   ' + authData.phoneno);
        var hash = hashSync(authData.password,10);
        var promise = this.db
         .put({
           _id: ( "user:" + ( new Date() ).getTime() ),
           firstName: authData.firstName,
           lastName : authData.lastName,
           userId : authData.userid,
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
} 
