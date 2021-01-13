import {Component, OnInit} from '@angular/core';
import {GetCurrencyService} from './Services/get-currency.service';
import {Subject} from 'rxjs';
import {Curriencies} from './Model/currencies';


@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss']
})
export class CurrencyExchangeComponent implements OnInit {

  constructor(private getCurrencyService: GetCurrencyService) { }

  public $currenciesSubject = new Subject<Curriencies>();

  ngOnInit() {
    this.getCurrencyService.currenciesToCalculate('EUR').subscribe(
      (item: Curriencies) => {
        this.$currenciesSubject.next(item);
      }
    );
  }

}
