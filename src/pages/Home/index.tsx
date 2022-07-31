import { notification, Space, Table, Tabs } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import React, { useEffect, useState } from "react";

import { baseUrl } from "../../configs/url/api-url.config";
import { addQueryToUrl } from "../../helpers/url.helpers";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getByLocation } from "../../redux/service/api-request.service";
import { addLocationToWeather } from "../../redux/weather/weaterSlice";
import { defaultLocations } from "../../staticData";
import { QueryObject } from "../../types/query.type";
import { TWeather } from "../../types/WeatherState";
import * as homeTxts from "../../language/home.language";
import WeatherDrawer from "../../components/WeatherDrawer";
import MyCard from "../../components/Card";
import { getWindowSize } from "../../helpers/Dimensions";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const weathers = useAppSelector((state) => state.weather.weathers);
  const error = useAppSelector((state) => state.weather.error);
  const language = useAppSelector((state) => state.weather.language);

  const [activeTab, setActiveTab] = useState<string>("1");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
  });
  const [drawerShow, setDrawerShow] = useState<boolean>(false);
  const [weather, setWeather] = useState<TWeather | undefined>(undefined);
  const [windowSize, setWindowSize] = useState<{
    innerWidth: number;
    innerHeight: number;
  }>(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const columns: ColumnsType<TWeather> = [
    {
      dataIndex: "condition",
      render: (_, record) => (
        <img alt="icon" className="w-8 h-8" src={record.condition.icon} />
      ),
    },
    {
      title: homeTxts.city[language],
      dataIndex: "name",
      render: (value, record) => (
        <Space size={"small"}>
          <span>{value.substring(0, 11)}</span>
        </Space>
      ),
    },
    {
      title: homeTxts.country[language],
      dataIndex: "country",
    },
    {
      title: homeTxts.temp[language],
      dataIndex: "temperature",
      render: (value) => <span className="capitalize">{value} &#8451;</span>,
    },
    {
      title: homeTxts.condition[language],
      dataIndex: "condition",
      render: (value, record, index) => <span>{record.condition.text}</span>,
    },
  ];

  const fetch = () => {
    defaultLocations.forEach((location: string) => {
      const queries: QueryObject = {
        q: location,
        aqi: "no",
      };
      getByLocation(addQueryToUrl(queries, baseUrl))
        .then((response) => {
          const { data } = response;
          delete data.current.condition.code;
          const weather: Omit<TWeather, "forecast"> = {
            condition: data.current.condition,
            region: data.location.region,
            country: data.location.country,
            feelslike: data.current.feelslike_c,
            lastUpdated: data.current.last_updated,
            name: data.location.name,
            temperature: data.current.temp_c,
            windKph: data.current.wind_kph,
          };
          dispatch(addLocationToWeather(weather));
        })
        .catch((error) => {
          console.log(error);
          notification["error"]({
            message: "Başarısız",
            description: error.response.data.error.message,
          });
        });
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (error.title) {
      notification["error"]({
        message: error.title,
        description: error.description,
      });
    }
  }, [error]);

  return (
    <div className="flex min-h-full p-3 flex-wrap flex-row justify-start items-start">
      <Tabs
        style={{ width: "100%" }}
        defaultActiveKey={activeTab}
        onChange={(key: string) => setActiveTab(key)}
      >
        <Tabs.TabPane tab={homeTxts.tabs.cardTab[language]} key="1">
          <div className="flex flex-row flex-wrap justify-start items-start">
            {weathers.map((weather, index) => {
              return (
                <MyCard
                  placement={windowSize.innerWidth < 800 ? "bottom" : "right"}
                  weather={weather}
                  key={index}
                />
              );
            })}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={homeTxts.tabs.tableTab[language]} key="2">
          <Table
            className="hover:cursor-pointer"
            onRow={(record, index) => {
              return {
                onClick: () => {
                  setWeather(record);
                  setDrawerShow(true);
                },
              };
            }}
            onChange={(page: TablePaginationConfig) => setPagination(page)}
            pagination={pagination}
            columns={columns}
            dataSource={weathers}
          />
        </Tabs.TabPane>
        {drawerShow && (
          <WeatherDrawer
            visible={drawerShow}
            setVisible={setDrawerShow}
            key={weather!!.name}
            weatherName={weather!!.region!!}
            placement={windowSize.innerWidth < 800 ? "bottom" : "right"}
          />
        )}
      </Tabs>
    </div>
  );
};

export default Home;
