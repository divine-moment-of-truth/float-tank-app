import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.css']
})

export class SignupComponent {
  isLoading = false;

  constructor(private authService: AuthService) {

  }

  onSignup(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    let balls = this.authService.createUser(form.value.email, form.value.name, form.value.address, form.value.telephone, form.value.password);
    console.log(balls + 'Hello Andrew');
  }
}
