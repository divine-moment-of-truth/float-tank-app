import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})

export class WelcomePageComponent implements OnInit {
  loggedInUserCredential: {};
  userName: string;
  userAddress: string;
  userBookings: [];
  panelOpenState = false;

  ngOnInit() {
    this.loggedInUserCredential = history.state.data;
    this.userName = history.state.data.name;
    this.userBookings = history.state.data.bookings;
    console.log(history.state.data.email);
    console.log(this.loggedInUserCredential);
  }
}
