import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Device } from "../device.model";
import { DevicesService } from "../devices.service";

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {

    // devices = [
    //     { name: 'aaa', macAddress: 'aaa', createBy: 'aaa', updatedAt: 'aaa'},
    //     { name: 'bbb', macAddress: 'bbb', createBy: 'bbb', updatedAt: 'bbb'},
    //     { name: 'ccc', macAddress: 'ccc', createBy: 'ccc', updatedAt: 'ccc'}
    // ];

    devices: Device[] = [];
    private devicesSub: Subscription;

    constructor(public devicesService: DevicesService) { }

    ngOnInit(): void {

        // 擷取資料時會觸發資料變動, 執行getDeviceUpdateListerner監聽的事件
        this.devicesService.getDevices();

        // TODO: (4)監聽Subject事件
        this.devicesSub = this.devicesService.getDeviceUpdateListener()
            .subscribe((devices: Device[]) => {
                console.log('Initial state', devices.length);
                this.devices = devices;
            });
    }

    onDelete(deviceId: string) {
        this.devicesService.deleteDevice(deviceId);
    }

    ngOnDestroy() {
        // TODO: (5)離開該Component時, 移除Subscription, 否則會memory leak
        this.devicesSub.unsubscribe();
    }
}