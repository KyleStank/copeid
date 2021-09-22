import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutTemplatesModule } from '@core/layouts/templates';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

const dynamicProviders: Provider[] = [];
if (environment.local) {
  dynamicProviders.push({ provide: LocationStrategy, useClass: HashLocationStrategy });
}

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutTemplatesModule
  ],
  declarations: [AppComponent],
  providers: [
    ...dynamicProviders,
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: {
        disabled: false,
        animation: {
          enterDuration: 300,
          exitDuration: 0
        }
      } as RippleGlobalOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
