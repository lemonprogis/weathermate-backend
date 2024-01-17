require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const {createTerminus} = require("@godaddy/terminus");
const {checkApi} = require('./src/services/weather.js');
const {initialize} = require("express-openapi");

const app = express();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

function onSignal() {
  console.log('server is starting cleanup');
  return Promise.all();
}

async function onHealthCheck({ state }) {
  const response = await checkApi();
  return response.data;
}

function onShutdown() {
  console.log('cleanup finished, server is shutting down');
}

createTerminus(app, {
  healthChecks: { '/api/ping': onHealthCheck },
  onSignal,
  onShutdown,
});

app.listen(PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initialize({
  app,
  apiDoc: require("./src/api/api-doc"),
  paths: "./src/api/paths",
});

app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: `http://${HOST}:${PORT}/api-docs`,
    },
  })
);

console.log(`App running on port http://${HOST}:${PORT}`);
console.log(
  `OpenAPI documentation available in http://${HOST}:${PORT}/api-documentation`
);

module.exports = app;