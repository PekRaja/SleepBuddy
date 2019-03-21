import { Component, OnInit, NgModule, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ITheme, ThemesArray } from '../themes';
import { ISetThemeEvent } from '../events';
import { ThemeService } from '../theme.service';
import { GraphicService } from '../graphic.service';
import { Graphic, Graphics, GraphicName } from '../graphics';

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
  constructor(private themeService: ThemeService, private graphics: GraphicService) { }
  ngOnInit() {
    this.themes = ThemesArray;
    this.graphs = Graphics;
  }
  ngOnDestroy() {
    this.themeService.writeThemeInStorage();
    this.graphics.writeGraphToStorage();
  }
  // Graphics
  graphName(g: number): string {
    return GraphicName[g];
  }
  isCurrentGraph(name: GraphicName) {
    if (name === this.graphics.CurrentGraphic.Name) {
      return true;
    } else { return false; }
  }
  setGraph(g: Graphic) {
    this.graphics.setGraphic(g);
  }
  // Themes
  getTheme(): ITheme {
    return this.themeService.CurrentTheme;
  }
  setTheme(e: ISetThemeEvent, x: ITheme) {
    this.themeService.setTheme(x);
  }
  isCurrent(x: ITheme): boolean {
    if (this.themeService.CurrentTheme === x) {
      return true;
    } else { return false; }
  }
  // User profile
  ChangePassword() {
    console.log('*Takes user to a page to change password*');
  }
  RequestsAllData() {
    console.log('*Sends a zip file to the user with all their data*');
  }
}
