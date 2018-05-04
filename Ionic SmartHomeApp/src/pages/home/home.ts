import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ReviewsProvider } from '../../providers/reviews/reviews';

import { FirstPage } from '../first/first';
import { GetDPage } from '../getD/getD';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rev: any ;
  constructor(
    public nav: NavController,
     
   ) {}

   goFirst(){
  this.nav.push(FirstPage)
}
  
}
