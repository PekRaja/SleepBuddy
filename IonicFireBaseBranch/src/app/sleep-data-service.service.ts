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
    console.log('sleep data service init');

    console.log('user mail: ' + _user.user.mail);
    console.log('uid: ', _user.user.uid);
    this.user = _user.user;
    if (this.user === null) {
      console.log('user is undefined');
      console.log('navigating to login page.');
      this.navCtrl.navigateRoot('/login-acc');
    } else {
      console.log('SleepDataService.user exists..');
      console.log(this.user);
      this.checkIfRecordsExist(this.user.uid);
      this.username = this.createInitialUsername();
      console.log('default username:', this.username);
    }
    /*
    // get UID from firebase auth service
    const uid = user.getUID();
    this.UID = uid;
    // create a directory for the user if none exists
    this.user_path += this.UID + '/';
    const fire = firebase.database().ref(this.user_path).once('value').then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
    // set paths to find user data
    this.data_path += this.UID + '/';
    this.users_ref = firebase.database().ref(this.user_path);
    this.data_ref = firebase.database().ref(this.data_path);

    this.users_ref.on('value', res => {
      this.users = snapshotToArray(res);
      console.log('users:');
      console.log(this.users);
    });
    if (this.users = []) {
      this.initializeUserDocuments();
    }
    this.data_ref.on('value', res => {
      this.data = snapshotToArray(res);
      console.log('data:');
      console.log(this.data);
    });
    this.pressure_ref.on('value', res => {
      this.pressure = snapshotToArray(res);
      console.log('pressure:');
      console.log(this.pressure);
    });
    this.piezo_a_ref.on('value', res => {
      this.piezo_a = snapshotToArray(res);
      console.log('piezo a:');
      console.log(this.piezo_a);
    });
    */
  }
  username: string;
  user: IUser;
  /*

  users = [];
  data = [];
  piezo_a = [];
  piezo_b = [];
  pressure = [];
  users_ref = firebase.database().ref(this.user_path);
  data_ref = firebase.database().ref(this.data_path);
  piezo_a_ref = firebase.database().ref(this.piezo_a_data_path);
  piezo_b_ref = firebase.database().ref(this.piezo_b_data_path);
  pressure_ref = firebase.database().ref(this.pressure_data_path);
  getUser() {
    return this.user_path += this.UID + '/';
  }
  */
  getUsername(): string {
    return this.username;
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
