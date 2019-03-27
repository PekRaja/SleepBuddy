import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Platform } from '@ionic/angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
//import { Facebook, FacebookOriginal } from '@ionic-native/facebook';
import  firebase from '../firebase';
import { ThemeService } from '../theme.service';


@Component({
  selector: 'app-login-acc',
  templateUrl: './login-acc.page.html',
  styleUrls: ['./login-acc.page.scss'],
})
export class LoginAccPage implements OnInit {

  username : string = "";
  password : string = "";
  fingerprintOptions: FingerprintOptions;
	constructor(private fingerprint: FingerprintAIO, private platform: Platform, public afAuth: AngularFireAuth,public router: Router, 
		public user: UserService,
		//private facebook: FacebookOriginal,
		private themeService: ThemeService
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
	/*facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
  
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            console.log("Firebase success: " + JSON.stringify(success)); 
          });
  
      }).catch((error) => { console.log(error) });
  }*/
}
