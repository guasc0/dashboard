import React from "react";
import styled from "styled-components";

export const ThreeDayWeatherCard: React.FC<any> = ({data: day}) => {
    const temp = day.day.avgtemp_c.toFixed(0)
    return (
        <StyledWeather>
            <h4 style={{fontWeight: 'bold'}} className="no-margin">{new Date(day.date).toLocaleString('en-us', {  weekday: 'long' })}</h4>
            <div style={{display: "flex"}}>
                <img style={{marginLeft: -10, marginTop: -10, marginRight: 10}} src={day.day.condition.icon} alt="hello"/>

            </div>
            <div style={{marginLeft: -15}}>
                <h2 className="no-margin">{temp}℃</h2>
                <Ptag>{day.day.daily_chance_of_rain}%</Ptag>
            </div>
        </StyledWeather>

    );
}

const Ptag = styled.p`
  margin: 5px 0 10px 0;
`;

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