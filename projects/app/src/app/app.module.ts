import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FootersModule } from './features/footers';
import { HeadersModule } from './features/headers';
import { LayoutsModule } from './features/layouts';
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
    FootersModule,
    HeadersModule,
    LayoutsModule
  ],
  declarations: [AppComponent],
  providers: [...dynamicProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
