import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { UserService } from '../user.service';
import { SleepDataServiceService } from '../sleep-data-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {
  mail = '';
  password = '';
  Checkpassword = '';

  constructor(public afAuth: AngularFireAuth,
    public alert: AlertController,
    public route: Router,
    private themeService: ThemeService,
    private user: UserService
  ) { }

  ngOnInit() { }

  async register() {
    const { mail, password, Checkpassword } = this;
    if (password !== Checkpassword) {
      this.showAlert('error!', 'Password dont match!');
      return console.error('password dont match!');
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(mail, password);
      console.log(res);
      this.showAlert('Succes!', 'Welcome!');
      this.route.navigate(['/login']);
    } catch (error) {
      console.dir(error);
      this.showAlert('Error', error.message);
    }
  }

  async showAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    });
    await alert.present();
  }
}
