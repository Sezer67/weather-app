import React from "react";
import { footer } from "../../language/home.language";
import { useAppSelector } from "../../redux/hook";
const Footer: React.FC = () => {
  const language = useAppSelector((state) => state.weather.language);
  return (
    <div className="w-full bg-slate-100">
      <div className="w-full flex flex-row justify-center items-center space-x-2 py-4">
        <span className="font-semibold ">{footer[language]}</span>
        <img
          alt="icon"
          src="https://cdn.weatherapi.com/v4/images/weatherapi_logo.png"
          className="h-8"
        />
        <b className="text-dark">
          Weather <span className="text-orange-400">Api</span>{" "}
        </b>
      </div>
    </div>
  );
};

export default Footer;
