import {Component, Input, OnInit} from '@angular/core';
import {interval, Observable, of, Subject} from 'rxjs';
import {Curriencies} from '../Model/currencies';
import {concatMap, every, map, switchMap, take, tap} from 'rxjs/operators';
import {GetCurrencyService} from '../Services/get-currency.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

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
  private sourceInterval = interval(1000);
  getNewCurrency = true;
  countSecond = 60;
  startInterval;

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
     if (this.getNewCurrency === false) {
       this.startNewTime();
     }
     this.startInterval = this.sourceInterval.pipe(
      tap(() => this.countSecond--),
      concatMap(() => ((this.countSecond === 0 || this.getNewCurrency === true) ? this.getData(currency.key) : of(null))),
    ).subscribe((rate) => {
      if (isNotNullOrUndefined(rate)) {
        this.chooseRates = {key: currency.key, value: rate.PLN};
      }
    });
  }

  getData(currencyCode: string) {
    this.getNewCurrency = false;
    this.countSecond = 60;
    return this.getCurrencyService.currenciesToCalculate(currencyCode).pipe(
      map((el: Curriencies) => {
          return el.rates;
        }
      )
    );
  }

  startNewTime() {
    this.getNewCurrency = true;
    this.startInterval.unsubscribe();
  }
}
