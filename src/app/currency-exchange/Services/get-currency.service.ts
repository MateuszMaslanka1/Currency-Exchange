import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {

  constructor(private http: HttpClient) { }

  saveCoursesObj: {[k: string]: number} = {};

  currenciesToCalculate(typeOfCurrencies: string) {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${typeOfCurrencies}`);
  }

  setCourses(saveCoursesObj: {[k: string]: number} = {}) {
    this.saveCoursesObj = saveCoursesObj;
  }

  getCourses() {
    return this.saveCoursesObj;
  }
}
