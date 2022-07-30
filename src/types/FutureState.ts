import {TWeather} from './WeatherState'
export type TForecastState = {
    forecast:ForecastType[];
}

type ForecastType = {
    date:string;
    day:{
        maxTemperature:number,
        minTemperature:number,
        avgTemperature:number,
        condition:{
            text:string,
            icon:string
        },
    astro:AstroType,
    hour:HourType[]
    }
}

export type AstroType = {
    sunrise:string;
    sunset:string;
    moonrise:string;
    moonset:string;
}
type tempHourType = Pick<TWeather,"condition"|"temperature"|"windKph"|"feelslike">
export type HourType = tempHourType & {time:string;humidity:string;};