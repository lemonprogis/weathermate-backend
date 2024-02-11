const { getWeatherDataByLocation } = require("../../../../services/weather");

module.exports = function () {
    let operations = {
        GET,
    };

    async function GET(req, res, next) {
        const data = await getWeatherDataByLocation(req.query.address);
        res.status(200).json(data);
    }

    GET.apiDoc = {
        summary: "Get Weather",
        operationId: "getWeatherData",
        parameters: [
            {
              in: "query",
              name: "address",
              required: true,
              type: "string",
            },
          ],
        responses: {
            200: {
              description: "Current Observation, Location, Daily with Hourly Forecast, any active alerts for the submitted address",
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