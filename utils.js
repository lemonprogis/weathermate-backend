export const distance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 0.8684;
    return dist;
};

export const getWindDirection = num => {
  if (num === null) {
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

export const toFahrenheit = temp => {
  if (temp === null) {
    return '--';
  }
  return `${Math.round((temp * 1.8 + 32).toFixed(1))}°`;
};

export const toCelsius = temp => {
  if (temp === null) {
      return '--';
  }

  return `${Math.round(((temp - 32) * 5/9).toFixed(1))}°`;

};

export const toFeet = l => {
  if (l === null) {
    return '--';
  }
  return (l * 3.281).toFixed(1);
};

export const toMiles = k => {
  if (k === null) {
    return '--';
  }
  return (k * 0.621371).toFixed(1);
};

export const isNull = v => {
  return v ? v : '--';
};

export const feelsLike = (windChill, heatIndex, currentTemp) => {
  if (windChill !== undefined) {
    return `Wind Chill: ${windChill}°F `;
  }

  if (heatIndex !== undefined) {
    return `Heat Index: ${heatIndex}°F`;
  }

  return '';
};

export const toInches = mm => {
  if (mm === null) {
    return '--';
  }
  return (mm / 25.4).toFixed(2);
};

export const convertUTCToLocalTime = dateString => {
  return new Date(dateString);
};

export const timeConvert = time => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'am' : 'pm'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
};

export const createHourlyData = (hourly1, hourly2) => {
  const currentTime = new Date().toISOString();
  const combinedHourly = [...hourly1, ...hourly2];
  const currentHour = convertUTCToLocalTime(currentTime).toLocaleTimeString(
    'en-US',
    {
      hour12: false,
      hour: 'numeric',
    },
  );
  const hours = combinedHourly.map(h => h.datetime);
  const firstIndex = hours.findIndex(h => h.includes(currentHour));
  const currentHourly = combinedHourly.slice(firstIndex, -1);
  return currentHourly;
};

export const getMonthName = dt => {
  const md = dt.slice(5).split('-');
  // console.log(md);
  const date = new Date();
  date.setMonth(md[0] - 1);

  return `${date.toLocaleString('en-US', {month: 'long'})} ${md[1]}`;
};

export const getDayOfWeek = dt => {
  const d = new Date(dt);
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  const day = days[d.getUTCDay()];
  // console.log(day);
  return day;
};