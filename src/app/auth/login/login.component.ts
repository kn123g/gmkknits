import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide  = true;
  formValid = true;
  constructor() {

  }

  ngOnInit(): void {
  }
  onSubmitButtonClick(loginForm:NgForm){
    if(loginForm.invalid)
    {
      this.formValid = false;
    }
    else{

    }
  }
}
