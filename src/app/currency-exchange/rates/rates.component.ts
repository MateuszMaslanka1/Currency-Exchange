import {Component, Input, OnInit} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {Curriencies} from '../Model/currencies';
import {concatMap, map, switchMap, tap} from 'rxjs/operators';
import {GetCurrencyService} from '../Services/get-currency.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {

  constructor(private getCurrencyService: GetCurrencyService) { }
  @Input() events: Observable<Curriencies>;
  countryCodeTab: {[k: string]: number};
  chooseRates = {key: 'EUR', value: 0};
  sourceInterval = interval(1000);

  ngOnInit() {
    this.events.pipe(
      map((el: Curriencies) => {
        return el.rates;
      })
    ).subscribe((el: {[k: string]: number} = {}) => {
      this.countryCodeTab = el;
      this.countryCodeTab.EUR = 1;
      this.chooseRates.value = el.PLN;
    });
  }

  getRates(currency: {key: string, value: number}) {
    this.getCurrencyService.currenciesToCalculate(currency.key).pipe(
      map((el: Curriencies) => {
          return el.rates;
        }
      ),
      switchMap(el => this.startTimer())
    ).subscribe((rate) => {
      this.chooseRates = {key: currency.key, value: rate.PLN};
    });
  }

  startTimer() {
    return interval(1000).pipe(
      tap(el => console.log(el))
    );
  }
}
