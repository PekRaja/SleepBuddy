import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';
import { ITheme, DefaultTheme, ThemeType, CSSTextGenerator } from './themes';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  CurrentTheme: ITheme = DefaultTheme;
  constructor(@Inject(DOCUMENT) private document: Document, private storage: Storage) {
    this.initialize();
  }
  private initialize() {
    this.getThemeFromStorageOrDefault();
    setTimeout(() => {
      this.setGlobalCSS(CSSTextGenerator(this.CurrentTheme.Colors));
    }, 1000);
  }
  getThemeFromStorageOrDefault() {
    this.storage.get('theme').then((_theme: ITheme) => {
      this.setGlobalCSS(CSSTextGenerator(_theme.Colors));
      this.CurrentTheme = _theme;
    }).catch(error => {
      this.CurrentTheme = DefaultTheme;
    });
 }
  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }
  writeThemeInStorage() {
    this.storage.set('theme', this.CurrentTheme).then(() => console.log('theme written in storage')).catch(error => console.log(error));
  }
  setTheme(t: ITheme) {
    this.CurrentTheme = t;
    this.setGlobalCSS(CSSTextGenerator(this.CurrentTheme.Colors));
  }
}
