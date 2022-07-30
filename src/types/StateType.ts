import { ActionsErrorType } from "./error.type";
import { LanguageChoseType } from "./language.type";
import { TWeather } from "./WeatherState";

export type WeatherStateType = {
    weathers: TWeather[];
    selectedLocationWeather: TWeather | null;
    language:LanguageChoseType,
    error:ActionsErrorType;
  };