import { Component, OnInit } from "@angular/core";
import { Device } from "../device.model";
import { DevicesService } from "../devices.service";

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit{
    
    // devices = [
    //     { name: 'aaa', macAddress: 'aaa', createBy: 'aaa', updatedAt: 'aaa'},
    //     { name: 'bbb', macAddress: 'bbb', createBy: 'bbb', updatedAt: 'bbb'},
    //     { name: 'ccc', macAddress: 'ccc', createBy: 'ccc', updatedAt: 'ccc'}
    // ];

    devices: Device[] = [];

    constructor(public devicesService: DevicesService) {}

    ngOnInit(): void {
        this.devices = this.devicesService.getDevices();
    }
}