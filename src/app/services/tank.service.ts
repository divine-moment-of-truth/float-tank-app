import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tank } from '../models/tank.model';

@Injectable({
  providedIn: 'root'
})
export class TankService {
  private tanks: Tank[] = [];
  private tanksUpdate = new Subject<Tank[]>();

  constructor(private httpClient: HttpClient) { }

  getTankAvailabilityByDate(selectedDate: string) {
    return this.httpClient
      .get<{ message: string, tanks: any }>(
        'http://localhost:3000/api/tanks/' + selectedDate
      );
    }

  getTankAvailabilityWithoutData() {
    // return this.httpClient.get<{ message: string, tanks: any }>('http://localhost:3000/api/tanks/' + selectedDate);
    this.httpClient
      .get<{ message: string, tanks: any }>(
        'http://localhost:3000/api/tanks/'
      )
      .pipe(map((tankData) => {
        return tankData.tanks.map(tank => {
          return {
            id: tank._id,
            date: tank.date,
            tankNumber: tank.tankNumber,
            sessionOne: tank.sessionOne,
            sessionTwo: tank.sessionTwo,
            sessionThree: tank.sessionThree,
            sessionFour: tank.sessionFour,
            sessionFive: tank.sessionFive
          };
        });
      }))
      .subscribe(transformedTanks => {
        this.tanks = transformedTanks;
        this.tanksUpdate.next([...this.tanks]);
      });
    }

  getTankUpdateListener() {
    return this.tanksUpdate.asObservable();
  }

  getAllTanks() {
    return this.httpClient.get<{ message: string, tanks: any }>('http://localhost:3000/api/tanks');
  }

  getTankUpdatedListener() {
    return this.tanksUpdate.next([...this.tanks]);
  }

  // Update tank with new booked session
  updateTankWithNewBooking(tank: Tank) {
    console.log(tank);
    return this.httpClient.put<{ message: string }>('http://localhost:3000/api/tank/' + tank.id, tank);
  }
}
