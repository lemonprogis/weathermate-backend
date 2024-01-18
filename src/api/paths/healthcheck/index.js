const { checkApi } = require("../../../services/weather");

module.exports = function () {
    let operations = {
        GET,
    };

    async function GET(req, res, next) {
        const response = await checkApi();
        res.status(200).json(response.data);
    }

    GET.apiDoc = {
        summary: "Healthcheck",
        operationId: "checkApi",
        responses: {
            200: {
              description: "API Healthcheck",
              schema: {
                type: "object",
                properties: {
                    status: {
                        type: "string"
                    },
                }
              },
            },
          },
    }

    return operations;
};