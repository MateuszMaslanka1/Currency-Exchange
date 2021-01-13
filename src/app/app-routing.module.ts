import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyExchangeComponent} from './currency-exchange/currency-exchange.component';


const routes: Routes = [
  {path: '', component: CurrencyExchangeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
