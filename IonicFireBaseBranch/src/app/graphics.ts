export const GRAPHIC_STORAGE = 'graphics';
export const THEME_STORAGE = 'theme';
export enum GraphicType {
    line,
    bar,
    radar,
    doughnut,
    pie,
    polarArea
}

export enum GraphicName {
    Night,
    Week,
    Month
}

export class Graphic {
    Name: GraphicName;
    Type: GraphicType;
    Data: any;
    LabelX: string;
    LabelY: string;
    Colors: Array<string>;
    constructor(_name, _data) {
        this.Name = _name;
        this.Data = _data;
        switch (this.Name) {
            case GraphicName.Night:
                this.Type = GraphicType.doughnut;
                break;
            case GraphicName.Week:
                this.Type = GraphicType.bar;
                break;
            case GraphicName.Month:
                this.Type = GraphicType.line;
                break;
            default:
                console.log('error: could not resolve graphic name to type');
                break;
        }
    }
}
export const Graphics: Array<Graphic> = new Array(
    // 2 colors, comparing the time you slept last night with the advised sleep time
    new Graphic(GraphicName.Night, 0.768),
    new Graphic(GraphicName.Week, [ 5.23, 7.14, 7.03, 6.49, 8.15, 9.49, 9.02 ]),
    new Graphic(GraphicName.Month, [
        5.23, 7.14, 7.03, 6.49, 8.15, 9.49, 9.02,
        5.23, 7.14, 7.03, 6.49, 8.15, 9.49, 9.02,
        5.23, 7.14, 7.03, 6.49, 8.15, 9.49, 9.02,
        5.23, 7.14, 7.03, 6.49, 8.15, 9.49, 9.02,
        5.23, 7.14, 7.03
     ])
);
export const DEFAULT_GRAPH: Graphic = Graphics[GraphicName.Night];
