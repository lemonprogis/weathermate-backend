const {toFahrenheit, getWindDirection, feelsLike} = require("./utils");

function iconUrl(uri) {
    return `https://api.weather.gov${uri}`;
}

function forecastPeriod(period, options) {
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
        dewpoint: toFahrenheit(period.dewpoint), // defaults to celcius
        relativeHumidity: period.relativeHumidity ? `${period.relativeHumidity.value}%` : '',
        windSpeed: period.windSpeed,
        windDirection: period.windDirection,
        icon: period.icon.includes(',0?size') ? iconUrl(period.icon.split(',')[0]) : iconUrl(period.icon),
        shortForecast: period.shortForecast,
        detailedForecast: period.detailedForecast,
      }
};

function mapAlert(alert) {
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

function dailyForecastPeriod(period, hourlyPeriods, options) {
    return {
        ...forecastPeriod(period, options),
        hourly: hourlyPeriods.filter(hp => hp.startTime.includes(period.startTime.split('T')[0]) && hp.isDaytime === period.isDaytime).map(hp => forecastPeriod(hp, options))
      };
};

function mapDailyForecastPeriods(periods, hourlyPeriods, options) {
    return periods.map(p => dailyForecastPeriod(p, hourlyPeriods, options));
};

function mapAlerts(alerts, options) {
    return alerts.map(mapAlert);
};

function mapCurrentObservation(co) {
    if (co === undefined) {
        return {}
    } else {
        return {
            id: co.id,
            name: co.name,
            observationDate: co.Date,
            temperature: +co.Temp,
            dewpoint: +co.Dewp,
            relativeHumidity: `${co.Relh}%`,
            windSpeed: +co.Winds,
            windDirection: getWindDirection(+co.Windd),
            windGusts: co.Gust,
            weather: co.Weather,
            icon: `https://forecast.weather.gov/images/wtf/large/${co.Weatherimage}`,
            visibility: co.Visibility,
            altimeter: co.Altimeter,
            seaLevelPressure: co.SLP,
            timezone: co.timezone,
            state: co.state,
            feelsLike: feelsLike(co),
        };
    }
};

module.exports = {
    mapAlerts,
    mapDailyForecastPeriods,
    mapCurrentObservation,
}