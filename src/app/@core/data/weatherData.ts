import { Observable } from 'rxjs';

export interface SevenDayWeatherForecast {
    dailyForecasts: {
        forecastLocation: {
            forecast: ForecastData[];
            country: string;
            state: string;
            city: string;
            latitude: number;
            longitude: number;
        }
    },
    feedCreation: string,
    metric: boolean
}

export interface ForecastData {
    description: string;
    temperatureDesc: string;
    highTemperature: number;
    lowTemperature: number;
    humidity: number;
    precipitationProbability: number;
    precipitationDesc: string;
    windSpeed: number;
    windDirection: number;
    windDesc: string;
    uvIndex: number;
    uvDesc: string;
    iconName: string;
    iconLink: string;
    dayOfWeek: number;
    weekday: string;
    utcTime: string;
}

export abstract class WeatherData {
    abstract getSevenDayWeatherForecastData(): Observable<SevenDayWeatherForecast>;
}