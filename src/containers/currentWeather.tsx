import React, {useEffect, useState} from "react";
import {CurrentWeatherCard} from "../components/currentWeatherCard";
import {useGetWeather} from "../hooks/useGetWeather";
import {HourlyWeatherCard} from "../components/hourlyWeatherCard";
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'

export const CurrentWeather: React.FC<any> = ({data, city}) => {
    //const [searchResult, setSearchResult] = useState('Gothenburg');
    //const url = `http://api.weatherapi.com/v1/forecast.json?key=6e9629053cbb4418b10134951221105&q=${searchResult}&days=10&aqi=yes&alerts=no/`;
    //const { data } = useGetWeather(url);
    const [value, setValue] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div style={{paddingLeft: 20}}>
            <h2 style={{color: "white"}}>Current weather in {city}</h2>
            {data &&
                <div style={{display: "flex", justifyContent: 'flex-start', width:650}}>
                    <CurrentWeatherCard data={data}/>
                    <HourlyWeatherCard data={data.forecast.forecastday[0]}/>
                    <div style={{marginLeft: 30, marginTop: 30}}>
                        <Clock value={value} renderNumbers={true}/>
                    </div>
                </div>

            }
        </div>
    );
}
