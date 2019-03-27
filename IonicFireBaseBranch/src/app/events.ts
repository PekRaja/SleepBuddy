import { ITheme } from './themes';

export interface ISetThemeEvent {
    detail: ISetThemeDetal;
}
export interface ISetThemeDetal {
    value: ITheme;
}
