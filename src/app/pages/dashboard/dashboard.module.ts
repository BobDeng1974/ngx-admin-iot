import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { Co2Component } from './co2/co2.component';
import { HumidityComponent } from './humidity/humidity.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { Pm25Component } from './pm25/pm25.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    SecurityCamerasComponent,
    Co2Component,
    HumidityComponent,
    TemperatureComponent,
    Pm25Component
  ],
})
export class DashboardModule { }
