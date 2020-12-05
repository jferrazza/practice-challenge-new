import { Time } from '@angular/common';

export interface Coffee {
    $key: string,
    userid: string,
    date: Date;
    time: Time;
    paidby: string;
    amount: number;

}
