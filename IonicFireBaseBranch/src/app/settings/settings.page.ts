import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ITheme, ThemesArray } from '../themes';
import { ISetThemeEvent } from '../events';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsPage
      }
    ])
  ],
  declarations: [SettingsPage]
})
export class SettingsPage implements OnInit {
  themes: Array<ITheme>;
  currentTheme: ITheme;
  constructor(private themeService: ThemeService) { }
  ngOnInit() {
    this.themes = ThemesArray;
    // set current theme here! Read from storage or choose the default
    this.currentTheme = this.getTheme();
  }
  getTheme(): ITheme {
    return this.themeService.getThemeFromStorageOrDefault();
  }
  setTheme(e: ISetThemeEvent) {
    this.currentTheme = this.themeService.setTheme(e.detail.value);
  }
  isCurrent(x: ITheme): boolean {
    if (this.currentTheme === x) {
      return true;
    } else { return false; }
  }
  ChangePassword() {
    console.log('*Takes user to a page to change password*');
  }
  RequestsAllData() {
    console.log('*Sends a zip file to the user with all their data*');
  }
}
