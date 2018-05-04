import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ReviewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReviewsProvider {
  data: any;
  constructor(public httpClient: HttpClient,public http: Http) {
    this.data = null;
  }


  getReviews(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }

return new Promise(resolve => {
 
  this.http.get('http://localhost:8080/addcapt').subscribe((data)=> {
    console.log(data.json)
  })
   
});

}

/*
 .map(res => res.json())
    .subscribe(data => {
      this.data = data;
      resolve(this.data);
    });*/



}
