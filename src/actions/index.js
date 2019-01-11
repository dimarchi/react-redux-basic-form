import axios from 'axios';
import { API_KEY } from '../apikeys';
import { store } from '../index';

export const GET_WEATHER = 'GET_WEATHER';
export const GET_ERROR = 'GET_ERROR';

export const getIP = (responseType, data) => {
    return ({
        type : responseType,
        payload : data,
        finished : true
    })
}

export const getWeather = findCity =>  {
    const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast';
    const fetchAddress = `${ROOT_URL}?q=${findCity}&cnt=9&units=metric&APPID=${API_KEY}`;

    axios.get(fetchAddress)
    .then(response => {
        store.dispatch(getIP(GET_WEATHER, response.data.list));
    })
    .catch(error => {
        store.dispatch(reportError(error));
    })
}

export const reportError = error => ({
    type : GET_ERROR,
    payload : error,
    finished : false
})
