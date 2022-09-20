import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgApexchartsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
