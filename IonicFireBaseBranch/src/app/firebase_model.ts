declare module FireBaseModel {

    export interface Measurement1 {
        data_id: string;
        date: string;
        end: string;
        start: string;
    }

    export interface Measurement2 {
        data_id: string;
        date: string;
        end: string;
        start: string;
    }

    export interface Measurement3 {
        data_id: string;
        date: string;
        end: string;
        start: string;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J3 {
        measurement1: Measurement1;
        measurement2: Measurement2;
        measurement3: Measurement3;
    }

    export interface Data {
        sm3lM04sIoXeo10HyM82nK8kY8J3: Sm3lM04sIoXeo10HyM82nK8kY8J3;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J6 {
        avg: number;
        max: number;
        min: number;
        timestamp: number;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J7 {
        avg: number;
        max: number;
        min: number;
        timestamp: number;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J8 {
        avg: number;
        max: number;
        min: number;
        timestamp: number;
    }

    export interface PiezoAData {
        sm3lM04sIoXeo10HyM82nK8kY8J6: Sm3lM04sIoXeo10HyM82nK8kY8J6[];
        sm3lM04sIoXeo10HyM82nK8kY8J7: Sm3lM04sIoXeo10HyM82nK8kY8J7[];
        sm3lM04sIoXeo10HyM82nK8kY8J8: Sm3lM04sIoXeo10HyM82nK8kY8J8[];
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J62 {
        avg: number;
        max: number;
        min: number;
        timestamp: number;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J72 {
        avg: number;
        max: number;
        min: number;
        timestamp: number;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J82 {
        avg: number;
        max: number;
        min: number;
        timestamp: number;
    }

    export interface PiezoBData {
        sm3lM04sIoXeo10HyM82nK8kY8J6: Sm3lM04sIoXeo10HyM82nK8kY8J62[];
        sm3lM04sIoXeo10HyM82nK8kY8J7: Sm3lM04sIoXeo10HyM82nK8kY8J72[];
        sm3lM04sIoXeo10HyM82nK8kY8J8: Sm3lM04sIoXeo10HyM82nK8kY8J82[];
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J63 {
        isPressed: boolean;
        time: string;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J73 {
        isPressed: boolean;
        time: string;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J83 {
        isPressed: boolean;
        time: string;
    }

    export interface PressureData {
        sm3lM04sIoXeo10HyM82nK8kY8J6: Sm3lM04sIoXeo10HyM82nK8kY8J63[];
        sm3lM04sIoXeo10HyM82nK8kY8J7: Sm3lM04sIoXeo10HyM82nK8kY8J73[];
        sm3lM04sIoXeo10HyM82nK8kY8J8: Sm3lM04sIoXeo10HyM82nK8kY8J83[];
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J32 {
        mail: string;
        username: string;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J4 {
        mail: string;
        username: string;
    }

    export interface Sm3lM04sIoXeo10HyM82nK8kY8J5 {
        mail: string;
        username: string;
    }

    export interface Users {
        sm3lM04sIoXeo10HyM82nK8kY8J3: Sm3lM04sIoXeo10HyM82nK8kY8J32;
        sm3lM04sIoXeo10HyM82nK8kY8J4: Sm3lM04sIoXeo10HyM82nK8kY8J4;
        sm3lM04sIoXeo10HyM82nK8kY8J5: Sm3lM04sIoXeo10HyM82nK8kY8J5;
    }

    export interface RootObject {
        data: Data;
        piezo_a_data: PiezoAData;
        piezo_b_data: PiezoBData;
        pressure_data: PressureData;
        users: Users;
    }

}
