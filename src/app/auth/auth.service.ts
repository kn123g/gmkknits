import { Injectable } from '@angular/core';
import { MUser } from './user.model';
import * as sqlite from 'sqlite'
import { open }  from 'sqlite';
import  * as  sqlite3  from 'sqlite3';

@Injectable({providedIn : 'root'})
export class AuthService {

  private db :any;

   constructor() {
    open({
      filename: '/tmp/database.db',
      driver: sqlite3.Database
    }).then((db) => {
        console.log("connected");
    })
	}
   addUser(name : string ,password :string ){
   console.log(name + '   ' + password);
// this.db.put({_id: ( "user:" + ( new Date() ).getTime() ),name,password}).then((r) =>
// {
//   return r;
// })

 }
}
