import { Component } from "@angular/core";
import { Device } from "../device.model";
import { NgForm } from "@angular/forms";
import { DevicesService } from "../devices.service";

@Component({
    selector: 'app-device-create',
    templateUrl: './device-create.component.html',
    styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent {
    // enteredName = '';
    // enteredMacAddress = '';

    constructor(public devicesService: DevicesService) {   
    }

    onAddDevice(form: NgForm) {
        if (form.invalid) {
            return
        }

        const newDevice: Device = {
            name: form.value.name,
            macAddress: form.value.macAddress,
            createdBy: 'Admin',
            createdDate: Date().toLocaleString()
        };

        this.devicesService.addDevice(newDevice);
    }
}