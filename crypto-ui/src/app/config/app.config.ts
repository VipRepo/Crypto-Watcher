import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {
  routes: {
    langs: 'langs',
    error404: '404'
  },

  endpoints: {
    currencies: 'http://localhost:9081/api/currencies/'
  },
};
