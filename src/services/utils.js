function toFahrenheit(temp) {
  if (temp === null) {
    return '--';
  }
  return `${Math.round((temp * 1.8 + 32).toFixed(1))}°`;
};

function getWindDirection(num) {
  if (num === null || num === 0) {
    return '--';
  }
  var val = parseInt(num / 22.5 + 0.5);
  var arr = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  return arr[val % 16];
};

function feelsLike(co) {
  if (co.WindChill !== undefined)
    return co.WindChill;

  if (co.HeatIndex !== undefined)
    return co.HeatIndex;

  return '--';
}

module.exports = {
  toFahrenheit,
  getWindDirection,
  feelsLike,
};