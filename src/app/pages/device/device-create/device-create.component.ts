import { Component } from "@angular/core";
import { Device } from "../device.model";
import { NgForm } from "@angular/forms";
import { DevicesService } from "../devices.service";
import { UserService } from "../../../@core/data/users.service";

@Component({
    selector: 'app-device-create',
    templateUrl: './device-create.component.html',
    styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent {
    // enteredName = '';
    // enteredMacAddress = '';

    constructor(public devicesService: DevicesService, public userService: UserService) {
    }

    onAddDevice(form: NgForm) {
        if (form.invalid) {
            return
        }

        // console.log('aaaaaa',this.userService.getCurrentUser());

        const newDevice: Device = {
            id: null,
            name: form.value.name,
            macAddress: form.value.macAddress,
            createdBy: 'Admin',
            createdDate: Date().toLocaleString()
        };
        
        console.log('onAddDevice', newDevice);
        this.devicesService.addDevice(newDevice);
        form.resetForm();
    }
}