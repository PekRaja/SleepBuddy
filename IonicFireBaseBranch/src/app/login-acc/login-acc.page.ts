import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import  firebase from '../firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'app-login-acc',
  templateUrl: './login-acc.page.html',
  styleUrls: ['./login-acc.page.scss'],
})
export class LoginAccPage implements OnInit {

  username : string = "";
  password : string = "";
	constructor(public afAuth: AngularFireAuth,public router: Router, 
		public user: UserService, private fb : Facebook
		//private facebook: FacebookOriginal,
		
		) { }

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
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));


  //this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
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
