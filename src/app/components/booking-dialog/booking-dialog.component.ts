import { Component, Inject, OnInit, AfterViewChecked } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BookingTestComponent } from '../booking-test/booking-test.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { IPayPalConfig, ICreateOrderRequest, PayPalScriptService } from 'ngx-paypal';
import { Tank } from 'src/app/models/tank.model';
import { TankService } from 'src/app/services/tank.service';

declare let paypal: any;

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})

export class BookingDialogComponent implements OnInit, AfterViewChecked {
  tankDetails: Tank;
  selectedSession: string;
  dialogPage: number;
  // finalAmount: string = '£30';
  finalAmount: number = 30;
  addScript: boolean = false;
  paypalLoad: boolean = true;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AeqAg8EhspzKHw0MNwWcSNjNFUj5bhyRGdZaue8eu962PaoCUJtZ-GFkcpsiAyGErE7xF99IRlmyMxpM',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: {total: this.finalAmount, currency: 'GBP' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // Do something when payment is successful
        this.tankService.updateTankWithNewBooking(this.tankDetails)
          .subscribe(res => {
            console.log('Tank updated');
          });
      });
    },
    style: {
      label: 'paypal',
      layout: 'vertical',
      color:  'gold',
      shape:  'pill',
      height: 40
    }
  };

  constructor(public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private dialog: MatDialog,
    private tankService: TankService) { }

  formDialog: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl(''),
    town: new FormControl(''),
    postcode: new FormControl(''),
    gender: new FormControl('1')
  });

  initializeFormGroup() {
    this.formDialog.setValue({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: '',
      town: '',
      postcode: '',
      gender: ''
    });
  }

  onCancel() {
    this.formDialog.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.formDialog.reset();
    this.initializeFormGroup();
  }

  ngOnInit() {
    this.selectedSession = this.data[0];
    this.tankDetails = this.data[1];
    this.dialogPage = 1;
  }

  ngAfterViewChecked(): void {
  // renderPaypalButton(): void {
    if(!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, 'paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scriptTagElement = document.createElement('script');
      scriptTagElement.src = 'https://www.paypalObjects.com/api/checkout.js';
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    });
  }

  nextPage() {
    this.dialogPage = this.dialogPage + 1;
    if(this.dialogPage === 3) {
      // this.renderPaypalButton();
    }
  }
}
