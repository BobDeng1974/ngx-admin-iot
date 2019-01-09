import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Device } from "../device.model";
import { DevicesService } from "../devices.service";
import { PageEvent } from "@angular/material";

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {
    devices: Device[] = [];
    private devicesSub: Subscription;
    isLoading = false;

    // TODO: Pagin setting
    totalDevices = 10;
    devicesPerPage = 2;
    pagesSizeOptions = [1, 2, 5, 10];

    constructor(public devicesService: DevicesService) { }

    ngOnInit(): void {
        this.isLoading = true;

        // TODO: 擷取資料時會觸發資料變動, 執行getDeviceUpdateListerner監聽的事件
        this.devicesService.getDevices();

        // TODO: (4)監聽Subject事件
        this.devicesSub = this.devicesService.getDeviceUpdateListener()
            .subscribe((devices: Device[]) => {
                this.isLoading = false;
                console.log('Initial state', devices.length);
                this.devices = devices;
            });
    }

    onChangedPage(pageData: PageEvent) {

    }

    onDelete(deviceId: string) {
        this.devicesService.deleteDevice(deviceId);
    }

    ngOnDestroy() {
        // TODO: (5)離開該Component時, 移除Subscription, 否則會memory leak
        this.devicesSub.unsubscribe();
    }
}