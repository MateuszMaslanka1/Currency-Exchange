import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GetCurrencyService} from '../currency-exchange/Services/get-currency.service';
import {first, map, mergeMap, pluck, skipWhile, switchMap, take, takeWhile, tap} from 'rxjs/operators';
import {Curriencies} from '../currency-exchange/Model/currencies';
import {fromEvent, interval, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-checking-the-price',
  templateUrl: './checking-the-price.component.html',
  styleUrls: ['./checking-the-price.component.scss']
})
export class CheckingThePriceComponent implements AfterViewInit {

  constructor(private getCurrencyService: GetCurrencyService) { }

  getRates: {[k: string]: number} = {};
  updateTime = 1;
  getPrice: number;
  getCurrency: string;
  isStart = false;
  interval: Subscription;
  @ViewChild('start', { static: true }) startButton: ElementRef;

  ngAfterViewInit() {
    (Object.keys(this.getCurrencyService.getCourses()).length === 0) ? this.getRatesFormApi('PLN').subscribe(el => this.getRates = el)
    : this.getRates = this.getCurrencyService.getCourses();
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
      console.log('jest');
      this.interval.unsubscribe();
    }
    if (this.updateTime >= 1 && this.updateTime < 30) {
      this.isStart = true;
      this.interval = interval(time).pipe(
        tap(() => this.isStart = true),
        mergeMap(() => this.getRatesFormApi(this.getCurrency)),
        pluck('PLN'),
        takeWhile(el => el <= this.getPrice, true)
      ).subscribe(el => console.log(el));
    }
  }
}
