export interface AuthData {
  email: string;
  name: string;
  address: string;
  telephone: string;
  password: string;
  bookings: [
    {
      tank: number;
      date: string;
      notes: string;
    }
  ];
}
