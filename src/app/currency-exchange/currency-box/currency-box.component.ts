import {Component, Input, OnInit} from '@angular/core';
import {CurrencyChooseDialogComponent} from './currency-choose-dialog/currency-choose-dialog.component';
import {MatDialog} from '@angular/material';
import {Observable, of} from 'rxjs';
import {delay, map, skipWhile, tap, throttleTime} from 'rxjs/operators';
import {Curriencies} from '../Model/currencies';
import {CalculateCurrenciesService} from './currency-choose-dialog/Services/calculate-currencies.service';
import {GetCurrencyService} from '../Services/get-currency.service';

@Component({
  selector: 'app-currency-box',
  templateUrl: './currency-box.component.html',
  styleUrls: ['./currency-box.component.scss']
})
export class CurrencyBoxComponent implements OnInit {

  constructor(public dialog: MatDialog, private calculateCurrenciesService: CalculateCurrenciesService,
              private getCurrencyService: GetCurrencyService) { }
  @Input() events: Observable<Curriencies>;

  private countryCode;
  private saveThisSameNumber: number;
  private chooseValue: number;
  private valueToCalculate: number;
  private isCalculateCurrency: boolean;
  public chooseCurrency = {
      key: 'EUR',
      value: 0
  };

  public chooseToCalculate = {
    key: 'PLN',
    value: 0
  };

  ngOnInit() {
    this.events.pipe(
      map((el: Curriencies) => {
        return el.rates;
      })
    ).subscribe((el: {[k: string]: number} = {}) => {
      this.getCurrencyService.setCourses(el);
      this.countryCode = el;
      this.chooseToCalculate.value = el.PLN;
    });
  }

  currencyTypeDialog(isCalculateCurrency: boolean): void {
    this.isCalculateCurrency = isCalculateCurrency;
    const dialogRef = this.dialog.open(CurrencyChooseDialogComponent, {
      width: '250px',
      data: this.countryCode
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.isCalculateCurrency) {
        this.getChooseCurrenciesToCalculate(this.chooseToCalculate.key, result.key);
      } else {
        const curriencies = result.key;
        this.chooseToCalculate.key = curriencies;
        this.chooseToCalculate.value = this.countryCode[curriencies];
      }
    });
  }

  getInputValue(switchInput: boolean, valueFormInput: any): void {
    of(valueFormInput.target.value).pipe(
        skipWhile(el => el.toString().length === 0 || el === this.saveThisSameNumber),
        tap(el => this.saveThisSameNumber = el)
      ).subscribe((el: number) => {
        switchInput ? this.valueToCalculate = this.calculateCurrenciesService.calculate(el, this.chooseToCalculate.value) :
        this.chooseValue = this.calculateCurrenciesService.calculateFormSecondChoose(el, this.chooseToCalculate.value);
      });
  }

  getChooseCurrenciesToCalculate(nameChooseOfCurrencies: string, typeOfCurrencies: string) {
    this.getCurrencyService.currenciesToCalculate(typeOfCurrencies).pipe(
      map((el: Curriencies) => {
        return el.rates;
      })
    ).subscribe((el: {[k: string]: number} = {}) => {
      this.chooseCurrency.key = typeOfCurrencies;
      this.chooseToCalculate.value = el[nameChooseOfCurrencies];
      this.countryCode = el;
    });
  }
}
