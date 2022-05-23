import React, {useState} from "react";
import {useGetWeather} from "../hooks/useGetWeather";
import {ThreeDayWeatherCard} from "../components/threeDayWeatherCard";

export const ThreeDayWeather: React.FC<any> = ({data, city}) => {
    //const [searchResult, setSearchResult] = useState('Gothenburg');
    //const url = `http://api.weatherapi.com/v1/forecast.json?key=6e9629053cbb4418b10134951221105&q=${searchResult}&days=10&aqi=yes&alerts=no/`;
    //const { data } = useGetWeather(url);

    // @ts-ignore
    return (
        <>
            <div style={{paddingLeft: 20}}>
                <h2 style={{color: "white"}}>3 Day forecast for {city}</h2>
                {data &&
                    <div style={{display: "flex", justifyContent: 'space-between', width:650}}>
                        {data.forecast.forecastday.map((day: any, index: number) => {
                           return (<ThreeDayWeatherCard data={day} key={index}/>);
                        })}
                    </div>
                }
            </div>
        </>

    );
}