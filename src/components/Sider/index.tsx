import {
  LeftCircleOutlined,
  RightCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, notification, Row, Tooltip } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import * as siderTxts from "../../language/sider.language";
import { collapsedButton } from "./sider.config";
import { getByLocation } from "../../redux/service/api-request.service";
import {
  addLocationToWeather,
  singleSearch,
} from "../../redux/weather/weaterSlice";
import { addQueryToUrl } from "../../helpers/url.helpers";
import { baseUrl } from "../../configs/url/api-url.config";
import { TWeather } from "../../types/WeatherState";
import { motion } from "framer-motion";
import { icons } from "../../constants";
import Map from "../Map/Map";
const Sider: React.FC = () => {
  const [collapsed, setCollapsed] = useState<Boolean>(false);
  const language = useAppSelector((state) => state.weather.language);
  const [activeBtn, setActiveBtn] = useState<number>(1);
  const [locationModalVisible, setLocationModaVisible] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleSearch = (value: string) => {
    getByLocation(addQueryToUrl({ q: value, aqi: "no" }, baseUrl))
      .then((res) => {
        const { data } = res;
        delete data.current.condition.code;
        const weather: Omit<TWeather, "forecast"> = {
          condition: data.current.condition,
          country: data.location.country,
          feelslike: data.current.feelslike_c,
          lastUpdated: data.current.last_updated,
          name: data.location.name,
          temperature: data.current.temp_c,
          windKph: data.current.wind_kph,
        };
        if (activeBtn === 0) dispatch(addLocationToWeather(weather));
        else dispatch(singleSearch(weather));
      })
      .catch((error) => {
        notification["error"]({
          message: "Başarısız",
          description: error.response.data.error.message,
        });
      })
      .finally(() => {});
  };

  return (
    <motion.div
      className={`relative ${
        collapsed ? "w-auto" : "min-w-[250px] "
      } transform transition-all duration-300 shadow-md bg-slate-100 p-4 pt-6`}
    >
      <div className="absolute -right-7 top-0">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? (
            <RightCircleOutlined style={collapsedButton} />
          ) : (
            <LeftCircleOutlined style={collapsedButton} />
          )}
        </button>
      </div>
      <div>
        {collapsed ? (
          <div className="flex flex-col space-y-3">
            <Tooltip
              color={"blue"}
              placement="right"
              title={siderTxts.search[language]}
            >
              <div
                onClick={() => setCollapsed(false)}
                className="w-10 h-10 bg-opacity-90 rounded-sm shadow-md cursor-pointer bg-primary flex items-center justify-center"
              >
                <SearchOutlined style={{ fontSize: "20px", color: "white" }} />
              </div>
            </Tooltip>
            <Tooltip
              color={"blue"}
              placement="right"
              title={siderTxts.marker[language]}
            >
              <div
                onClick={() => setCollapsed(false)}
                className="w-10 h-10 bg-opacity-90 rounded-sm shadow-md cursor-pointer bg-primary flex items-center justify-center"
              >
                <img
                  alt="icon"
                  className="bg-transparent "
                  src={icons.marker}
                />
              </div>
            </Tooltip>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            <Input.Search
              placeholder={siderTxts.searchPlaceHoler[language]}
              onSearch={handleSearch}
            />
            <Row className="justify-between">
              <Button
                onClick={() => setActiveBtn(0)}
                type={activeBtn == 0 ? "primary" : "ghost"}
              >
                {siderTxts.add[language]}
              </Button>
              <Button
                onClick={() => setActiveBtn(1)}
                type={activeBtn == 1 ? "primary" : "ghost"}
              >
                {siderTxts.singleSearch[language]}
              </Button>
            </Row>
            <Button
              onClick={() => setLocationModaVisible(true)}
              block
              type="primary"
              className="flex flex-row flex-nowrap justify-center items-center"
            >
              <span> {siderTxts.selectMap[language]} </span>
              <img
                alt="icon"
                className="inline w-5 h-5 mb-2"
                src={icons.marker}
              />
            </Button>
          </div>
        )}
      </div>
      <Modal
        title={siderTxts.selectMap[language]}
        centered
        visible={locationModalVisible}
        onCancel={() => setLocationModaVisible(false)}
        width={1000}
        footer={null}
      >
        <div className="w-full h-[85vh]">
          <Map />
        </div>
      </Modal>
    </motion.div>
  );
};

export default Sider;
