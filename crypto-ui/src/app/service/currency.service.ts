import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { AppConfig } from '../config/app.config';
import { Currency } from "../model/currency.model";
import { CurrencyDetail } from "../model/currency-detail.model";


@Injectable()
export class CurrencyService {

    private currencyUrl: string;
    private currencySource = new Subject<any>();
    currencies$ = this.currencySource.asObservable();

    constructor(private http: HttpClient) {
        this.currencyUrl = AppConfig.endpoints.currencies;
      }

      private handleError(error: any) {
        if (error instanceof Response) {
          return Observable.throw(error.json()['error'] || 'backend server error');
        }
        return Observable.throw(error || 'backend server error');
      }

      
    getCurrencies(): Observable<Currency[]> {
        return this.http.get(this.currencyUrl)
        .map((resp: Response) => this.parseCurrencyResponse(resp))
        .catch((error: any) => this.handleError(error));
    }

    findCurrencies(pattern): Observable<Currency[]> {
      let params = new HttpParams()
      .set('pattern', pattern);
      return this.http.get(this.currencyUrl, {
        params: params
      })
      .map((resp: Response) => this.parseCurrencyResponse(resp))
      .catch((error: any) => this.handleError(error));
  }

    

    parseCurrencyResponse(resp): Currency[] {
        console.log(JSON.stringify(resp, undefined, 2));
        let cuurencies = resp.map(curr => new Currency(curr.id, curr.name, curr.price));
        return cuurencies;
    }

    publishCurrencies(currencies: any) {
        this.currencySource.next(currencies);
      }

      getCurrencyDetail(currencyId): Observable<CurrencyDetail[]> {
        return this.http.get(`${this.currencyUrl}/${currencyId}`)
        .map((resp: Response) => this.parseCurrencyDetailResponse(resp))
        .catch((error: any) => this.handleError(error));
      }

      parseCurrencyDetailResponse(resp): CurrencyDetail[] {
        console.log(JSON.stringify(resp, undefined, 2));
        let details = resp.map(curr => new CurrencyDetail(curr.date, curr['price(USD)'], curr['txVolume(USD)']));
        return details;
      }

      getLatestCurrencyDetail(currencyId): Observable<CurrencyDetail> {
        return this.http.get(`${this.currencyUrl}/${currencyId}/latest`)
        .map((curr) => new CurrencyDetail(undefined, curr['price'], curr['volume']))
        .catch((error: any) => this.handleError(error));
      }

     
    
}