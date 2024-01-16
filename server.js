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
  const lat = req.query.lat;
  const lng = req.query.lng;
  const units = req.query.units || 'F';


  if ((lat === null || lat === undefined) || (lng === null || lng === undefined)) {
    res.send({message: 'check query parameters. lat and lng are required.'});
  }


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
