import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() public closeSideNavigation = new EventEmitter();

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

  isUserLoggedIn() {
    if (this.userIsAuthenticated) {
      // navigate to booking page
      this.router.navigate(['/booking']);

    } else {
      // navigate to login page
      this.router.navigate(['/login']);
    }
    this.onToggleClose();
  }

  onToggleClose() {
    this.closeSideNavigation.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
