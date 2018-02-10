import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { CurrencyComponent } from "./currency/currency.component";
import { CurrencyDetailComponent } from "./currency-detail/currency-detail.component";

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot([
  { path: '', redirectTo: '/currencies', pathMatch: 'full'},
  { path: 'currencies', component: CurrencyComponent },
  { path: 'currencies/:id', component: CurrencyDetailComponent }
]);
