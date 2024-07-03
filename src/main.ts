/// <reference types="@angular/localize" />
import { Component, importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

bootstrapApplication(
  AppComponent,
  {
    providers: [
      provideRouter(routes),
      provideHttpClient(),
      importProvidersFrom(
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        })
      ),
    ],
  }
  // TranslateModule.forRoot({
  // loader: {
  //   provide: TranslateLoader,
  //   useFactory: HttpLoaderFactory,
  //   deps: [HttpClient],
  // },
  // })
).catch((err) => console.error(err));
