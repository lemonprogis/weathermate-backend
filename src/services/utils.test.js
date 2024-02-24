import {feelsLike, getWindDirection, toFahrenheit} from "./utils";

test('temp conversions work', () => {
    const x = {
        dewpoint: {
            value: 0,
        }
    };
    expect(toFahrenheit(x.dewpoint)).toBe("32°");
});

test('wind direction works', () => {
    const direction = getWindDirection(20);
    const direction2 = getWindDirection(90);
    const direction3 = getWindDirection(195);
    const direction4 = getWindDirection(315);

    expect(direction).toBe('NNE');
    expect(direction2).toBe('E');
    expect(direction3).toBe('SSW');
    expect(direction4).toBe('NW');
});

test('feels like works wind chill', () => {
    const co = {
        WindChill: 5,
        Temp: 20,
    };
    const fl = feelsLike(co);
    expect(fl).toBe(5);
});

test('feels like works heat index', () => {
    const co = {
        HeatIndex: 105,
        Temp: 97,
    };
    const fl = feelsLike(co);
    expect(fl).toBe(105);
});