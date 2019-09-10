import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './components/main-content/main-content.component';
import { BookingComponent } from './components/booking/booking.component';
import { FloatingComponent } from './components/floating/floating.component';
import { InfraRedSaunaComponent } from './components/infra-red-sauna/infra-red-sauna.component';
import { PaypalComponent } from './components/paypal/paypal.component';

const routes: Routes = [
  { path: '', component: MainContentComponent},
  { path: 'booking', component: BookingComponent },
  { path: 'floating', component: FloatingComponent },
  { path: 'infra-red-sauna', component: InfraRedSaunaComponent },
  { path: 'paypal', component: PaypalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
