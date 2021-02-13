import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {GetCurrencyService} from '../currency-exchange/Services/get-currency.service';
import {first, map, mergeMap, pluck, skipWhile, switchMap, takeWhile, tap} from 'rxjs/operators';
import {Curriencies} from '../currency-exchange/Model/currencies';
import {fromEvent, interval, Observable} from 'rxjs';

@Component({
  selector: 'app-checking-the-price',
  templateUrl: './checking-the-price.component.html',
  styleUrls: ['./checking-the-price.component.scss']
})
export class CheckingThePriceComponent implements AfterViewInit {

  constructor(private getCurrencyService: GetCurrencyService) { }

  getRates: {[k: string]: number} = {};
  updateTime = 0.1;
  getPrice: number;
  getCurrency: string;
  getValueOfMin: number;
  interval: Observable<number>;
  @ViewChild('start', { static: true }) startButton: ElementRef;

  ngAfterViewInit() {
    (Object.keys(this.getCurrencyService.getCourses()).length === 0) ? this.getRatesFormApi('PLN').subscribe(el => this.getRates = el)
    : this.getRates = this.getCurrencyService.getCourses();

    fromEvent<any>(this.startButton.nativeElement, 'click').pipe(
      skipWhile(() => (this.updateTime * 60) * 1000 < 1000),
      switchMap(() => this.startTimer((this.updateTime * 60) * 1000)),
      pluck('PLN'),
      takeWhile(el => el <= this.getPrice),
      first()
    ).subscribe( el =>
      console.log(el)
    );
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

  startTimer(updateTime) {
    return interval(updateTime).pipe(
      mergeMap(() => this.getRatesFormApi(this.getCurrency))
    );
  }
}
