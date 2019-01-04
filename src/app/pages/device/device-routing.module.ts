import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DeviceComponent } from "./device.component";
import { DeviceCreateComponent } from "./device-create/device-create.component";
import { DeviceHeaderComponent } from "./device-header/device-header.component";
import { DeviceListComponent } from "./device-list/device-list.component";

const routes: Routes = [{
    path: '',
    component: DeviceComponent,
    children: [{
        path: 'device-create',
        component: DeviceCreateComponent
    }, {
        path: 'device-header',
        component: DeviceHeaderComponent
    }, {
        path: 'device-list',
        component: DeviceListComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class DeviceRoutingModule {}

export const routedComponents = [
    DeviceComponent,
    DeviceCreateComponent,
    DeviceHeaderComponent,
    DeviceListComponent
];