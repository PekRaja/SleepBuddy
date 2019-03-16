import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage';
import { ITheme, DefaultTheme, ThemeType, CSSTextGenerator } from './themes';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document, private storage: Storage) {
    console.log('Theme service init');
    this.initialize();
  }
  private initialize() {
    this.setGlobalCSS(CSSTextGenerator(this.getThemeFromStorageOrDefault().Colors));
  }
  getThemeFromStorageOrDefault(): ITheme {
    this.storage.get('theme').then((_theme: ITheme) => {
      this.setGlobalCSS(CSSTextGenerator(_theme.Colors));
      return _theme;
    }).catch(error => {
      return DefaultTheme;
    });
    return DefaultTheme;
  }
  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }
  setTheme(t: ITheme): ITheme {
    this.storage.set('theme', t).then(message => {
      this.storage.get('theme').then(_theme => {
        this.setGlobalCSS(CSSTextGenerator(_theme.Colors));
        return _theme;
      }).catch(error => {
        console.log(error);
        return DefaultTheme;
      });
    }).catch(error => {
      console.log(error);
      return DefaultTheme;
    });
    return DefaultTheme;
  }
}
