import {Hour, WeatherModel} from "../models";
import { format, formatDistance, formatRelative, subDays, getHours } from 'date-fns'
import axios from "axios";
import {toast} from "react-toastify";


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