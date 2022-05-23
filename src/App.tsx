import React, {useState} from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Search} from "./components/search";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CurrentWeather} from "./containers/currentWeather";
import {ThreeDayWeather} from "./containers/threeDayWeather";
import {useGetTramsFromMunk, useGetTramsFromSolros, useGetWeather} from "./hooks/useGetWeather";
import {TramDeparture} from "./containers/tramDeparture";

function App() {
    const [searchResult, setSearchResult] = useState('Gothenburg');
    const url = `http://api.weatherapi.com/v1/forecast.json?key=6e9629053cbb4418b10134951221105&q=${searchResult}&days=10&aqi=yes&alerts=no/`;
    const { data } = useGetWeather(url);
    const { tramDataSolros } = useGetTramsFromSolros();
    const { tramDataMunk } = useGetTramsFromMunk();
    console.log(tramDataMunk)

    return (
      <div className="app-wrapper">
        <ToastContainer />
        <CurrentWeather data={data} city={searchResult}/>
        <ThreeDayWeather data={data} city={searchResult}/>
          {tramDataSolros &&
              <TramDeparture tramDataSolros={tramDataSolros} tramDataMunk={tramDataMunk} />
          }
      </div>
  );
}

export default App;
