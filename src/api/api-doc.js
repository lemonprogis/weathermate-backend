const apiDoc = {
    swagger: '2.0',
    basePath: '/',
    info: {
      title: 'Weathermate+ API',
      version: '1.0.0'
    },
    definitions: {
        location: {
            type: "object",
            properties: {
                region: {
                    type: "string",
                    example: "srh"
                },
                latitude: {
                    type: "string",
                    example: "35.68"
                },
                longitude: {
                    type: "string",
                    example: "-92.35"
                },
                elevation: {
                    type: "string",
                    example: "1106"
                },
                wfo: {
                    type: "string",
                    example: "LZK"
                },
                timezone: {
                    type: "string",
                    example: "C|Y|6"
                },
                areaDescription: {
                    type: "string",
                    example: "3 Miles NW Shirley AR"
                },
                radar: {
                    type: "string",
                    example: "KLZK"
                },
                zone: {
                    type: "string",
                    example: "ARZ223"
                },
                county: {
                    type: "string",
                    example: "ARC141"
                },
                firezone: {
                    type: "string",
                    example: "ARZ223"
                },
                metar: {
                    type: "string",
                    example: "KCCA"
                }
            }
        },
        currentObservation: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    example: "KCCA"
                },
                name: {
                    type: "string",
                    example: "Clinton Memorial Airfield"
                },
                elevation: {
                    type: "string",
                    example: "514"
                },
                latitude: {
                    type: "string",
                    example: "35.6"
                },
                longitude: {
                    type: "string",
                    example: "-92.45"
                },
                observationDate: {
                    type: "string",
                    example: "16 Jan 14:35 pm CST"
                },
                temperature: {
                    type: "number",
                    example: 21
                },
                dewpoint: {
                    type: "number",
                    example: 3
                },
                relativeHumidity: {
                    type: "string",
                    example: "32%"
                },
                windSpeed: {
                    type: "number",
                    example: 8
                },
                windDirection: {
                    type: "string",
                    example: "NW"
                },
                windGusts: {
                    type: "number",
                    example: 0
                },
                weather: {
                    type: "string",
                    example: "Fair"
                },
                icon: {
                    type: "string",
                    example: "https://forecast.weather.gov/images/wtf/large/sct.png"
                },
                visibility: {
                    type: "string",
                    example: "10.00"
                },
                altimeter: {
                    type: "string",
                    example: "NA"
                },
                seaLevelPressure: {
                    type: "string",
                    example: "30.37"
                },
                timezone: {
                    type: "string",
                    example: "CST"
                },
                state: {
                    type: "string",
                    example: "AR"
                },
                feelsLike: {
                    type: "string",
                    example: "11"
                }
            }
        },
        days: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        example: "1"
                    },
                    name: {
                        type: "string",
                        example: "This Afternoon"
                    },
                    startTime: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-16T14:00:00-06:00"
                    },
                    endTime: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-16T18:00:00-06:00"
                    },
                    isDaytime: {
                        type: "boolean"
                    },
                    temperature: {
                        type: "number",
                        example: "14"
                    },
                    temperatureTrend: {
                        type: "string",
                        format: "nullable"
                    },
                    probabilityOfPrecipitation: {
                        type: "string",
                        example: "null%"
                    },
                    dewpoint: {
                        type: "string",
                        example: "-2°"
                    },
                    relativeHumidity: {
                        type: "string",
                        example: "50%"
                    },
                    windSpeed: {
                        type: "string",
                        example: "5 mph"
                    },
                    windDirection: {
                        type: "string",
                        example: "NW"
                    },
                    icon: {
                        type: "string",
                        example: "https://api.weather.gov/icons/land/day/skc?size=medium"
                    },
                    shortForecast: {
                        type: "string",
                        example: "Sunny"
                    },
                    detailedForecast: {
                        type: "string",
                        example: "Sunny, with a high near 14. Wind chill values as low as 4. Northwest wind around 5 mph."
                    },
                    hourly: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "number",
                                    example: "1"
                                },
                                name: {
                                    type: "string",
                                    example: ""
                                },
                                startTime: {
                                    type: "string",
                                    format: "date-time",
                                    example: "2024-01-16T14:00:00-06:00"
                                },
                                endTime: {
                                    type: "string",
                                    format: "date-time",
                                    example: "2024-01-16T15:00:00-06:00"
                                },
                                isDaytime: {
                                    type: "boolean"
                                },
                                temperature: {
                                    type: "number",
                                    example: "14"
                                },
                                temperatureTrend: {
                                    type: "string",
                                    format: "nullable"
                                },
                                probabilityOfPrecipitation: {
                                    type: "string",
                                    example: "0%"
                                },
                                dewpoint: {
                                    type: "string",
                                    example: "-4°"
                                },
                                relativeHumidity: {
                                    type: "string",
                                    example: "44%"
                                },
                                windSpeed: {
                                    type: "string",
                                    example: "5 mph"
                                },
                                windDirection: {
                                    type: "string",
                                    example: "NNW"
                                },
                                icon: {
                                    type: "string",
                                    example: "https://api.weather.gov/icons/land/day/skc,0?size=small"
                                },
                                shortForecast: {
                                    type: "string",
                                    example: "Sunny"
                                },
                                detailedForecast: {
                                    type: "string",
                                    example: ""
                                }
                            }
                        },
                        example: [
                            {
                                "id": 1,
                                "name": "",
                                "startTime": "2024-01-16T14:00:00-06:00",
                                "endTime": "2024-01-16T15:00:00-06:00",
                                "isDaytime": true,
                                "temperature": 14,
                                "temperatureTrend": null,
                                "probabilityOfPrecipitation": "0%",
                                "dewpoint": "-4°",
                                "relativeHumidity": "44%",
                                "windSpeed": "5 mph",
                                "windDirection": "NNW",
                                "icon": "https://api.weather.gov/icons/land/day/skc,0?size=small",
                                "shortForecast": "Sunny",
                                "detailedForecast": ""
                            }
                        ]
                    }
                }
            },
            example: [
                {
                    "id": 1,
                    "name": "This Afternoon",
                    "startTime": "2024-01-16T14:00:00-06:00",
                    "endTime": "2024-01-16T18:00:00-06:00",
                    "isDaytime": true,
                    "temperature": 14,
                    "temperatureTrend": null,
                    "probabilityOfPrecipitation": "null%",
                    "dewpoint": "-2°",
                    "relativeHumidity": "50%",
                    "windSpeed": "5 mph",
                    "windDirection": "NW",
                    "icon": "https://api.weather.gov/icons/land/day/skc?size=medium",
                    "shortForecast": "Sunny",
                    "detailedForecast": "Sunny, with a high near 14. Wind chill values as low as 4. Northwest wind around 5 mph.",
                    "hourly": [
                        {
                            "id": 1,
                            "name": "",
                            "startTime": "2024-01-16T14:00:00-06:00",
                            "endTime": "2024-01-16T15:00:00-06:00",
                            "isDaytime": true,
                            "temperature": 14,
                            "temperatureTrend": null,
                            "probabilityOfPrecipitation": "0%",
                            "dewpoint": "-4°",
                            "relativeHumidity": "44%",
                            "windSpeed": "5 mph",
                            "windDirection": "NNW",
                            "icon": "https://api.weather.gov/icons/land/day/skc,0?size=small",
                            "shortForecast": "Sunny",
                            "detailedForecast": ""
                        },
                        {
                            "id": 2,
                            "name": "",
                            "startTime": "2024-01-16T15:00:00-06:00",
                            "endTime": "2024-01-16T16:00:00-06:00",
                            "isDaytime": true,
                            "temperature": 14,
                            "temperatureTrend": null,
                            "probabilityOfPrecipitation": "0%",
                            "dewpoint": "-3°",
                            "relativeHumidity": "46%",
                            "windSpeed": "5 mph",
                            "windDirection": "NW",
                            "icon": "https://api.weather.gov/icons/land/day/skc,0?size=small",
                            "shortForecast": "Sunny",
                            "detailedForecast": ""
                        },
                        {
                            "id": 3,
                            "name": "",
                            "startTime": "2024-01-16T16:00:00-06:00",
                            "endTime": "2024-01-16T17:00:00-06:00",
                            "isDaytime": true,
                            "temperature": 13,
                            "temperatureTrend": null,
                            "probabilityOfPrecipitation": "0%",
                            "dewpoint": "-3°",
                            "relativeHumidity": "48%",
                            "windSpeed": "5 mph",
                            "windDirection": "NW",
                            "icon": "https://api.weather.gov/icons/land/day/skc,0?size=small",
                            "shortForecast": "Sunny",
                            "detailedForecast": ""
                        },
                        {
                            "id": 4,
                            "name": "",
                            "startTime": "2024-01-16T17:00:00-06:00",
                            "endTime": "2024-01-16T18:00:00-06:00",
                            "isDaytime": true,
                            "temperature": 13,
                            "temperatureTrend": null,
                            "probabilityOfPrecipitation": "0%",
                            "dewpoint": "-2°",
                            "relativeHumidity": "50%",
                            "windSpeed": "5 mph",
                            "windDirection": "NW",
                            "icon": "https://api.weather.gov/icons/land/day/skc,0?size=small",
                            "shortForecast": "Sunny",
                            "detailedForecast": ""
                        }
                    ]
                }
            ]
        },
        alerts: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        example: "urn:oid:2.49.0.1.840.0.2b6fb1d228e88c0f7db496137f4a5dc69d3bf8cd.001.1"
                    },
                    areaDesc: {
                        type: "string",
                        example: "Marion; Baxter; Stone; Boone County Except Southwest; Newton County Higher Elevations; Searcy County Lower Elevations; Boone County Higher Elevations; Newton County Lower Elevations; Northwest Searcy County Higher Elevations; Johnson County Higher Elevations; Pope County Higher Elevations; Van Buren County Higher Elevations; Eastern, Central, and Southern Searcy County Higher Elevations"
                    },
                    sent: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-16T11:17:00-06:00"
                    },
                    effective: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-16T11:17:00-06:00"
                    },
                    expires: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-17T09:00:00-06:00"
                    },
                    ends: {
                        type: "string",
                        format: "date-time",
                        example: "2024-01-17T09:00:00-06:00"
                    },
                    status: {
                        type: "string",
                        example: "Actual"
                    },
                    messageType: {
                        type: "string",
                        example: "Update"
                    },
                    category: {
                        type: "string",
                        example: "Met"
                    },
                    severity: {
                        type: "string",
                        example: "Moderate"
                    },
                    certainty: {
                        type: "string",
                        example: "Likely"
                    },
                    urgency: {
                        type: "string",
                        example: "Expected"
                    },
                    senderName: {
                        type: "string",
                        example: "NWS Little Rock AR"
                    },
                    headline: {
                        type: "string",
                        example: "Wind Chill Advisory issued January 16 at 11:17AM CST until January 17 at 9:00AM CST by NWS Little Rock AR"
                    },
                    description: {
                        type: "string",
                        example: "* WHAT...Very cold wind chills. Wind chills as low as 10 below...."
                    },
                    instruction: {
                        type: "string",
                        example: "Use caution while traveling outside. Wear appropriate clothing, a hat, and gloves."
                    },
                    response: {
                        type: "string",
                        example: "Prepare"
                    }
                }
            },
            example: [
                {
                    "id": "urn:oid:2.49.0.1.840.0.2b6fb1d228e88c0f7db496137f4a5dc69d3bf8cd.001.1",
                    "areaDesc": "Marion; Baxter; Stone; Boone County Except Southwest; Newton County Higher Elevations; Searcy County Lower Elevations; Boone County Higher Elevations; Newton County Lower Elevations; Northwest Searcy County Higher Elevations; Johnson County Higher Elevations; Pope County Higher Elevations; Van Buren County Higher Elevations; Eastern, Central, and Southern Searcy County Higher Elevations",
                    "sent": "2024-01-16T11:17:00-06:00",
                    "effective": "2024-01-16T11:17:00-06:00",
                    "expires": "2024-01-17T09:00:00-06:00",
                    "ends": "2024-01-17T09:00:00-06:00",
                    "status": "Actual",
                    "messageType": "Update",
                    "category": "Met",
                    "severity": "Moderate",
                    "certainty": "Likely",
                    "urgency": "Expected",
                    "senderName": "NWS Little Rock AR",
                    "headline": "Wind Chill Advisory issued January 16 at 11:17AM CST until January 17 at 9:00AM CST by NWS Little Rock AR",
                    "description": "* WHAT...Very cold wind chills. Wind chills as low as 10 below\nzero.\n\n* WHERE...Much of Arkansas.\n\n* WHEN...Until 9 AM CST Wednesday.\n\n* ADDITIONAL DETAILS...Bitterly cold temperatures and wind chill\nvalues could result in frostbite as well as significant\nimpacts to infrastructure.",
                    "instruction": "Use caution while traveling outside. Wear appropriate clothing, a\nhat, and gloves.",
                    "response": "Prepare"
                }
            ]
        }
    },
    paths: {}
  };
  
module.exports = apiDoc;