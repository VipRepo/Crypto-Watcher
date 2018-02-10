import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { CurrencyDetail } from "../model/currency-detail.model";
import { CurrencyService } from "../service/currency.service";
import { Observable, Subject } from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: "app-currency-detail",
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
  providers: []
})
export class CurrencyDetailComponent {

  currencyDetail: CurrencyDetail[] = [];
  currencyId: string;
  displayedColumns = ['date', 'txVolume', 'price'];
  dataSource: any;
  timerSubscription: any;
  latestCurrenyDetail: CurrencyDetail;
  fetchingDetail: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public constructor(private currencyService: CurrencyService,
    private route: ActivatedRoute) {
      console.log("Initializing detail component");
        this.currencyId = route.snapshot.params['id'];
  }

  public ngOnInit(): void {
    this.loadCurrencies();
    this.loadLatestPrice();
  }

  loadCurrencies() {
    this.currencyService.getCurrencyDetail(this.currencyId)
    .subscribe(currencyDetail => {
      this.currencyDetail = currencyDetail;
      this.dataSource = new MatTableDataSource<CurrencyDetail>(this.currencyDetail);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log("Error" + err);
      return Observable.empty();
    });
  }

  loadLatestPrice() {
    this.fetchingDetail = true;
    this.currencyService.getLatestCurrencyDetail(this.currencyId)
    .subscribe(currencyDetail => {
      this.latestCurrenyDetail = currencyDetail;
      this.fetchingDetail = false;
      this.subscribeToLatestCurrencyPrice();
    }, err => {
      console.log("Error" + err);
      return Observable.empty();
    });
  }

  subscribeToLatestCurrencyPrice(): void {
    this.timerSubscription = Observable.timer(2 * 60 * 1000).first().subscribe(() => this.loadLatestPrice());
  }

  public ngOnDestroy(): void {
    if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
    }
  }

}
