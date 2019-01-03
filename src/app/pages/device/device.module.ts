import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DeviceComponent } from './device.component';

@NgModule({
  declarations: [
    DeviceComponent
  ],
  imports: [
    ThemeModule
  ]
})
export class DeviceModule { }
