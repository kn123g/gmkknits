import { Injectable } from '@angular/core';
import { MUser } from './user.model';
import{Router} from '@angular/router';
import {UserPouch} from './pouchdb/userPouch'
import {Subject} from 'rxjs';

@Injectable({providedIn : 'root'})
export class AuthService {

    private token :string;
    private authStatusListener = new Subject<boolean>();
    private userAuthentication = false;
    private tokenTimer: any;
    private userId : string;

    constructor(public userPdb : UserPouch  ){}
    getToken(){
        return this.token;
    }
    getUserAuthentication(){
        return this.userAuthentication;
    }
    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }
    getUserId(){
      return this.userId;
    }

  createUser(email : string,password :string)
    {   
        const authData : MUser = {
          firstName : 'admin',
          lastName : 'user',
          userid : 'admin123',
          email : email,
          password : password,
          phoneno : '9809543211'
        };
        return this.userPdb.addUser(authData).then(result => {
            console.log(result);
        });     
    }

   
}
