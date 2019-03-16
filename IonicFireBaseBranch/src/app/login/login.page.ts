import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RegisterPagePage } from '../register-page/register-page.page';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

registerPage : RegisterPagePage;

  constructor(public navCtrl : NavController, themeService: ThemeService) { }
}
