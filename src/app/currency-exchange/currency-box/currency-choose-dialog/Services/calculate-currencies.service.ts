import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateCurrenciesService {

  constructor() { }

  calculate(userValue: number, resultCurrencies: number) {
    const valueToCalculate = userValue * resultCurrencies;
    return parseFloat(valueToCalculate.toFixed(3));
  }

  calculateFormSecondChoose(userValue: number, resultCurrencies: number) {
    const valueToCalculate = userValue / resultCurrencies;
    return parseFloat(valueToCalculate.toFixed(3));
  }
}

