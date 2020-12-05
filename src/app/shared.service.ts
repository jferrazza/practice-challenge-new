import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Coffee } from './coffee';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  me:Member;
  that:Coffee;
  members:Member[];

  ToDate(i){
    let parts = i.date.split('-');
    let d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return d;
  }

  constructor(private db: AngularFireDatabase) {}
  uList: AngularFireList<any>;
  uRef: AngularFireObject<any>;  
  AddUser(member: Member){
    this.uList = this.db.list('members-list');
    this.uList.push({
      name: member.name,
      email: member.email,
      password: member.password,
    });
  }
  AddCoffee(member: Coffee){
    this.uList = this.db.list('coffee-list');
    this.uList.push({
      userid: member.userid,
      date: member.date,
      time: member.time
    });
  }
  GetUser(id: string) {
    this.uRef = this.db.object('members-list/' + id);
    return this.uRef;
  }
  GetUser2(id: string): Member{
    for (let i = 0; i < this.members.length; i++){
      if (this.members[i].$key == id) return this.members[i];
    }
    return undefined;
  }
  // Fetch Students List
  GetUsers() {
    this.uList = this.db.list('members-list');
    return this.uList;
  }  
  GetCoffee(id: string) {
    this.uRef = this.db.object('coffee-list/' + id);
    return this.uRef;
  }
  DeleteCoffee(id: string) {
    this.db.object('coffee-list/' + id).remove();
  }

  // Fetch Students List
  GetCoffees() {
    this.uList = this.db.list('coffee-list');
    return this.uList;
  }  
  UpdateCoffee(id:string, member: Coffee){
    this.uRef = this.db.object('coffee-list/'+id);
    this.uRef.update({
      userid: member.userid,
      date: member.date,
      time: member.time,
      paidby: member.paidby,
      amount: member.amount
    });
  }
}
