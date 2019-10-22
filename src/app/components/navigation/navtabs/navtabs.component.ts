import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navtabs',
  templateUrl: './navtabs.component.html',
  styleUrls: ['./navtabs.component.css']
})
export class NavtabsComponent implements OnInit, OnDestroy {
  @Output() sideNavigationToggle = new EventEmitter();

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  isUserLoggedIn() {
    if (this.userIsAuthenticated) {
      // navigate to booking page
      this.router.navigate(['/booking']);

    } else {
      // navigate to login page
      this.router.navigate(['/login']);
    }
  }

  onToggleSidenav() {
    this.sideNavigationToggle.emit();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
