import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';

import { WeatherData, SevenDayWeatherForecast, ForecastData } from '../data/weatherData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../data/app.global';

@Injectable()
export class WeatherDataService extends WeatherData {

    private forecastData: ForecastData[];

    constructor(private http: HttpClient) {
		super();
    }

    getSevenDayWeatherForecastData(): Observable<SevenDayWeatherForecast>{
        // console.log('start get weather');
        
        // https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&name=Tainan&app_id=pnkKvTdKEaqD4q7RLj5B&app_code=DsUOhWgqQFVSYCVbifrQfA

        return this.http.get<SevenDayWeatherForecast>(`https://cors-anywhere.herokuapp.com/https://weather.api.here.com/weather/1.0/report.json?app_id=${Globals.APP_ID}&app_code=${Globals.APP_CODE}&product=${Globals.APP_PRODUCT}&name=${Globals.APP_NAME}`);
            
        
        
        //return this.http.get<SevenDayWeatherForecast>(`https://cors-anywhere.herokuapp.com/https://weather.api.here.com/weather/1.0/report.json?app_id=${Globals.APP_ID}&app_code=${Globals.APP_CODE}&product=${Globals.APP_PRODUCT}&name=${Globals.APP_NAME}`);
    }
}
