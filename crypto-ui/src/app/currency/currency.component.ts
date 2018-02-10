import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Currency } from "../model/currency.model";
import { CurrencyService } from "../service/currency.service";
import { Observable, Subject } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-currency",
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  providers: []
})
export class CurrencyComponent {

  currencies: Currency[] = [];
  displayedColumns = ['id', 'name', 'price', 'select'];
  dataSource: any;
  selection:any;

  public constructor(private currencyService: CurrencyService) {
    console.log("Initializing currency component");
  }

  public ngOnInit(): void {
    this.loadCurrencies();
    this.subscribeToSearchedCurrency();
    this.selection = new SelectionModel<Currency>(false, []);
  }

  subscribeToSearchedCurrency() {
    this.currencyService.currencies$
    .subscribe(currencies => {
      this.currencies = currencies;
      this.dataSource = new MatTableDataSource<Currency>(this.currencies);
    }, err => {
      console.log("Error" + err);
      return Observable.empty();
    });
  }


  loadCurrencies() {
    this.currencyService.getCurrencies()
    .subscribe(currencies => {
      this.currencies = currencies;
      this.dataSource = new MatTableDataSource<Currency>(this.currencies);
      // console.log(`Currencies on subscribe  ${JSON.stringify(currencies, undefined, 2)}`);
    }, err => {
      console.log("Error" + err);
      return Observable.empty();
    });
  }

}
