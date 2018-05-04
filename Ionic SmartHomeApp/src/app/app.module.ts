import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient,HttpClientModule } from '@angular/common/http';

import { HttpModule, JsonpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GetDPage } from '../pages/getD/getD';
import { FirstPage } from '../pages/first/first';
import { ReviewsProvider } from '../providers/reviews/reviews';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GetDPage,
    FirstPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    
    HttpModule,
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FirstPage,
    GetDPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReviewsProvider,
    HttpClient,
    CallNumber,
    InAppBrowser,
    AndroidFingerprintAuth
    
  ]
})
export class AppModule {}
