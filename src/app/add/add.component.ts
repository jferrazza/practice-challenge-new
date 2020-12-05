import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Coffee } from '../coffee';
import { Member } from '../member';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private service: SharedService, private formBuilder: FormBuilder, private router: Router) {
    this.addForm = this.formBuilder.group({
      userid: null,
      date: null,
      time: null,
      paidby: null,
      amount: null
    })
  }

  @Input() cof: any;
  date: Date;
  time: Time;
  warn: string = "";
  addForm;

  ngOnInit(): void {
    if (this.service.me == undefined)
      this.router.navigate(['/']);

  }


    addCoffee(data) {
      if (data.time == null || data.date == null) {
        this.warn = "Please enter all fields.";
      }
      this.addForm.time = data.time;
      this.addForm.date = data.date;
      this.addForm.userid = this.service.me.$key;
      this.service.AddCoffee(this.addForm as Coffee);
      this.router.navigate(['/home']);
    }


  }