import styled from "styled-components";
import React, {useState} from "react";
import {Hour} from "../models";
import {calculateWindSpeed, formatHourList, windDirection} from "../utils/helpers";
import {v4 as uuidv4} from "uuid";

export const HourlyWeatherCard: React.FC<any> = ({data}) => {
    //const [hourList, setHourList] = useState<any>([]);
    let hourList: Hour[] = formatHourList(data.hour);
    const addZeroToHours = (hour: number): string => {
        if (hour < 10 ){
            return '0' + hour;
        }
        return  hour.toLocaleString();
    }
    return (
        <StyledWeather>
            <h4>Hourly</h4>
                <div style={{display: "flex"}}>
                    {hourList.map((hour: any, index: number) => {
                        const hours = hour.time.substring(11, 13);
                        return (
                                <div style={{margin:10}} key={uuidv4() + new Date().getTime()}>
                                    <Ptag>{hours}</Ptag>
                                    <WeatherImage src={hour.condition.icon} alt="hello"/>
                                    <Ptag>{hour.temp_c.toFixed(0)}℃</Ptag>
                                    <Ptag>{calculateWindSpeed(hour.wind_kph)}</Ptag>
                                    <Ptag>{hour.chance_of_rain}%</Ptag>
                                </div>
                        );
                    })}
                </div>
        </StyledWeather>
    );
}

const WeatherImage = styled.img`
  width: 47px;
  height: 47px;
  margin-left: -5px;
`;

const Ptag = styled.p`
  margin: 0 0 10px 0;
  width: 52px;
`;

const StyledWeather = styled.div`
  border-radius: 10px;
  //display: flex;
  //justify-content: flex-start;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 520px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.35);
  padding: 5px 5px 0 5px;

  h5 {
    margin: 0 0 0 7px;
    font-size: 13px;
  }
  h4 {
   margin: 3px 0 0px 10px;
  }
`;