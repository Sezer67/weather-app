import { Button, Card, Col, Popover } from "antd";
import React from "react";
import * as homeTxts from "../language/home.language";
import { useAppSelector } from "../redux/hook";
import { LanguageChoseType } from "../types/language.type";
type PropType = {
  hours: Array<any>;
};
type ContentPropType = {
  hour: any;
  language: LanguageChoseType;
};
const Content: React.FC<ContentPropType> = (prop: ContentPropType) => {
  const { hour, language } = prop;
  return (
    <Card style={{ width: "260px" }}>
      <Card.Meta
        avatar={
          <div className="flex flex-col items-center">
            <img alt="icon" src={hour.condition.icon} />
            <span>{hour.condition.text}</span>
          </div>
        }
        title={"Today " + hour.time.split(" ")[1]}
        description={
          <div className="flex flex-col w-full justify-start items-start">
            <span className="flex flex-row justify-between w-full">
              <b className="pr-2">{homeTxts.temp[language]}</b> {hour.temp_c}{" "}
            </span>
            <span className="flex flex-row justify-between w-full">
              <b className="pr-2">{homeTxts.feelslike[language]}</b>{" "}
              {hour.feelslike_c}{" "}
            </span>
            <span className="flex flex-row justify-between w-full">
              <b className="pr-2">{homeTxts.humidity[language]}</b>{" "}
              {hour.humidity}{" "}
            </span>
            <span className="flex flex-row justify-between w-full">
              <b className="pr-2">{homeTxts.wind[language]}</b> {hour.wind_kph}{" "}
            </span>
          </div>
        }
      />
    </Card>
  );
};
const HourlyDisplay: React.FC<PropType> = (prop: PropType) => {
  const { hours } = prop;
  console.log(hours);
  const language = useAppSelector((state) => state.weather.language);
  return (
    <div className="w-full flex flex-row justify-center items-center flex-wrap">
      {hours.map((hour, index: number) => {
        return (
          <Popover
            content={<Content hour={hour} language={language} />}
            trigger="hover"
          >
            <Button type="default" size="large" className="m-3 ">
              {hour.time.split(" ")[1]}
            </Button>
          </Popover>
        );
      })}
    </div>
  );
};

export default HourlyDisplay;
