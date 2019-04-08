import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { RegisterPagePage } from '../register-page/register-page.page';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
registerPage: RegisterPagePage;
  constructor(public navCtrl: NavController, private themeService: ThemeService, private menuCtrl: MenuController) { }
  ngOnInit() {
    this.menuCtrl.enable(false);
  }
}
