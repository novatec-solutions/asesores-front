import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { paginatorIntlEs } from './shared/paginatorIntlEs';

// import { ApiInterceptor } from './shared/services/api.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: paginatorIntlEs() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
