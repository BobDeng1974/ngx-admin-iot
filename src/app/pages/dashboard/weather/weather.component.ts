import { Component, AfterViewInit } from '@angular/core';
import { SevenDayWeatherForecast, WeatherData, ForecastData } from '../../../@core/data/weatherData';


@Component({
  selector: 'ngx-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})

export class WeatherComponent implements AfterViewInit {
  currentTemperature: number;
  completeForecast: SevenDayWeatherForecast;
  forecastArray: ForecastData[];


  constructor(private weatherDataService: WeatherData) {
    this.weatherDataService.getSevenDayWeatherForecastData()
      .subscribe((sevenDayWeatherForecastData) => {
        this.completeForecast = sevenDayWeatherForecastData;
        this.forecastArray = sevenDayWeatherForecastData.dailyForecasts.forecastLocation.forecast;
        this.currentTemperature = (Number(this.forecastArray[0].highTemperature) + Number(this.forecastArray[0].lowTemperature)) / 2;
        console.log('=======:', this.completeForecast);
      });
  }

  ngAfterViewInit() {

  }
}
