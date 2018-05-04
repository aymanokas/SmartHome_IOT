import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ReviewsProvider } from '../../providers/reviews/reviews';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http, Headers } from '@angular/http';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';

@Component({
  selector: 'page-first',
  templateUrl: 'first.html'
})
export class FirstPage {
  rev: any ;
  cardClicked = [1,0,0,0,0,0,0,0,0];
  light = 0;
  window = 0;
  terass = 0;
  houseLockState = 1 ;
  temp = 20;
  rain = 0.3;
  humidity = 65;
  fire = 6;
  ferfervalue = 90;

  lockHouseClicked:boolean = false;
  alarmLunched:boolean = false;
  coffreHidden : boolean = false;
  lightClickedBol:boolean = false;
  terasseClickedBol:boolean = false;
  windowClickedBol:boolean = false;
 
  constructor(
    public nav: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController ,
    private callNumber: CallNumber,
    private iab: InAppBrowser,
    public http: Http,
    private androidFingerprintAuth: AndroidFingerprintAuth
   ) {
     setInterval( ()=>{
       this.http.get("http://192.168.43.244:4500/addcapt").map(res => res.json()).subscribe(data => {
      console.log(data);
  
      this.temp = data.temperature;
      console.log(this.temp);
      this.rain = data.rain
      this.humidity = data.humidity
  });}, 2000)
   }

   
fingerPrint(){
  this.androidFingerprintAuth.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.androidFingerprintAuth.encrypt({ clientId: 'Ehtp', username: 'Aymano', password: '8918' })
        .then(result => {
           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
           } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });

    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));
}

   lockHouse(){
    
      let prompt = this.alertCtrl.create({
        title: 'Choose Door',
       
       
        buttons: [
          {
            text: 'close OutDoor',
            handler: data => {
             console.log("outdoor close");
              this.sendValue("outdoor",0);
            }
          },
          {
            text: 'open OutDoor',
            handler: data => {
             console.log("outdoor open");
             this.fingerPrint();
              this.sendValue("outdoor",1);
            }
          },
          {
            text: 'close inDoor',
            handler: data => {
             console.log("inDoor close");
              this.sendValue("indoor",0);
            }
          },
          {
            text: 'open inDoor',
            handler: data => {
              console.log("indoor open");
              this.fingerPrint();
              this.sendValue("indoor",1);
          
            }
          }
        ]
      });
      prompt.present();
     
     
    
   }

   alarmClicked(){
    if(this.alarmLunched){
      this.sendValue("alarm",0);
      console.log("Alarm Off");
      this.alarmLunched = !this.alarmLunched;
     }else  if(!this.alarmLunched){
      this.sendValue("alarm",1);
      console.log("Alarm On");
      this.alarmLunched = !this.alarmLunched;
     }
    
   }

   coffreClicked(){
    if(this.coffreHidden){
      this.sendValue("coffre",0);
      console.log("Coffre Hidden");
      this.coffreHidden = !this.coffreHidden;
     }else  if(!this.coffreHidden){
      this.sendValue("coffre",1);
      console.log("Coffre Showen");
      this.coffreHidden = !this.coffreHidden;
     }
   }
   ferfer(ev){
     if (ev == 0 ) {
      this.terasseClickedBol = false ;
      this.windowClickedBol = false;
        if(this.lightClickedBol){
          console.log("Light Off");
          this.lightClickedBol = !this.lightClickedBol;
        }else  if(!this.lightClickedBol){
          console.log("Light On");
          this.lightClickedBol = !this.lightClickedBol;
        }
     }

     else if(ev == 1){
      this.lightClickedBol = false ;
      this.windowClickedBol = false;
      if(this.terasseClickedBol){
        console.log("terasse Off");
        this.terasseClickedBol = !this.terasseClickedBol;
      }else  if(!this.terasseClickedBol){
        console.log("terasse On");
        this.terasseClickedBol = !this.terasseClickedBol;
      }


     }else if(ev == 2){
      this.terasseClickedBol = false ;
      this.lightClickedBol = false;
      if(this.windowClickedBol){
        console.log("window Off");
        this.windowClickedBol = !this.windowClickedBol;
      }else  if(!this.windowClickedBol){
        console.log("window On");
        this.windowClickedBol = !this.windowClickedBol;
      }
       
     }
   }
   updateSensors(){
     this.http.get("http://192.168.43.244:4500/addcapt").subscribe( res => {
console.log(res);
     })
   }
   setClicked(){
    if(this.lightClickedBol){
      this.sendValue("light",this.ferfervalue);
    }
    if(this.terasseClickedBol){
      this.sendValue("terass",this.ferfervalue);
    }
    if(this.windowClickedBol){
      this.sendValue("window",this.ferfervalue);
    }
    this.lightClickedBol= false;
    this.terasseClickedBol = false;
    this.windowClickedBol = false;
   }
   lightOn(){
     
        if(this.lightClickedBol){
          console.log("Light Off");
          this.lightClickedBol = !this.lightClickedBol;
          this.sendValue("light",0);
        }else  if(!this.lightClickedBol){
          console.log("Light On");
          this.sendValue("light",1);
          this.lightClickedBol = !this.lightClickedBol;
        
     }
    
   }
   sendValue(a,b){
    if(a == "light"){
      if(b<=90) b=0;
      if(b>90) b=1;
      this.light = b;
     }

     if(a == "terass"){ 
      this.terass = b;
     }
     if(a == "window"){
      this.window = b;
     }
    this.http.get("http://192.168.43.244:4500/actionFromIonic?"+a+"="+b).subscribe(
      res =>{
          console.log(res)
      })
   }
scardC(num){
  /*if (this.cardClicked[0] == 0){
  this.http.get("http://192.168.0.112:3000/actionFromIonic?sad=1").subscribe(
    (success)=>{
console.log(success)
  },(err)=>{
    console.log(err)
  })
  }
  */
}


callHome(){
  this.callNumber.callNumber("0666036111", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}

setTemp() {
  let prompt = this.alertCtrl.create({
    title: 'Temperature',
    message: "Set the value",
    inputs: [
      {
        name: 'temperatureInput',
        placeholder: '°C'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
         
        }
      },
      {
        text: 'Set',
        handler: data => {
          console.log('Saved clicked');
          console.log(data)
          this.temp = data.temperatureInput;
          if (data.temperatureInput == "" ){
           this.temp = 25}
           this.sendValue("temperature",this.temp);
      
        }
      }
    ]
  });
  prompt.present();
}

streamCam(){
  const browser = this.iab.create('https://ivideon.com/my/cameras/devices');
}
}

