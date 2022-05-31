import React, {useEffect, useState} from "react";
import {ThreeDayWeatherCard} from "../components/threeDayWeatherCard";
import styled from "styled-components";
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css';

export const ThreeDayWeather: React.FC<any> = ({data, city}) => {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <>
            <div style={{paddingLeft: 20}}>
                <h2 style={{color: "white"}}>2 Day forecast for {city}</h2>
                {data &&
                    <>
                        <div style={{display: "flex", justifyContent: 'space-between', width: 650}}>
                            <ThreeDayWeatherCard data={data.forecast.forecastday[1]}/>
                            <ThreeDayWeatherCard data={data.forecast.forecastday[2]}/>
                            <StyledWeather>
                                <Clock value={value} size={198} className="clock" renderNumbers={true}/>
                            </StyledWeather>
                        </div>
                    </>
                }
            </div>
        </>

    );
}

const StyledWeather = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.35);
  padding: 5px 5px 0 5px;

  img {
    width: 110px;
    height: 110px;
  }

  h5 {
    margin: 0 0 0 7px;
    font-size: 13px;
  }
  h4 {
    padding: 5px;
  }
`;