import {toFahrenheit} from './utils.js';

export const forecastPeriod = (period, options) => {
    return {
        id: period.number,
        name: period.name,
        startTime: period.startTime,
        endTime: period.endTime,
        isDaytime: period.isDaytime,
        temperature: period.temperature,
        temperatureUnit: options.unit,
        temperatureTrend: period.temperatureTrend,
        probabilityOfPrecipitation: `${period.probabilityOfPrecipitation.value}%`,
        dewpoint: toFahrenheit(period.dewpoint.value), // defaults to celcius
        relativeHumidity: `${period.relativeHumidity.value}%`,
        windSpeed: period.windSpeed,
        windDirection: period.windDirection,
        icon: period.icon,
        shortForecast: period.shortForecast,
        detailedForecast: period.detailedForecast,
      }
};

export const mapAlert = (alert) => {
    return {
        id: alert.properties.id,
        areaDesc: alert.properties.areaDesc,
        sent: alert.properties.sent,
        effective: alert.properties.effective,
        expires: alert.properties.expires,
        ends: alert.properties.ends,
        status: alert.properties.status,
        messageType: alert.properties.messageType,
        category: alert.properties.category,
        severity: alert.properties.severity,
        certainty: alert.properties.certainty,
        urgency: alert.properties.urgency,
        senderName: alert.properties.senderName,
        headline: alert.properties.headline,
        description: alert.properties.description,
        instruction: alert.properties.instruction,
        response: alert.properties.response,
      };
};

export const dailyForecastPeriod = (period, hourlyPeriods, options) => {
    return {
        ...forecastPeriod(period, options),
        hourly: hourlyPeriods.filter(hp => hp.startTime.includes(period.startTime.split('T')[0]) && hp.isDaytime === period.isDaytime).map(hp => forecastPeriod(hp, options))
      };
};

export const mapDailyForecastPeriods = (periods, hourlyPeriods, options) => {
    return periods.map(p => dailyForecastPeriod(p, hourlyPeriods, options));
};

export const mapAlerts = (alerts, options) => {
    return alerts.map(mapAlert);
};