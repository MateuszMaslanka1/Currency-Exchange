import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyExchangeComponent} from './currency-exchange/currency-exchange.component';
import {CheckingThePriceComponent} from './checking-the-price/checking-the-price.component';
import {FirebaseAuthComponent} from './firebase-auth/firebase-auth.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './firebase-auth/guard/auth.guard';


const routes: Routes = [
  {path: '', component: CurrencyExchangeComponent},
  {path: 'checkingThePrice', component: CheckingThePriceComponent},
  {path: 'login', component: FirebaseAuthComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
