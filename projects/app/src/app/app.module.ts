import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { FootersModule } from './features/footers';
// import { HeadersModule } from './features/headers';
// import { SectionsModule } from './features/layouts';
import { LayoutDirectivesModule, LayoutTemplatesModule } from './features';

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

    LayoutDirectivesModule,
    LayoutTemplatesModule
    // FootersModule,
    // HeadersModule,
    // SectionsModule
  ],
  declarations: [AppComponent],
  providers: [...dynamicProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
