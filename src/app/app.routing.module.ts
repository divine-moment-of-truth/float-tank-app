import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainContentComponent } from './components/main-content/main-content.component';
import { BookingComponent } from './components/booking/booking.component';
import { FloatingComponent } from './components/floating/floating.component';
import { BenefitsComponent } from './components/floating/benefits.component';
import { PodsComponent } from './components/floating/pods.component';
import { InfraRedSaunaComponent } from './components/infra-red-sauna/infra-red-sauna.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: MainContentComponent},
  { path: 'booking', component: BookingComponent },
  { path: 'floating', component: FloatingComponent },
  { path: 'benefits', component: BenefitsComponent },
  { path: 'pods', component: PodsComponent },
  { path: 'infra-red-sauna', component: InfraRedSaunaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
