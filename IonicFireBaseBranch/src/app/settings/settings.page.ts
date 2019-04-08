import { Component, OnInit, NgModule, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ITheme, ThemesArray, ThemeType } from '../themes';
import { ISetThemeEvent } from '../events';
import { ThemeService } from '../theme.service';
import { GraphicService } from '../graphic.service';
import { Graphic, Graphics, GraphicName } from '../graphics';
import { SleepDataServiceService } from '../sleep-data-service.service';
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
  graphs: Array<Graphic>;
  username: string;
  isEditUsername: boolean;
  mail: string;
  joined: string;
  constructor(private themeService: ThemeService, private graphics: GraphicService, private sleep_data: SleepDataServiceService) { }
  ngOnInit() {
    this.themes = ThemesArray;
    this.graphs = Graphics;
    this.username = this.sleep_data.username;
    this.isEditUsername = false;
    this.mail = this.sleep_data.user.mail;
  }
  ngOnDestroy() {
    // TODO: this only needs to be done if the values have been changed since reading them from storage
    this.themeService.writeThemeInStorage();
    this.graphics.writeGraphToStorage();
  }
  // Username
  editUsername() {
    this.isEditUsername = true;
  }
  confirmEditUsername() {
    // upload new username to firebase
    try {
      this.sleep_data.setUsername(this.username);
    } catch (error) {
      console.log(error);
    }
    // show error popup if upload to firebase failed.
    this.isEditUsername = false;
  }
  // Graphs
  graphName(g: number): string {
    return GraphicName[g];
  }
  graphicReady(): boolean {
    if (this.graphics.CurrentGraphic != null) { return true; } else { return false; }
  }
  isCurrentGraph(name: GraphicName) {
    if (name === this.graphics.CurrentGraphic.Name) { return true; } else { return false; }
  }
  setGraph(g: Graphic) {
    this.graphics.setGraphic(g);
  }
  // Themes
  getTheme(): ITheme {
    return this.themeService.CurrentTheme;
  }
  setTheme(t: ITheme) {
    this.themeService.setTheme(t);
  }
  isCurrentTheme(type: ThemeType): boolean {
    if (this.themeService.CurrentTheme.Type === type) { return true; } else { return false; }
  }
  themeReady(): boolean {
    if (this.themeService.CurrentTheme != null) { return true; } else { return false; }
  }
  // TODO: User profile
  ChangePassword() {
    console.log('*Takes user to a page to change password*');
  }
  RequestsAllData() {
    console.log('*Sends a zip file to the user with all their data*');
  }
}
