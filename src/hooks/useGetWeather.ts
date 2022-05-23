import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const API_KEY = '6e9629053cbb4418b10134951221105';

export const useGetWeather = (url: string) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(url)
            .then((result) => {
                setLoading(false);
                setData(result.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error loading data, check the spellings');
                setLoading(false);
            });
    }, []);
    return { data, loading };
}

export const useGetTramsFromSolros = () => {
    const [tramDataSolros, setTramDataSolros] = useState();
    useEffect(() => {
        axios                                               //A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@
            //'https://api.resrobot.se/v2.1/location.name?input=Munkebäckstorget, Göteborg?&format=json&accessId=525ebb4a-8664-4407-b822-cba358d8c7e7'
            //.get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@"&format=json&duration=45&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93)
            .get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@"&format=json&duration=45&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93')
            .then((result) => {
                setTramDataSolros(result.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error loading data, check the spellings');
            });
    }, []);
    return { tramDataSolros };
}

export const useGetTramsFromMunk = () => {
    const [tramDataMunk, setTramDataMunk] = useState();
    useEffect(() => {
        axios                                               //A=1@O=Göteborg Solrosgatan@X=12025239@Y=57716392@U=1@L=740025685@B=1@p=1653064537@
            //'https://api.resrobot.se/v2.1/location.name?input=Munkebäckstorget, Göteborg?&format=json&accessId=525ebb4a-8664-4407-b822-cba358d8c7e7'
            //.get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=A=1@O=Göteborg Munkebäckstorget@X=12026407@Y=57718496@U=1@L=740025661@B=1@p=1653064537@"&format=json&duration=45&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93)
            .get('https://api.resrobot.se/v2.1/departureBoard?id=A=1@O=A=1@O=Göteborg Munkebäckstorget@X=12026407@Y=57718496@U=1@L=740025661@B=1@p=1653064537@"&format=json&duration=45&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93')
            .then((result) => {
                setTramDataMunk(result.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Error loading data, check the spellings');
            });
    }, []);
    return { tramDataMunk };
}

////https://api.resrobot.se/v2.1/departureBoard?id=740016358&format=json&accessId=5b54df0d-4e16-4de1-8584-bdc99d5fad93'