import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NbAuthComponent } from '@nebular/auth';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'device',
      component: DeviceComponent
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }
    // {
    //   path: 'auth',
    //   component: NbAuthComponent
    // },
    // {
    //   path: '',
    //   redirectTo: 'auth',
    //   pathMatch: 'full'
    // }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
