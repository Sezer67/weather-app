import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LanguageChoseType } from "../../types/language.type";
import { WeatherStateType } from "../../types/StateType";
import { TWeather } from "../../types/WeatherState";

const initialState: WeatherStateType = {
  weathers: [],
  selectedLocationWeather: null,
  language: "en",
  error: {
    title: "",
    description: "",
  },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    setLanguage: (
      state: WeatherStateType,
      action: PayloadAction<LanguageChoseType>
    ) => {
      state.language = action.payload;
    },
    addLocationToWeather: (
      state: WeatherStateType,
      action: PayloadAction<TWeather>
    ) => {
      const control = state.weathers.find(
        (weather) => weather.name === action.payload.name
      );
      if (control) {
        state.error.title = "Error";
        state.error.description = "zaten mevcut";
      } else {
        state.weathers.unshift(action.payload);
      }
    },
    singleSearch: (
      state: WeatherStateType,
      action: PayloadAction<TWeather>
    ) => {
      state.weathers = [];
      state.weathers.push(action.payload);
    },
    setSelectedLocation: (
      state: WeatherStateType,
      action: PayloadAction<TWeather>
    ) => {
      state.selectedLocationWeather = action.payload;
    },
  },
});

export default weatherSlice.reducer;
export const {
  setLanguage,
  addLocationToWeather,
  singleSearch,
  setSelectedLocation,
} = weatherSlice.actions;
