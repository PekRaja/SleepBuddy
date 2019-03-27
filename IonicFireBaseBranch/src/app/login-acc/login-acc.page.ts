import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Platform } from '@ionic/angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import  firebase from '../firebase';
import { LoadingController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';

@Component({
  selector: 'app-login-acc',
  templateUrl: './login-acc.page.html',
  styleUrls: ['./login-acc.page.scss'],
})
export class LoginAccPage implements OnInit {

  username : string = "";
  password : string = "";
  permissions : string[]
  fingerprintOptions: FingerprintOptions;
	constructor(public afAuth: AngularFireAuth,
		public auth:AngularFireAuthModule,
    public router: Router, 
    public user: UserService, 
    private fb : Facebook,
		private fingerprint: FingerprintAIO, 
    private platform: Platform
    ) {
  this.fingerprintOptions = {
        clientId: 'fingerprint',
        clientSecret: 'password',
        disableBackup: true
      }
  }

  ngOnInit() {
  }
  async login() {
		const { username, password } = this
		try {
			const res = await this.afAuth.auth.signInWithEmailAndPassword(username , password)
			
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})
        this.router.navigate(['/home'])
        console.log("succes")
      }
      
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				console.log("User not found")
			}
    }
	}
	
  FacebookLog(){
  this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res,this.router.navigate(['/home'])))
  .catch(e => console.log('Error logging into Facebook', e));
	this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  async showFingerprintDialog(){
    try{
      await this.platform.ready();
      const available = await this.fingerprint.isAvailable();
      console.log(available);
      if (available === "finger"){
        const result = await this.fingerprint.show(this.fingerprintOptions);
        console.log(result);
        this.router.navigate(['/home'])
        console.log("succes")
      }
    }
    catch (e){
      console.error(e);
    }  
  }
}
