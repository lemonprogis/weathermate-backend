const axios = require("axios");
const axiosRetry = require('axios-retry').default;
const {mapAlerts, mapDailyForecastPeriods, mapCurrentObservation} = require("./mappers");
const { error } = require("console");

const USER_AGENT = '(weathermateplus.com, contact@weathermateplus.com)';
const ACCEPT = 'application/geo+json';

axiosRetry(axios, {retries: 5});

const headers = {
    'User-Agent': USER_AGENT,
    Accept: ACCEPT,
};

function checkApi() {
  return axios.get('https://api.weather.gov/', {headers});
}

async function getWeatherData (lat, lng) {
  const units = 'F';
  const options = {
    units,
  };
  const data = await Promise.all([
    getForecastForLatLng(lat, lng),
    getActiveAlertsForLatLng(lat, lng),
    getNWSForecast(lat, lng),
  ]).catch(error => {
    console.log(error);
  });
  const pointData = data[0].data;
  const activeAlerts = data[1].data;
  const currentConditions = data[2].data;

  const forecastData = await Promise.all([
    getForecast(pointData.properties),
    getHourlyForecast(pointData.properties),
  ]).catch(error => {
    console.log(error);
  });

  const forecast = forecastData[0].data;
  const hourlyForecast = forecastData[1].data;

  const response = {
    location: currentConditions.location,
    currentObservation: mapCurrentObservation(currentConditions.currentobservation),
    days: mapDailyForecastPeriods(forecast.properties.periods, hourlyForecast.properties.periods, options),
    alerts: mapAlerts(activeAlerts.features, options),
  };

  return response;
};

function getNWSForecast(lat, lng) {
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
  return axios.get(url, {params, headers: {
    Accept: 'application/json',
  }});
};

function getActiveAlertsForLatLng(lat, lng) {
  const url = `https://api.weather.gov/alerts/active?point=${lat},${lng}`;
  console.log(url);
  return axios.get(url, {
    headers,
  });
};

function getForecastForLatLng(lat, lng) {
  const url = `https://api.weather.gov/points/${lat},${lng}`;
  console.log(url);
  return axios.get(url, {
    headers,
  });
};

function getForecast(props) {
  console.log(props.forecast);
  return axios.get(props.forecast, {
    headers,
  });
};

function getHourlyForecast(props) {
  console.log(props.forecastHourly);
  return axios.get(props.forecastHourly, {
      headers,
  });
};

module.exports = {
  checkApi,
  getWeatherData,
};