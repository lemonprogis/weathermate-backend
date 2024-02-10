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

function convertUTCToLocalTime(dateString) {
  return new Date(dateString);
}

function timeConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time,];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

function getMonthName(dt) {
  const md = dt.slice(5).split('-');
  // console.log(md);
  const date = new Date();
  date.setMonth(md[0] - 1);

  return `${date.toLocaleString('en-US', {month: 'long'})} ${md[1]}`;
}

module.exports = {
  toFahrenheit,
  getWindDirection,
  feelsLike,
  timeConvert,
  convertUTCToLocalTime,
  getMonthName,
};