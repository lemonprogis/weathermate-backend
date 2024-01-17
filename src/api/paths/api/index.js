const { getWeatherData } = require("../../../services/weather");

module.exports = function () {
    let operations = {
        GET,
    };

    async function GET(req, res, next) {
        const data = await getWeatherData(req.query.lat, req.query.lng);
        res.status(200).json(data);
    }

    GET.apiDoc = {
        summary: "Get Weather",
        operationId: "getWeatherData",
        parameters: [
            {
              in: "query",
              name: "lat",
              required: true,
              type: "number",
            },
            {
                in: "query",
                name: "lng",
                required: true,
                type: "number",
              },
          ],
        responses: {
            200: {
              description: "Current Observation, Location, Daily with Hourly Forecast, any active alerts for the submitted location",
              schema: {
                type: "object",
                properties: {
                    location: {
                        $ref: "#/definitions/location",
                    },
                    currentObservation: {
                        $ref: "#/definitions/currentObservation"
                    },
                    days: {
                        $ref: "#/definitions/days"
                    },
                    alerts: {
                        $ref: "#/definitions/alerts"
                    }
                }
              },
            },
          },
    }

    return operations;
};