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
        this.devices = this.devicesService.getDevices();

        // TODO: (4)監聽Subject事件
        this.devicesSub = this.devicesService.getPostUpdateListener()
            .subscribe((devices: Device[]) => {
                this.devices = devices;
            });
    }

    ngOnDestroy() {
        // TODO: (5)離開該Component時, 移除Subscription, 否則會memory leak
        this.devicesSub.unsubscribe();
    }
}