import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth-guard';
import {LoginComponent} from './auth/login/login.component';
import {InvoiceComponent} from './dashboard/invoice/invoice.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {path : 'login',component : LoginComponent},
  {path : '',component : LoginComponent},
  {path : 'home',component : DashboardComponent,canActivate: [AuthGuard],
  children:
  [
    {
      path : 'invoice',component : InvoiceComponent,canActivate: [AuthGuard],
    }
  ]},
  {path : '**',component : LoginComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
