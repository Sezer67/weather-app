import { Steps } from "antd";
import React, { useEffect, useState } from "react";
import { AstroType } from "../types/FutureState";
import * as homeTxts from "../language/home.language";
import { useAppSelector } from "../redux/hook";
import { icons } from "../constants";

type PropType = {
  astro: AstroType;
};

const { Step } = Steps;

const completedStep = (value:string):boolean =>{
    let time:string = "";
    if ((value.split(" ")[1] == "PM")) {
        time = Number(value.split(":")[0]) + 12 +":" + value.split(":")[1].split(" ")[0];
      }
      else{
        time= value.split(" ")[0];
      }
      const date:Date = new Date();
      console.log("day : ",date.getHours(),date.getMinutes());
      console.log("time : ",time);
      if(date.getHours() > Number(time.split(':')[0])){
        return true;
      }else if(date.getHours() == Number(time.split(':')[0])){
        if(date.getMinutes() > Number(time.split(':')[1]))
            return true;
        else return false;
      }
      else return false;
}

const Astro: React.FC<PropType> = (prop: PropType) => {
  let { moonrise, sunrise, sunset, moonset } = prop.astro;
  const [astro, setAstro] = useState<AstroType>({moonrise,sunrise,moonset,sunset});
  const language = useAppSelector((state) => state.weather.language);
  const [current,setCurrent] = useState<number>(0);
  useEffect(() => {
    (Object.keys(astro) as Array<keyof AstroType>).forEach((key) => {
        let result:boolean = false;
        result = completedStep(astro[key]);
        console.log("key - result :",key,result);
        switch(key){
            case "moonrise":
                if(result) setCurrent(1);
                break;
            case "sunrise":
                if(result) setCurrent(2);
                break;
            case "moonset":
                if(result) setCurrent(3);
                break;
            case "sunset":
                if(result) setCurrent(4);
                break;
        }
    });
  }, [prop.astro]);

  return (
    <Steps direction="horizontal" current={current}>
      <Step
        icon={<img alt="icon" src={icons.moonrise} />}
        title={homeTxts.astroTxts.moonrise[language]}
        description={astro.moonrise}
      />
      <Step
        icon={<img alt="icon" src={icons.sunrise} />}
        title={homeTxts.astroTxts.sunrise[language]}
        description={astro.sunrise}
      />
      <Step
        icon={<img alt="icon" src={icons.moonset} />}
        title={homeTxts.astroTxts.moonset[language]}
        description={astro.moonset}
      />
      <Step
      
        icon={<img alt="icon" src={icons.sunset} />}
        title={homeTxts.astroTxts.sunset[language]}
        description={astro.sunset}
      />
    </Steps>
  );
};

export default Astro;
