import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header-old',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponentOld implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter();

  userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onToggleClose() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
