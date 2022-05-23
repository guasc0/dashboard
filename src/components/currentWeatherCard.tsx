import React from "react";
import styled from "styled-components";
import {calculateWindSpeed, windDirection} from "../utils/helpers";

export const CurrentWeatherCard: React.FC<any> = ({data}) => {
    const wind = calculateWindSpeed(data.current.wind_kph);
    const feelsLike = data.current.feelslike_c;
    const temp = data.current.temp_c.toFixed(0)
    return (
        <StyledWeather>

            <h4>Current weather</h4>
            <div style={{display: "flex", marginTop: 5, marginLeft: 5}}>
                <img style={{marginLeft: -10, marginTop: -10, marginRight: 10}} src={data.current.condition.icon} alt="hello"/>
                <div style={{marginTop: 6}}>
                    <p className="no-margin bold">{data.current.condition.text}</p>
                    <div>
                        <h3 className="no-margin">{wind} {windDirection( data.current.wind_dir)}</h3>
                    </div>


                </div>
            </div>
            <div style={{marginLeft: 8}}>
                <h2 className="no-margin">{temp}℃</h2>
                <p className="no-margin">Feels like {feelsLike.toFixed(0)}℃</p>
                <Ptag>{data.forecast.forecastday[2].day.daily_chance_of_rain}%</Ptag>
            </div>
        </StyledWeather>

    );
}

const Ptag = styled.p`
  margin: 5px 0 10px 0;
`;

const StyledWeather = styled.div`
  border-radius: 10px;
  //display: flex;
  justify-content: flex-start;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.35);
  padding: 5px 5px 0 5px;
  margin-right: 10px;

  img {
    width: 70px;
    height: 70px;
  }

  h4 {
    margin: 0 0 0 5px;
    padding: 0 0 0 5px;
  }

  h5 {
    margin: 0 0 0 7px;
    font-size: 13px;
  }
  
  h2 {
    margin: 10px 0 10px 0;
  }
`;