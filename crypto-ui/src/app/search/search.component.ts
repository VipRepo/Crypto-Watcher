import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CurrencyService } from "../service/currency.service";

@Component({
  selector: "search",
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: []
})
export class SearchComponent implements OnInit {
    query: any= {};

    public constructor(private currencyService: CurrencyService) {
        
    } 

    ngOnInit() {
    }

    findCurrencies(pattern) {
      if(pattern && pattern.length >0) {
        this.currencyService.findCurrencies(pattern)
        .subscribe(currencies => {
           this.publish(currencies);
        }, err => {
          console.log("Error" + err);
        });
      } else {
        this.currencyService.getCurrencies()
        .subscribe(currencies => {
           this.publish(currencies);
        }, err => {
          console.log("Error" + err);
        });
      }
    }

    searchCurrencies() {
      this.findCurrencies(this.query.currency);
    }

    publish(currencies){
        this.currencyService.publishCurrencies(currencies);
    }
}