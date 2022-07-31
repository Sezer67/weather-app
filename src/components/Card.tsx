import { Button, Col, Divider, Drawer, DrawerProps, Row, Tooltip } from "antd";
import React, { useState } from "react";
import { icons } from "../constants";
import { TWeather } from "../types/WeatherState";
import * as homeTxts from "../language/home.language";
import { useAppSelector } from "../redux/hook";
import { motion } from "framer-motion";
import WeatherDrawer from "./WeatherDrawer";
type PropsType = {
  weather: TWeather;
  placement: DrawerProps["placement"];
};
const MyCard: React.FC<PropsType> = (prop: PropsType) => {
  const { weather, placement } = prop;
  const language = useAppSelector((state) => state.weather.language);
  const [detailShow, setDetailShow] = useState<boolean>(false);
  const [drawerShow, setDrawerShow] = useState<boolean>(false);

  const handleSelecLocation = (): void => {
    setDrawerShow(true);
  };

  return (
    <div
      onMouseLeave={() => setDetailShow(false)}
      onMouseMove={() => setDetailShow(true)}
      className="w-[250px] mx-6 mb-4 relative py-2 bg-white transition-all duration-300 hover:shadow-lg hover:cursor-pointer border border-light rounded-md"
    >
      <div className="mt-1 mb-1 flex h-16 flex-row justify-around items-center">
        <img alt="icon" src={weather.condition.icon} />
        <b className="text-gray">{weather.condition.text}</b>
      </div>
      <Divider style={{ padding: "0", marginTop: "4px" }} orientation="left">
        <span className="text-sm">
          {weather.name.substring(0, 11)}/{weather.country}
        </span>
      </Divider>
      <div>
        <Row className="px-4">
          <Col span={12}>
            <Tooltip color={"magenta"} title={homeTxts.temp[language]}>
              <Row className="space-x-3">
                <img
                  alt="icon"
                  className="w-6 h-6 object-cover"
                  src={icons.celsius}
                />
                <span>{weather.temperature} &#8451;</span>
              </Row>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip color={"magenta"} title={homeTxts.feelslike[language]}>
              <Row className="space-x-3">
                <img alt="icon" src={icons.feelslike} />
                <span>{weather.feelslike} &#8451;</span>
              </Row>
            </Tooltip>
          </Col>
        </Row>
        <Row className="px-4 my-3">
          <Col span={12}>
            <Tooltip
              placement="bottom"
              color={"magenta"}
              title={homeTxts.wind[language]}
            >
              <Row className="space-x-3">
                <img alt="icon" src={icons.wind} />
                <span>{weather.windKph}mph</span>
              </Row>
            </Tooltip>
          </Col>
          <Col span={12}>
            <Tooltip
              placement="bottom"
              color={"magenta"}
              title={homeTxts.lastUpdated[language]}
            >
              <Row className="space-x-3 flex-nowrap">
                <img alt="icon" src={icons.time} className="w-5 h-5" />
                <span className="whitespace-nowrap">
                  {weather.lastUpdated.substring(5, weather.lastUpdated.length)}
                </span>
              </Row>
            </Tooltip>
          </Col>
        </Row>
      </div>
      {detailShow && (
        <motion.div
          className="absolute top-0  transition-all duration-300"
          initial={{ right: "48" }}
          animate={{ right: "-48px" }}
          transition={{
            duration: 0.1,
          }}
        >
          <Button onClick={handleSelecLocation} type="default">
            <span className="text-gray font-semibold">
              {homeTxts.details[language]}
            </span>
          </Button>
        </motion.div>
      )}
      {drawerShow && (
        <WeatherDrawer
          visible={drawerShow}
          setVisible={setDrawerShow}
          key={weather.name}
          weatherName={weather.region!!}
          placement={placement}
        />
      )}
    </div>
  );
};

export default MyCard;
