import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Device } from "./device.model";

@Injectable({providedIn:"root"})
export class DevicesService {
    private devices: Device[] = [];
    private devicesUpdated = new Subject<Device[]>();
    
    getDevices() {
        //要用...才是真正複製陣列, 否則只是複製位址
        return [...this.devices];
    }

    addDevice(device: Device)
    {
        const newDevice: Device = {
            name: device.name,
            macAddress: device.macAddress,
            createdBy: device.createdBy,
            createdDate: device.createdDate
        };

        this.devices.push(newDevice);
    }
}