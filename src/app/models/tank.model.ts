export class Tank {

  id: string;
  date: string;
  tankNumber: number;
  sessionOne: boolean;
  sessionTwo: boolean;
  sessionThree: boolean;
  sessionFour: boolean;
  sessionFive: boolean;
  // sessionSix: boolean;
  // sessionSeven: boolean;

  constructor(
    id: string,
    date: string,
    tankNumber: number,
    sessionOne: boolean,
    sessionTwo: boolean,
    sessionThree: boolean,
    sessionFour: boolean,
    sessionFive: boolean
  ) {
      this.id = id;
      this.date = date;
      this.tankNumber = tankNumber;
      this.sessionOne = sessionOne;
      this.sessionTwo = sessionTwo;
      this.sessionThree = sessionThree;
      this.sessionFour = sessionFour;
      this.sessionFive = sessionFive;
    }
  }

/* export interface Tank {
  id: string;
  date: string;
  tankNumber: number;
  sessionOne: boolean;
  sessionTwo: boolean;
  sessionThree: boolean;
  sessionFour: boolean;
  sessionFive: boolean;
} */
