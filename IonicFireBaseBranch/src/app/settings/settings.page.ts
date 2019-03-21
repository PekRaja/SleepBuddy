import { Component, OnInit, NgModule, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
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
export class SettingsPage implements OnInit, OnDestroy {
  themes: Array<ITheme>;
  constructor(private themeService: ThemeService) { }
  ngOnInit() {
    this.themes = ThemesArray;
    // set current theme here! Read from storage or choose the default
  }
  getTheme(): ITheme {
    console.log('SettingsPage: getTheme');
    return this.themeService.CurrentTheme;
  }
  setTheme(e: ISetThemeEvent, x: ITheme) {
    console.log('SettingsPage: ISetThemeEvent is called');
    this.themeService.setTheme(x);
  }
  isCurrent(x: ITheme): boolean {
    console.log('SettingsPage: iscurrent');
    console.log('x.Name: ' + x.Name);
    console.log('current.Name: ' + this.themeService.CurrentTheme.Name);
    if (this.themeService.CurrentTheme === x) {
      return true;
    } else { return false; }
  }
  ChangePassword() {
    console.log('*Takes user to a page to change password*');
  }
  RequestsAllData() {
    console.log('*Sends a zip file to the user with all their data*');
  }
  ngOnDestroy() {
    console.log('writing theme to storage');
    this.themeService.writeThemeInStorage();
  }
}
