import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import  firebaseconfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { BLE } from '@ionic-native/ble/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireAuthModule,
    
  ],
  providers: [
    BLE,
    Facebook,
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
