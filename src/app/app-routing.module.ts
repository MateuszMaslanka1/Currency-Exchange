import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyExchangeComponent} from './currency-exchange/currency-exchange.component';
import {CheckingThePriceComponent} from './checking-the-price/checking-the-price.component';


const routes: Routes = [
  {path: '', component: CurrencyExchangeComponent},
  {path: 'checkingThePrice', component: CheckingThePriceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
