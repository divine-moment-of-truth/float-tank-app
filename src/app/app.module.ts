import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPayPalModule } from 'ngx-paypal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { FloatingComponent} from './components/floating/floating.component';
import { InfraRedSaunaComponent} from './components/infra-red-sauna/infra-red-sauna.component';
import { PaypalComponent } from './components/paypal/paypal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    BookingComponent,
    FloatingComponent,
    InfraRedSaunaComponent,
    PaypalComponent,
    BookingDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPayPalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BookingDialogComponent]
})
export class AppModule { }
