import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{AuthService}from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoginWrongUserElementsDialog,
  DialogLoginWrongPasswordElementsDialog}
from '../../dialog/DialogElementsDialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide  = true;
  formValid = true;
  constructor(public authservice  : AuthService,public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }
  onSubmitButtonClick(loginForm:NgForm){
    if(loginForm.invalid)
    {
      this.formValid = false;
      console.log("login.component.ts = > invalid form");
    }
    else{

      if(loginForm.value.username == "arun123")
      {
      //console.log("login.component.ts = > after login response");
      this.authservice.getUser(loginForm.value.username).then((user) =>{
        if(user.length >0){
          this.authservice.loginUser(loginForm.value.username,loginForm.value.password);
        }
        else{
          this.authservice.createUser(loginForm.value.username,loginForm.value.password);
          this.authservice.loginUser(loginForm.value.username,loginForm.value.password);
        }
       // loginForm.resetForm();
      } );
    }
    else{
      this.dialog.open(DialogLoginWrongUserElementsDialog);
      //alert("Wrong User ID");
    }
  }
  }
}
