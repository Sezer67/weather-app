import { Col, Drawer, notification, Spin } from "antd";
import type { DrawerProps } from "antd";
import React, { useEffect, useState } from "react";
import { TWeather } from "../types/WeatherState";
import { getByLocationForecast } from "../redux/service/api-request.service";
import { QueryObject } from "../types/query.type";
import { addQueryToUrl } from "../helpers/url.helpers";
import { forecastBaseUrl } from "../configs/url/api-url.config";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setSelectedLocation } from "../redux/weather/weaterSlice";
import Astro from "./Astro";
import HourlyDisplay from "./HourlyDisplay";

type PropsType = {
  visible: boolean;
  placement: DrawerProps["placement"];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  weatherName: string;
};

const WeatherDrawer: React.FC<PropsType> = (props: PropsType) => {
  const { placement, setVisible, visible, weatherName } = props;
  const dispatch = useAppDispatch();
  const selectedWeather = useAppSelector(
    (state) => state.weather.selectedLocationWeather
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const queries: QueryObject = {
      q: weatherName,
      days: "1",
      aqi: "no",
      alerts: "no",
    };
    setLoading(true);
    getByLocationForecast(addQueryToUrl(queries, forecastBaseUrl))
      .then((response) => {
        const { data } = response;
        const weather: TWeather = {
          condition: data.current.condition,
          country: data.location.country,
          feelslike: data.current.feelslike_c,
          lastUpdated: data.current.last_updated,
          name: data.location.name,
          temperature: data.current.temp_c,
          windKph: data.current.wind_kph,
          forecast: data.forecast.forecastday,
        };
        console.log(weather.forecast[0].astro.moonrise);
        dispatch(setSelectedLocation(weather));
      })
      .catch((error) => {
        notification["error"]({
          message: "Başarısız",
          description: error.response.data.error.message,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Drawer
      size="large"
      visible={visible}
      placement={placement}
      onClose={() => setVisible(false)}
      destroyOnClose={true}
      title={selectedWeather?.name + " / " + selectedWeather?.country}
      headerStyle={{
        backgroundColor: "#7290FF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        boxShadow: "1px 1px 20px #7290FF",
        border: "none",
      }}
      drawerStyle={{
        backgroundColor: "#f6f6f6",
      }}
    >
      <div className="flex flex-col h-full justify-start space-y-8 items-center">
        {loading && <Spin />}
        <div className="flex flex-col items-center">
          <img alt="icon" src={selectedWeather?.condition.icon} />
          <b className="text-dark" >{selectedWeather?.condition.text}</b>
          <b className="text-dark">{selectedWeather?.temperature} &#8451;</b>
        </div>
        {selectedWeather && <Astro astro={selectedWeather?.forecast[0].astro} />}
        {selectedWeather && <HourlyDisplay hours={selectedWeather?.forecast[0].hour} />}
      </div>
    </Drawer>
  );
};

export default WeatherDrawer;
