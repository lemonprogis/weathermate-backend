import { toCelsius, toFahrenheit } from "./utils";

test('temp conversions work', () => {
    const f = 32;
    const c = 0;
    expect(toCelsius(f)).toBe("0°");
    expect(toFahrenheit(c)).toBe("32°");
});