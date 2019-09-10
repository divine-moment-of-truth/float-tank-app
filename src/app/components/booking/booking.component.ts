import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

import { Tank } from '../../models/tank.model';

import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { TankService } from 'src/app/services/tank.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

  private tankSub: Subscription;

  // public payPalConfig?: IPayPalConfig;
  selectedDate: any;
  convertedDate: string;
  displayDate: string;
  dateSelectionButtonPressed = false;
  tankAvailability: Tank[] = [];
  tankOneAvailability: string[] = [];
  tank: Tank;

  bookingForm: FormGroup;

  constructor(private tankService: TankService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bookingForm = new FormGroup({
       enteredDate: new FormControl(),
    });
  }

  paypalStuff() {

  }

  onSelect(event) {
    this.selectedDate = event;
    // this.displayDate = moment(event).format('dddd MMMM D, YYYY');
    this.displayDate = moment(event).format('dddd MMMM D, YYYY');

    this.convertedDate = moment(event).format('DD-MM-YYYY');
    this.bookingForm.patchValue({
      enteredDate: this.convertedDate
    });
  }

  getTankAvailability() {
    if (this.convertedDate) {
      this.tankService.getAllTanks()
        .subscribe((tanks) => {
          this.tankAvailability = tanks.tanks;
          // console.log(this.tankAvailability);
        });

    } else {
      console.log('Please select a date!');
    }
  }

  getTankAvailabilityByDate() {
    this.dateSelectionButtonPressed = false;
    // empty array
    this.tankAvailability = [];
    if (this.convertedDate) {
      this.tankService.getTankAvailabilityByDate(this.convertedDate)
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
      .subscribe((tanks: Tank[]) => {
        this.tankAvailability = tanks;
        this.populateAvailableSessions();
        console.log(this.tankAvailability);
      });
    }
  }

  getTankAvailabilityWithoutDate() {
    this.dateSelectionButtonPressed = false;
    // empty array
    this.tankAvailability = [];
    if (this.convertedDate) {
      this.tankSub = this.tankService.getTankUpdateListener()
        .subscribe((tanks: Tank[]) => {
          this.tankAvailability = tanks;
          this.populateAvailableSessions();
        });
    }
  }

  populateAvailableSessions() {
    // empty array
    this.tankOneAvailability  = [];

    this.dateSelectionButtonPressed = true;
    for(let i = 0; i < this.tankAvailability.length; i++) {
      if (this.tankAvailability[i].tankNumber === 1) {
          // console.log(this.tankAvailability[i]);
          if (this.tankAvailability[i].sessionOne === false) {
            this.tankOneAvailability.push('07:00');
          }
          if (this.tankAvailability[i].sessionTwo === false) {
            this.tankOneAvailability.push('09:00');
          }
          if (this.tankAvailability[i].sessionThree === false) {
            this.tankOneAvailability.push('11:00');
          }
          if (this.tankAvailability[i].sessionFour === false) {
            this.tankOneAvailability.push('13:00');
          }
          if (this.tankAvailability[i].sessionFive === false) {
            this.tankOneAvailability.push('15:00');
          }
          // console.log(this.tankAvailability[i].id);
        }
      }
  }

  bookSessionOLD(id, date, tankNumber, sessionOne, sessionTwo, sessionThree, sessionFour, sessionFive) {
    const tank = new Tank(id, date, tankNumber, sessionOne, sessionTwo, sessionThree, sessionFour, sessionFive);
    this.tankService.updateTankWithNewBooking(tank)
      .subscribe((res) => {
        console.log(res);
      });
  }

  // Open booking confirmation and payment dialog
  bookSession(id, date, tankNumber, sessionOne, sessionTwo, sessionThree, sessionFour, sessionFive, selectedSession) {
    const tank = new Tank(id, date, tankNumber, sessionOne, sessionTwo, sessionThree, sessionFour, sessionFive);
    // let sessionData: string = this.displayDate + ' ' + selectedSession;
    let sessionData: string = selectedSession + ' ' + this.displayDate;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = [sessionData, tank];

    this.dialog.open(BookingDialogComponent, dialogConfig);
  }

  /*ngOnDestroy() {
    this.tankSub.unsubscribe();
  } */

  /* private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'GBP',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'GBP',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'GBP',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          // this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        },
    };
} */
}
