import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coffee } from '../coffee';
import { Member } from '../member';
import { SharedService } from '../shared.service';
import { Total } from '../total';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  service: SharedService;
  constructor(private shared: SharedService, private router: Router) {
    this.service = this.shared;
    if (this.service.me == undefined)
      this.router.navigate(['/']);
    else
      this.refreshCoffeeList();

  }
  CoffeeList: any = [];
  CoffeeListF: any = [];
  CoffeeListP: any = [];
  TotalList: any = [];
  today: Date = new Date();

  ngOnInit(): void {

  }
  deleteCoffee(id) {
    console.log(id);
    if (confirm("Are you sure you want to delete this date?")) {
      this.service.DeleteCoffee(id);
      setTimeout(()=>{
        this.refreshCoffeeList();
      },10);
    }
  }
  shoutCoffee(id) {
    this.service.that = id;
    this.router.navigate(['/shout']);
  }

  refreshCoffeeList() {
    console.info(this.today);
    let s = this.service.GetCoffees();
    this.CoffeeList = [];
    this.CoffeeListF = [];
    this.CoffeeListP = [];
    this.TotalList = [];
    console.log("Getting list...");

    s.snapshotChanges().subscribe(data => { 
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.CoffeeList.push(a as Coffee);
      })
      console.log("List received...");
      this.refreshCoffeeLists();
    });

    for (let i = 0; i < this.service.members.length; i++) {
      this.TotalList.push({
        member: this.service.members[i],
        amount: 0
      });
    }


  }
  refreshCoffeeLists() {

    for (let i = 0; i < this.CoffeeList.length; i++) {
      let ii = this.CoffeeList[i];
      //https://stackoverflow.com/questions/5619202/converting-a-string-to-a-date-in-javascript
      let d = this.service.ToDate(ii);
      console.log(d);
      console.log(this.today);


      let isfuture = d >= this.today;
      if (isfuture) {
        this.CoffeeListF.push(ii);
      }
      else {
        this.CoffeeListP.push(ii);
      }
      if (ii.paidby != null) {
        for (let m = 0; m < this.TotalList.length; m++) {
          let mm = this.TotalList[m];
          console.log(ii.paidby);
          if (mm.member.$key == this.service.GetUser2(ii.paidby).$key) {
            mm.amount += ii.amount;
          }
        }
      }
    }
    console.log("Done filtering out results.");

  }
}
