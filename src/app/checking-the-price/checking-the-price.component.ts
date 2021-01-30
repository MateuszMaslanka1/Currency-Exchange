import {Component, OnInit} from '@angular/core';
import {GetCurrencyService} from '../currency-exchange/Services/get-currency.service';
import {map, switchMap} from 'rxjs/operators';
import {Curriencies} from '../currency-exchange/Model/currencies';
import {interval} from 'rxjs';

@Component({
  selector: 'app-checking-the-price',
  templateUrl: './checking-the-price.component.html',
  styleUrls: ['./checking-the-price.component.scss']
})
export class CheckingThePriceComponent implements OnInit {

  constructor(private getCurrencyService: GetCurrencyService) { }

  getRates = {};
  updateTime: number;
  getPrice: number;
  getCurrency: object;

  ngOnInit() {
    (Object.keys(this.getCurrencyService.getCourses()).length === 0) ? this.getRatesFormApi().subscribe(el => this.getRates = el)
    : this.getRates = this.getCurrencyService.getCourses();
  }

  getRatesFormApi() {
    return this.getCurrencyService.currenciesToCalculate('PLN').pipe(
      map((el: Curriencies) => {
        return el.rates;
    }));
  }

  getCurrencyValue(currency) {
    this.getCurrency = currency;
  }

  getRateToCheck() {
    console.log(this.updateTime, this.getCurrency, this.getPrice);
    this.startTimer(this.updateTime);
  }

  startTimer(updateTime: number) {
    interval(updateTime).pipe(
    ).subscribe(el => console.log(this.getRates));
  }
}
