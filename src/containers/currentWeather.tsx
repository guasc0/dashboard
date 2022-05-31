import React, {useEffect, useState} from "react";
import {CurrentWeatherCard} from "../components/currentWeatherCard";
import {useGetWeather} from "../hooks/useGetWeather";
import {HourlyWeatherCard} from "../components/hourlyWeatherCard";

export const CurrentWeather: React.FC<any> = ({data, city}) => {
    const [value, setValue] = useState(new Date());
    return (
        <div style={{paddingLeft: 20}}>
            <h2 style={{color: "white"}}>Todays weather in {city}</h2>
            
            {data &&
                <div style={{display: "flex", justifyContent: 'flex-start', width:650}}>
                    <CurrentWeatherCard data={data}/>
                    <HourlyWeatherCard data={data.forecast.forecastday[0]}/>
                </div>

            }
        </div>
    );
}
