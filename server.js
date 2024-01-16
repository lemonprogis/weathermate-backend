import express from "express";
import http from "http";
import cors from "cors";
import {createTerminus} from "@godaddy/terminus";
import {getActiveAlertsForLatLng, getForecast, getForecastForLatLng, getHourlyForecast, getNWSForecast, checkApi} from './weather.js';
import { mapAlerts, mapDailyForecastPeriods } from "./mappers.js";

const app = express();
const server = http.createServer(app);


app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/api', async (req, res) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  const units = req.query.units || 'F';
  const options = {
    units,
  };

  if ((lat === null || lat === undefined) || (lng === null || lng === undefined)) {
    res.send({message: 'check query parameters. lat and lng are required.'});
  }
  
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
});

function onSignal() {
  console.log('server is starting cleanup');
  // start cleanup of resource, like databases or file descriptors
  return Promise.all();
}

async function onHealthCheck({ state }) {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
  const response = await checkApi();
  return response.data;
}

function onShutdown() {
  console.log('cleanup finished, server is shutting down');
}

createTerminus(server, {
  healthChecks: { '/api/ping': onHealthCheck },
  onSignal,
  onShutdown,
});

server.listen(PORT, () => console.log('started server'));