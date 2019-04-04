
export class NightGraphic {
    Name = 'Night';
    data: IFirebaseData;
}
export interface IFirebaseData {
    Data: {
        number: {
            number: {
                number: {
                    'Begin time': string; // format "23:00"
                    'Hours slept': number;
                    'Sensor data': Array<ISensorData>;
                }
            }
        }
    }
}
export interface ISensorData {
    'Pressure': IPressureData[];
    'A': IPiezoData[];
    'B': IPiezoData[];
}
export interface IPressureData {
    
}
export interface IPiezoData {
    
}

