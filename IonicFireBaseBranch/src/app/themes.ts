import * as Color from 'color';
export interface ITheme {
    Name: string;
    Type: ThemeType;
    Colors: IColors;
}
export interface IColors {
    primary: string;
    secondary: string;
    tertiary: string;
    success: string;
    warning: string;
    danger: string;
    light: string;
    medium: string;
    dark: string;
    background: string;
}
export enum ThemeType {
    Dark,
    Light
}
export const themes = {
    Dark: {
        Name: 'Dark',
        Type: ThemeType.Dark,
        Colors: {
            primary: '#e0ac9d',
            secondary: '#e88873',
            tertiary: '#a37774',
            success: '#808040',
            warning: '#e88873',
            danger: '#e0ac9d',
            light: '#ffff9f',
            medium: '#e88873',
            dark: '#a37774',
            background: '#536B78'
        }
    }, Light: {
        Name: 'Light',
        Type: ThemeType.Light,
        Colors: {
            primary: '#558b6e',
            secondary: '#88a093',
            tertiary: '#4c705d',
            success: '#808040',
            warning: '#ff8000',
            danger: '#ff8080',
            light: '#c9f2dc',
            medium: '#8bb7a0',
            dark: '#558b6e',
            background: '#f4fff9'
        }
    }
};
const defaults = {
    primary: '#558b6e',
    secondary: '#88a093',
    tertiary: '#4c705d',
    success: '#808040',
    warning: '#ff8000',
    danger: '#ff8080',
    light: '#c9f2dc',
    medium: '#8bb7a0',
    dark: '#558b6e',
    background: '#f4fff9'
};
export const DefaultTheme = themes.Light;
export function CSSTextGenerator(colors: IColors) {
    colors = { ...defaults, ...colors };
    const {
      primary,
      secondary,
      tertiary,
      success,
      warning,
      danger,
      light,
      medium,
      dark,
      background
    } = colors;
    const shadeRatio = 0.1;
    const tintRatio = 0.1;
    return `
      --ion-color-base: ${light};
      --ion-color-contrast: ${dark};
      --ion-background-color: ${background};
      --ion-text-color: ${dark};
      --ion-toolbar-background-color: ${contrast(background, 0.1)};
      --ion-toolbar-text-color: ${contrast(dark, 0.1)};
      --ion-color-primary: ${primary};
      --ion-color-primary-contrast: ${contrast(primary)};
      --ion-color-primary-shade: ${Color(primary).darken(shadeRatio)};
      --ion-color-primary-tint: ${Color(primary).lighten(tintRatio)};
      --ion-color-secondary: ${secondary};
      --ion-color-secondary-contrast: ${contrast(secondary)};
      --ion-color-secondary-shade: ${Color(secondary).darken(shadeRatio)};
      --ion-color-secondary-tint: ${Color(secondary).lighten(tintRatio)};
      --ion-color-tertiary: ${tertiary};
      --ion-color-tertiary-contrast: ${contrast(tertiary)};
      --ion-color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
      --ion-color-tertiary-tint: ${Color(tertiary).lighten(tintRatio)};
      --ion-color-success: ${success};
      --ion-color-success-contrast: ${contrast(success)};
      --ion-color-success-shade: ${Color(success).darken(shadeRatio)};
      --ion-color-success-tint: ${Color(success).lighten(tintRatio)};
      --ion-color-warning: ${warning};
      --ion-color-warning-contrast: ${contrast(warning)};
      --ion-color-warning-shade: ${Color(warning).darken(shadeRatio)};
      --ion-color-warning-tint: ${Color(warning).lighten(tintRatio)};
      --ion-color-danger: ${danger};
      --ion-color-danger-contrast: ${contrast(danger)};
      --ion-color-danger-shade: ${Color(danger).darken(shadeRatio)};
      --ion-color-danger-tint: ${Color(danger).lighten(tintRatio)};
      --ion-color-dark: ${dark};
      --ion-color-dark-contrast: ${contrast(dark)};
      --ion-color-dark-shade: ${Color(dark).darken(shadeRatio)};
      --ion-color-dark-tint: ${Color(dark).lighten(tintRatio)};
      --ion-color-medium: ${medium};
      --ion-color-medium-contrast: ${contrast(medium)};
      --ion-color-medium-shade: ${Color(medium).darken(shadeRatio)};
      --ion-color-medium-tint: ${Color(medium).lighten(tintRatio)};
      --ion-color-light: ${light};
      --ion-color-light-contrast: ${contrast(light)};
      --ion-color-light-shade: ${Color(light).darken(shadeRatio)};
      --ion-color-light-tint: ${Color(light).lighten(tintRatio)};
    `;
}
export function contrast(color, ratio = 0.8) {
    color = Color(color);
    return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}
export const ThemesArray = new Array<ITheme>(themes.Dark, themes.Light);
