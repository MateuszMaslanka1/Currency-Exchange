import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {

  constructor(private http: HttpClient) { }

  currenciesToCalculate(typeOfCurrencies: string) {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${typeOfCurrencies}`);
  }
}
