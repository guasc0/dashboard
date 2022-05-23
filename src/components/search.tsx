import React, {useCallback, useEffect} from 'react';
import { Input } from 'react-nicer-inputs';
import {useGetWeather} from "../hooks/useGetWeather";
import {Simulate} from "react-dom/test-utils";
import styled from "styled-components";

export const Search = () => {
    return (
       <div className="input-div">
          <input
              id="input"
              className="input"
              placeholder="Search for a city...."
          />
           <Button>
               search
           </Button>
       </div>
    );
}

const Button = styled.button`
  border-radius: 10px;
  //display: flex;
  justify-content: flex-start;
  width: 80px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.04);
  color: white;
`;