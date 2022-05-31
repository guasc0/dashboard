import React, {useEffect, useState} from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {Search} from "./components/search";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CurrentWeather} from "./containers/currentWeather";
import {ThreeDayWeather} from "./containers/threeDayWeather";
import {useGetTramsFromMunk, useGetTramsFromSolros, useGetWeather} from "./hooks/useGetWeather";
import {TramDeparture} from "./containers/tramDeparture";
import axios from 'axios';

function App() {
    const [searchResult, setSearchResult] = useState('Gothenburg');
    const [data, setData] = useState();
    const [tramDataSolros, setTramDataSolros] = useState();
    const [tramDataMunk, setTramDataMunk] = useState();
    const url = `https://api.weatherapi.com/v1/forecast.json?key=6e9629053cbb4418b10134951221105&q=${searchResult}&days=10&aqi=yes&alerts=no/`;
    useEffect(() => {
       setInterval( () => {
            axios
                .get(url)
                .then((result) => {
                    setData(result.data);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Error loading data, check the spellings');
                });
        }, 60000 * 13)
    }, []);
    useEffect(() => {
        setInterval(() => {
            axios                                               //A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@
                //'https://api.resrobot.se/v2.1/location.name?input=Munkebäckstorget, Göteborg?&format=json&accessId=525ebb4a-8664-4407-b822-cba358d8c7e7'
                //.get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@"&format=json&duration=45&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93)
                .get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@"&format=json&duration=13&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93')
                .then((result) => {
                    setTramDataSolros(result.data);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Error loading data, check the spellings');
                });
        }, 60000 * 13);
    }, []);
    useEffect(() => {
        setInterval(() => {
            axios                                               //A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@
                //'https://api.resrobot.se/v2.1/location.name?input=Munkebäckstorget, Göteborg?&format=json&accessId=525ebb4a-8664-4407-b822-cba358d8c7e7'
                //.get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=A=1@O=Göteborg Munkebäckstorget@X=12026407@Y=57718496@U=1@L=740025661@B=1@p=1653064537@"&format=json&duration=45&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93)
                .get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=A=1@O=Göteborg Munkebäckstorget@X=12026407@Y=57718496@U=1@L=740025661@B=1@p=1653064537@"&format=json&duration=13&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93')
                .then((result) => {
                    setTramDataMunk(result.data);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Error loading data, check the spellings');
                });
        }, 60000 * 13);
    }, []);

    return (
      <div className="app-wrapper">
        <ToastContainer />
        <CurrentWeather data={data} city={searchResult}/>
        <ThreeDayWeather data={data} city={searchResult}/>
          {tramDataSolros && tramDataMunk &&
              <TramDeparture tramDataSolros={tramDataSolros} tramDataMunk={tramDataMunk} />
          }
      </div>
  );
}

export default App;
