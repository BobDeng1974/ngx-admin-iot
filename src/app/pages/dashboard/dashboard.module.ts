import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    SecurityCamerasComponent
  ],
})
export class DashboardModule { }
