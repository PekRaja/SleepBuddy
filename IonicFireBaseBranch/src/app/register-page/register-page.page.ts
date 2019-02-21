import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {
  username : string = "";
  password : string = "";
  Checkpassword : string = "";

  constructor(public afAuth: AngularFireAuth,
    public alert : AlertController,
    public route: Router
    ) { }

  ngOnInit() {
  }

  async register(){
    const {username , password, Checkpassword} = this
    if (password !== Checkpassword){
      this.showAlert("error!", "Password dont match!")
      return console.error("password dont match!")
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username,password)
      console.log(res);
      this.showAlert("Succes!", "Welcome!")
      this.route.navigate(["/home"])
    }catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  }

  async showAlert(title: string, content: string) {
		const alert = await this.alert.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

}
