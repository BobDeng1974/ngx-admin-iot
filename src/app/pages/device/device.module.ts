import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DeviceRoutingModule, routedComponents } from './device-routing.module';
import { DeviceHeaderComponent } from './device-header/device-header.component';
import {
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    DeviceRoutingModule,
    ThemeModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  declarations: [
    ...routedComponents,
    DeviceHeaderComponent
  ],
  providers: []
})
export class DeviceModule { }
