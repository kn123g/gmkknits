import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import {AuthService} from '../../app/auth/auth.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router : Router,private authService : AuthService) { }

  ngOnInit(): void {
    this.router.navigate(['/home/'+"invoice" ]);
  }
  listSelected(selected : string){
    console.log(selected);
    this.router.navigate(['/home/'+selected ]);
  }
  logout(){
      this.authService.logOut();
  }

}
