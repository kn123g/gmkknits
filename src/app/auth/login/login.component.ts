import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import{AuthService}from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide  = true;
  formValid = true;
  constructor(public authservice  : AuthService) {

  }

  ngOnInit(): void {
  }
  onSubmitButtonClick(loginForm:NgForm){
    if(loginForm.invalid)
    {
      this.formValid = false;
    }
    else{
      console.log("login.component.ts = > after login response");
       console.log(this.authservice.addUser(loginForm.value.username,loginForm.value.password));
       loginForm.resetForm();
    }
  }
}
