import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetCurrencyService} from '../currency-exchange/Services/get-currency.service';
import {map, mergeMap, pluck, takeWhile} from 'rxjs/operators';
import {Curriencies} from '../currency-exchange/Model/currencies';
import {interval, Subscription} from 'rxjs';
import {FirebaseManagerService} from '../Services/firebase-manager.service';

@Component({
  selector: 'app-checking-the-price',
  templateUrl: './checking-the-price.component.html',
  styleUrls: ['./checking-the-price.component.scss']
})
export class CheckingThePriceComponent implements OnInit, OnDestroy {

  constructor(private getCurrencyService: GetCurrencyService, private firebaseManagerService: FirebaseManagerService)  { }

  getRates: {[k: string]: number} = {};
  updateTime = 1;
  getPrice: number;
  getCurrency: string;
  isStart = false;
  interval: Subscription;
  purchaseAmount = 0;


  ngOnInit() {
    (Object.keys(this.getCurrencyService.getCourses()).length === 0) ? this.getRatesFormApi('PLN').subscribe(el => this.getRates = el)
    : this.getRates = this.getCurrencyService.getCourses();
  }

  ngOnDestroy() {
    if (this.isStart) {
      this.interval.unsubscribe();
    }
  }

  getRatesFormApi(getCurrencies) {
    return this.getCurrencyService.currenciesToCalculate(getCurrencies).pipe(
      map((el: Curriencies) => {
        return el.rates;
    }));
  }

  getCurrencyValue(currency) {
    this.getCurrency = currency.key;
  }

  newTimer() {
    const time: number = (this.updateTime * 60) * 1000;
    if (this.isStart) {
      this.interval.unsubscribe();
    }
    if (this.updateTime >= 1 && this.updateTime < 30) {
      this.isStart = true;
      this.interval = interval(2000).pipe(
        mergeMap(() => this.getRatesFormApi(this.getCurrency)),
        pluck('PLN'),
        takeWhile(el => el >= this.getPrice, true)
      ).subscribe(el => {
        this.purchaseAmount = el;
        this.firebaseManagerService.create(el);
      });
    }
  }
}
