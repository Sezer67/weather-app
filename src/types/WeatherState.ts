import { TForecastState } from "./FutureState";

export type TWeather = {
    name:string;
    country:string;
    lastUpdated:string;
    temperature:number;
    feelslike:number;
    windKph:number;
    condition:{
        text:string;
        icon:string;
    },
    forecast?:any | undefined ;
}