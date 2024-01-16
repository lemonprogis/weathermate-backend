import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

import {getActiveAlertsForLatLng, getForecast, getForecastForLatLng, getHourlyForecast, getNWSForecast} from './weather.js';
import { mapAlerts, mapDailyForecastPeriods } from "./mappers.js";

app.use(cors());

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

app.get('/ping', (req, res) => {
  res.send({status: 'ok'});
});

app.get('/', (req, res) => {
  res.send({home: 'ok'});
});

app.get('/:coords', (req, res) => {
  const coords = req.params.coords.split(',');

  if (coords.length !== 2) {
    res.send({message: 'check parameters. Must send latitude and longitude like: 35.3344,-92.453'});
  }

  const lat = coords[0];
  const lng = coords[1];
  const units = req.query.units || 'F';

  const options = {
    units,
  };

  (async function data() {
    const data = await Promise.all([
      getForecastForLatLng(lat, lng),
      getActiveAlertsForLatLng(lat, lng),
      getNWSForecast(lat, lng),
    ]);
    const pointData = data[0].data;
    const activeAlerts = data[1].data;
    const currentConditions = data[2].data;

    const forecastData = await Promise.all([
      getForecast(pointData.properties),
      getHourlyForecast(pointData.properties),
    ]);

    const forecast = forecastData[0].data;
    const hourlyForecast = forecastData[1].data;

    const response = {
      location: currentConditions.location,
      currentObservation: currentConditions.currentobservation,
      days: mapDailyForecastPeriods(forecast.properties.periods, hourlyForecast.properties.periods, options),
      alerts: mapAlerts(activeAlerts.features, options),
    }

    res.send(response);
  })();
});



server.listen(PORT, () => {
  console.log(`Running on ${HOST}:${PORT}`)
});
