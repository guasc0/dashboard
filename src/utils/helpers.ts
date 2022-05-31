import {Hour, WeatherModel} from "../models";
import { format, formatDistance, formatRelative, subDays, getHours } from 'date-fns'
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect, useState } from "react";


export const calculateWindSpeed = (speed: number): string => {
    const windMs = speed / 3.6;
    return windMs.toFixed(0) + ' m/s';
}

export const windDirection = (direction: string): string => {
    return direction.length < 1 ? direction : direction.substring(0, 1)
}

export const formatHourList = (hl: Hour[]): Hour[] => {
    let hourList: Hour[] = []
    const now = new Date().getHours();
    hl.forEach( (hour: Hour) => {
        const hours = hour.time.substring(11, 13);
        if (now < Number(hours)) {
            if (Number(hours) < now + 7){
                hourList.push(hour);
            }
        }
    })
    return hourList
}

export const GetTrams = (): any => {
    console.log('in update');
    const [tramDataSolros, setTramDataSolros] = useState();
        axios                                               //A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@
            //'https://api.resrobot.se/v2.1/location.name?input=Munkebäckstorget, Göteborg?&format=json&accessId=525ebb4a-8664-4407-b822-cba358d8c7e7'
            //.get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@"&format=json&duration=45&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93)
            .get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@"&format=json&duration=15&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93')
            .then((result) => {
                setTramDataSolros(result.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error loading data, check the spellings');
            });
    console.log('in update', tramDataSolros)
    return tramDataSolros;
}