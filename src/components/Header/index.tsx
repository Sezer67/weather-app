import { Button, Col, Dropdown, Menu, MenuProps, Row } from "antd";
import React from "react";
import { icons, images } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import * as headerTxts from "../../language/header.language";
import { setLanguage } from "../../redux/weather/weaterSlice";
import { LanguageChoseType } from "../../types/language.type";

const Header: React.FC = () => {
  const language = useAppSelector((state) => state.weather.language);
  const dispatch = useAppDispatch();

  const changeLanguage: MenuProps["onClick"] = ({ key }) => {
    dispatch(setLanguage(key as LanguageChoseType));
  };
  const menu = (
    <Menu
      onClick={changeLanguage}
      items={[
        {
          key: "en",
          label: "en",
        },
        {
          key: "tr",
          label: "tr",
        },
      ]}
    />
  );

  return (
    <div className="h-20 bg-light border-b border-gray">
      <div className="py-2 flex flex-nowrap">
        <Col span={14}>
          <Row className="pl-4 items-center space-x-3 flex-nowrap">
            <img
              src={icons.weather}
              className="h-16 shadow-2xl drop-shadow-2xl rounded-full"
            />
            <p className="font-bold text-2xl m-0 text-primary tracking-wide">
              {headerTxts.title[language]}
            </p>
          </Row>
        </Col>
        <Col span={10}>
          {/* Dil seçimi */}
          <Row className="justify-end pr-4 h-full items-center">
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <Row onClick={(e) => e.preventDefault()}>
                <img src={icons.translate} className="w-5" />
                <button className="text-dark font-semibold px-3">
                  {headerTxts.language[language]}
                </button>
              </Row>
            </Dropdown>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default Header;
