import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ReviewsProvider } from '../../providers/reviews/reviews';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';


@Component({
  selector: 'page-getD',
  templateUrl: 'getD.html'
})
export class GetDPage {
  rev: any ;
  ip;
  link;
  constructor(
    public nav: NavController, 
    public reviewService: ReviewsProvider,
    public http: Http ) {}


 /* GetThem(){
    this.http.get('http://192.168.43.5/FORWARD')
      .map(res => res.json()).subscribe(data => {
        this.rev = data;
        console.log(data)
    })
  }
*/

avancer(){
 this.http.get('http://' + this.ip + '/FORWARD').subscribe((res) => {
console.log(res)
console.log("sent")
 })

}



td(){
  this.http.get('http://' + this.ip + '/LEFT').subscribe((res) => {
console.log(res)
console.log("sent")
 })

}
tg(){
  this.http.get('http://' + this.ip + '/RIGHT').subscribe((res) => {
    console.log(res)
    console.log("sent")
     })

}
reculer(){
  this.http.get('http://' + this.ip + '/BACKWARD').subscribe((res) => {
console.log(res)
console.log("sent")
 })

}
sendS(){
  this.http.get('http://' + this.ip + '/STOP').subscribe((res) => {
    console.log(res)
    console.log("sent")
     })

}
}
