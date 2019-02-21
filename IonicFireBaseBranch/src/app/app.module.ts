import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import  firebaseconfig from './firebase';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/auth'


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
