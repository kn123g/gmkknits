import { Injectable } from '@angular/core';
import { MUser } from './user.model';
 declare function require(name:string);
// var PouchDB = require("pouchdb-browser");
//import * as PouchDB from 'pouchdb-browser';
const PouchDB = require('pouchdb').default;

@Injectable({providedIn : 'root'})
export class AuthService {

  private db :any;

   constructor() {
    this.db = new PouchDB(
			"gmkknits-pouchdb",
			{
				auto_compaction: true
			}
		);
	}
   addUser(name : string ,password :string ){
     console.log('called');
   console.log(name + '   ' + password);
       this.db.put({_id: ( "user:" + ( new Date() ).getTime() ),name,password}).then((r) =>
   {
     console.log("connected...");
       return r;
   })

 }
}
