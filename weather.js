import axios from "axios";
import axiosRetry from 'axios-retry';

const USER_AGENT = '(weathermateplus.com, contact@weathermateplus.com)';
const ACCEPT = 'application/geo+json';

axiosRetry(axios, {retries: 5});

const headers = {
    'User-Agent': USER_AGENT,
    Accept: ACCEPT,
};

export const getNWSForecast = (lat, lng) => {
    /**
     * For some reason, this is the only NWS way to get this data for a specific point. the new API doesn't have this
     * capability. found the call in this location https://mobile.weather.gov/js/mainCompressedJS.php?a=13580 under method
     * populateMainPageWithDWML
     */
    const params = {
      lat: lat,
      lon: lng,
      FcstType: 'json',
      rand: Math.floor(Math.random() * 10000),
    };
    console.log(params);
    const url = 'https://forecast.weather.gov/MapClick.php';
    return axios.get(url, {params});
  };
  
  export const getActiveAlertsForLatLng = (lat, lng) => {
    const url = `https://api.weather.gov/alerts/active?point=${lat},${lng}`;
    console.log(url);
    return axios.get(url, {
      headers,
    });
  };
  
  export const getForecastForLatLng = (lat, lng) => {
    const url = `https://api.weather.gov/points/${lat},${lng}`;
    console.log(url);
    return axios.get(url, {
      headers,
    });
  };
  
  export const getForecast = (props) => {
    console.log(props.forecast);
    return axios.get(props.forecast, {
      headers,
    });
  };

  export const getHourlyForecast = (props) => {
    console.log(props.forecastHourly);
    return axios.get(props.forecastHourly, {
        headers,
    });
  };