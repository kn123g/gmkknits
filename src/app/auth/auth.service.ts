import { Injectable } from '@angular/core';
import { MUser } from './user.model';
import{Router} from '@angular/router';
import {UserPouch} from './pouchdb/userPouch'
import {Subject} from 'rxjs';
import { compare,compareSync, hash, hashSync } from 'bcryptjs';

@Injectable({providedIn : 'root'})
export class AuthService {

    private token :string;
    private authStatusListener = new Subject<boolean>();
    private userAuthentication = false;
    private tokenTimer: any;
    private userId : string;

    constructor(public userPdb : UserPouch,private router : Router  ){}

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

    loginUser(email : string,password :string)
    {
      this.userPdb.loginUser(email ,password ).then( user => {

                if(user.length > 0)
                {
                  const userId = user[0].doc.userId;
                  const token = user[0].id;
                  const hashedInputPassword =  hashSync(password,10);

                    const passcompare = compareSync (password , user[0].doc.password);
                    if(passcompare)
                    {
                      const expiresInDuration = 3600;
                      this.setAuthTimer(expiresInDuration);
                      this.userAuthentication = true;
                      this.userId = userId;
                      this.authStatusListener.next(true);
                      const now = new Date();
                        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000 );
                        console.log(expirationDate);
                      this.saveAuthData(token, expirationDate,this.userId);
                      this.router.navigate(['/home']);
                    }
                    else
                    {
                      alert("Wrong Password");
                    }
                }
                else{
                  alert("User not Found");
                }
      } );
    }

    autoAuthUser() {

      const authInformation = this.getAuthData();
      console.log("auth.service.ts => autoAuthUser() : " + authInformation);
      if (!authInformation) {
        return;
      }
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.userAuthentication = true;
        this.userId = authInformation.userId;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
      }
    }

  logOut(){
      this.token = null;
      this.userAuthentication = false;
      this.authStatusListener.next(false);
      this.authStatusListener.next(false);
      this.userId = null;
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.router.navigate(['/']);
  }
  private setAuthTimer(duration: number) {
      console.log("Setting timer: " + duration);
      this.tokenTimer = setTimeout(() => {
        console.log("logging out");
        this.logOut();
      }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date,userId : string) {
      localStorage.setItem("token", token);
      localStorage.setItem("expiration", expirationDate.toISOString());
      localStorage.setItem("userId", userId);
    }

    private clearAuthData() {
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
      localStorage.removeItem("userId");
    }

    private getAuthData() {
      const token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("expiration");
      const userId  = localStorage.getItem("userId");
      if (!token || !expirationDate) {
        return;
      }
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        userId : userId
      }
    }


}
