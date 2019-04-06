import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import { snapshotToArray, IFirebaseUser } from './firebase';
import { UserService, IUser } from './user.service';
import * as DB from './db_paths';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class SleepDataServiceService {
  constructor(private _user: UserService, public router: Router, private navCtrl: NavController) {
    this.user = _user.user;
    if (this.user === null) {
      this.navCtrl.navigateRoot('/login-acc');
    } else {
      this.checkIfRecordsExist(this.user.uid);
      this.username = this.createInitialUsername();
    }
  }
  username: string;
  user: IUser;

  getUsername(): string {
    return this.username;
  }
  setUsername(_username: string) {
    firebase.database().ref(DB.USER_PATH + this._user.getUID()).set({
      mail: this.user.mail,
      username: _username
    }).then((res) => {
      if (!res) { console.log('username set.')} else { console.log("couldn't set username:" + res)} 
    });
  }
  initializeUserDocuments() {
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      console.log(currentUser.displayName);
      firebase.database().ref(DB.USER_PATH + this._user.user.uid).set({
        mail: this._user.getUserEMail(),
        username: this.createInitialUsername()
      }).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }
  writeUserData(_username, _email) {
    firebase.database().ref(DB.USER_PATH + this._user.user.uid).set({
      mail: _email,
      username: _username
    }, (error) => {
      if (error) { console.log(error); } else {
        console.log('wrote ' + { mail: _email, username: _username } + 'to' + DB.USER_PATH + this._user.user.uid);
    }
  });
  }

  readUsernameFromFirebase() {
    firebase.database().ref(DB.USER_PATH + this.user.uid).once('value').then(res => {
      if (res.exists) {
        console.log(res);
        return 'username from db';
      } else {
        console.log('default');
        return 'default username';
      }
    });
  }
  checkIfRecordsExist(UID: string) {
    console.log('Checking records...');
    const p = DB.USER_PATH + UID + '/';
    console.log('searching db at path:', p);

    const fire = firebase.database().ref(p).once('value').then(res => {
      if (res.exists()) {
        console.log('record exists');
        console.log(res.val());
      } else {
        console.log('"users/" record does not exist!!!');
        // initialize db for user
        firebase.database().ref(DB.USER_PATH).child(UID).set({
          mail: this.user.mail,
          username: this.createInitialUsername()
        } as IFirebaseUser).then((msg) => { if (msg) { console.log('created user, message: '); console.log(msg); } else {
          console.log('created user'); }
        });
      }
     }).catch(error => {
      console.log('return to login..');
      console.log('current url:' + this.router.url);
      console.log(this.router.getCurrentNavigation);
      this.router.navigate(['/login']);
      console.log(error);
    });
  }
  createInitialUsername() {
    return this._user.getUserEMail().split('@')[0].toUpperCase();
  }
}
// users/[UID]
export interface ISleepBuddyUserData {
  mail: string;
  username: string;
}
// data/[UID]/measurement[index]/[index]
export interface ISleepBuddyDataReference {
  data_id: number;
  date: string;
  end: string;
  start: string;
}
// pressure_data/[data_id]/[index]
export interface ISleepBuddyPressureData {
  is_pressed: boolean;
  time: string;
}
// piezo_a_data/[data_id]/[index]
export interface ISleepBuddyPiezoData {
  avg: number;
  max: number;
  min: number;
  timestamp: number;
}
