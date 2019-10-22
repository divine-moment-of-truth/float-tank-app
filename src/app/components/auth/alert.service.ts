import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();

  constructor(private router: Router) { }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

}

