import {mapAlerts, mapDailyForecastPeriods} from "./mappers";

const forecastData = require('./test_data/forecast_response.json');
const hourlyForecastData = require('./test_data/forecast_hourly_response.json');
const alertData = require('./test_data/alerts_response.json');

test('maps forecast periods', () => {
    const options = {
        unit: 'F',
    };
    const periods = mapDailyForecastPeriods(
        forecastData.properties.periods, 
        hourlyForecastData.properties.periods, options);
    const period = periods[0];
    expect(periods.length).toBe(14);
    expect(period.temperature).toBe(47);
});

test('maps forecasts periods with hourly included', () => {
    const options = {
        unit: 'F',
    };
    const periods = mapDailyForecastPeriods(
        forecastData.properties.periods, 
        hourlyForecastData.properties.periods, options);
    expect(periods[0].hourly.length).toBe(9);
    expect(periods[1].hourly.length).toBe(6);
    expect(periods[2].hourly.length).toBe(12);
});

test('alerts map', () => {
    const alerts = mapAlerts(alertData.features, {});
    expect(alerts.length).toBe(2);
});