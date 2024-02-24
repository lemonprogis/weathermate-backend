const axios = require("axios");
const axiosRetry = require('axios-retry').default;
const {mapAlerts, mapDailyForecastPeriods, mapCurrentObservation} = require("./mappers");
const { error } = require("console");

const USER_AGENT = '(weathermateplus.com, contact@weathermateplus.com)';
const ACCEPT = 'application/geo+json';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

axiosRetry(axios, {retries: 5});

const headers = {
    'User-Agent': USER_AGENT,
    Accept: ACCEPT,
};

function checkApi() {
  return axios.get('https://api.weather.gov/', {headers});
}

async function getWeatherDataByLocation(address) {
  const l = await geocode(address);
  return await getWeatherData(l.lat, l.lng);
}

async function geocode(location) {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`);
    const output = response.data;
    console.log(output);
    // default grab first result
    const result = output.results[0].geometry.location;
    return result;
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

  const forecast = await getForecast(pointData.properties);
  const hourlyForecast = await getHourlyForecast(pointData.properties);
  
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
  return new Promise((resolve, reject) => {
    axios.get(url, {params, headers: {
      Accept: 'application/json',
    }}).then(({status, data}) => {
      if (status === 503) {
        resolve({
          location: {},
          currentObservation: {
            "id": "0",
            "name": "",
            "elev": "",
            "latitude": "32",
            "longitude": "",
            "Date": "",
            "Temp": "",
            "Dewp": "",
            "Relh": "",
            "Winds": "",
            "Windd": "",
            "Gust": "",
            "Weather": "",
            "Weatherimage": "",
            "Visibility": "",
            "Altimeter": "",
            "SLP": "",
            "timezone": "",
            "state": "",
            "WindChill": ""
          }
        });
      } else if (status === 200) {
        resolve(data);
      } else {
        reject(new Error('error current observation data from forecast.weather.gov'));
      }
    }).catch(error => {
      console.log('forecast.weather.gov STATUS CODE: ',error.response.status);
      if (error.response.status === 503) {
        resolve({
          location: {},
          currentObservation: {
            "id": "",
            "name": "",
            "elev": "",
            "latitude": "",
            "longitude": "",
            "Date": "",
            "Temp": "",
            "Dewp": "",
            "Relh": "",
            "Winds": "",
            "Windd": "",
            "Gust": "",
            "Weather": "",
            "Weatherimage": "",
            "Visibility": "",
            "Altimeter": "",
            "SLP": "",
            "timezone": "",
            "state": "",
            "WindChill": ""
          }
        });
      }
    });
  });
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
  return new Promise((resolve, reject) => {
    axios.get(props.forecast, {
      headers,
    }).then(({status, data}) => {
      resolve(data);
    }).catch(error => {
      console.log('weather.gov API FORECAST STATUS CODE: ', error.response.status);
      if (error.response.status === 503) {
        resolve({
          data: {
            properties: {
              periods: []
            }
          }
        });
      }
    });;
  });
};

function getHourlyForecast(props) {
  console.log(props.forecastHourly);
  return new Promise((resolve, reject) => {
    axios.get(props.forecastHourly, {
      headers,
    }).then(({status, data}) => {
      if (status === 503) {
        resolve({
          properties: {
            periods: []
          }
        });
      } else if (status === 200) {
        resolve(data);
      } else {
        reject(new Error('error fetching hourly forecast data from weather.gov API'));
      }
    }).catch(error => {
      console.log('weather.gov API HOURLY FORECAST STATUS CODE: ',error.response.status);
      if (error.response.status === 503) {
        resolve({
          properties: {
            periods: []
          }
        });
      }
    });
  });
};

module.exports = {
  checkApi,
  getWeatherData,
  getWeatherDataByLocation,
};