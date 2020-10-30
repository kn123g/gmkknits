import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth-guard';
import {LoginComponent} from './auth/login/login.component';
import {InvoiceComponent} from './dashboard/invoice/invoice.component';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {path : 'login',component : LoginComponent},
  {path : '',component : LoginComponent},
  {path : 'invoice',component : InvoiceComponent},
  {path : 'home',component : DashboardComponent,canActivate: [AuthGuard],
  children:
  [
    {
      path : 'invoice',component : InvoiceComponent
    }
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
