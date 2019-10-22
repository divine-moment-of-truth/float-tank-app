import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private returnedUserDetails: AuthData;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, name: string, address: string, telephone: string, password: string) {
    const authData: AuthData = {
      email: email,
      name: name,
      address: address,
      telephone: telephone,
      password: password,
      bookings: [
        {
          tank: 1,
          date: '',
          notes: ''
        }
      ]
    };
    console.log(authData);

    return  this.http
        .post('http://localhost:3000/api/user/signup', authData)
        // .do(res => {
        //   if (res.status === '201') {
        //     console.log(res);
        //   }
        // })
        // .map(res => {res.json()})
        .subscribe(response => {
          console.log(response);
        });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      name: '',
      address: '',
      telephone: '',
      password: password,
      bookings: [
        {
          tank: 1,
          date: '',
          notes: ''
        }
      ]
    };

    this.http.post<{token: string, userDetails: AuthData, expiresIn: number}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.returnedUserDetails = response.userDetails;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);

          console.log(token);
          console.log('Test 1 - ' + this.returnedUserDetails.name);
          console.log('Test 1 - ' + this.returnedUserDetails.email);
          console.log('Test 1 - ' + this.returnedUserDetails.bookings[0].notes);

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          // this.router.navigate(['welcome'], { state: { data: authData }} );
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['welcome'], { state: { data: this.returnedUserDetails }} );
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // check to see if user is still authenticated
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // if the time is in the future
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);  // divide by 1000 to change into seconds
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}

