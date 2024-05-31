require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const {initialize} = require("express-openapi");
const {config} = require('dotenv');
const cors = require('cors');

const app = express();

config();

app.use(cors());

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/health', (req, res) => {
    res.json({"status": "ok"});
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
      url: `${HOST}/api-docs`,
    },
  })
);

console.log(`App running on port ${HOST}:${PORT}`);
console.log(
  `OpenAPI documentation available in ${HOST}:${PORT}/api-documentation`
);

module.exports = app;