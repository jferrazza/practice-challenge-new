import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Coffee } from '../coffee';
import { Member } from '../member';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-shout',
  templateUrl: './shout.component.html',
  styleUrls: ['./shout.component.css']
})
export class ShoutComponent implements OnInit {

  addForm;
  warn: string = "";
  user:string;
  amount: number;
  share: SharedService;
  key:string;
  ngOnInit(): void {

  }
  constructor(private service: SharedService, private formBuilder: FormBuilder, private router: Router) {
    if (this.service.that == undefined)
    this.router.navigate(['/home']);
     this.addForm = this.formBuilder.group({
      $key: this.service.that.$key,
      userid: this.service.that.userid,
      date: this.service.that.date,
      time: this.service.that.time,
      paidby: null,
      amount: null
    })
    this.share = this.service;
  }
  getUser(k,u){
    this.key = k;
    this.user = u;
  }

  addShout(data) {

    if (data.paidby == null || data.amount == null) {
      this.warn = "Please enter all fields.";
      return;
    }
    console.log(data);
    this.service.UpdateCoffee(this.service.that.$key, data as Coffee);
    this.router.navigate(['/home']);
  }
}
