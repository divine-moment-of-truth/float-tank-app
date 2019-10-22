import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPayPalModule } from 'ngx-paypal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { NavtabsComponent } from './components/navigation/navtabs/navtabs.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { HeaderComponentOld } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { FloatingComponent} from './components/floating/floating.component';
import { InfraRedSaunaComponent} from './components/infra-red-sauna/infra-red-sauna.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { WelcomePageComponent } from './components/auth/welcome-page/welcome-page.component';
import { BenefitsComponent} from './components/floating/benefits.component';
import { PodsComponent} from './components/floating/pods.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentOld,
    HeaderComponent,
    NavtabsComponent,
    SidenavListComponent,
    MainContentComponent,
    BookingComponent,
    FloatingComponent,
    InfraRedSaunaComponent,
    BookingDialogComponent,
    LoginComponent,
    SignupComponent,
    WelcomePageComponent,
    BenefitsComponent,
    PodsComponent
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [BookingDialogComponent]
})
export class AppModule { }
