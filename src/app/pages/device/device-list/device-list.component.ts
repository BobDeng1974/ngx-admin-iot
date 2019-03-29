import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Device } from '../device.model';
import { DevicesService } from '../devices.service';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'ngx-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit, OnDestroy {
    devices: Device[] = [];
    private devicesSub: Subscription;
    isLoading = false;

    // TODO: Paging setting
    totalDevices = 0;
    devicesPerPage = 1;
    currentPage = 1;
    pagesSizeOptions = [1, 2, 5, 10];

    constructor(public devicesService: DevicesService) { }

    ngOnInit(): void {
        this.isLoading = true;

        // TODO: 擷取資料時會觸發資料變動, 執行getDeviceUpdateListerner監聽的事件
        this.devicesService.getDevices(this.devicesPerPage, this.currentPage);

        // TODO: (4)監聽Subject事件
        this.devicesSub = this.devicesService.getDeviceUpdateListener()
            .subscribe((deviceData: { devices: Device[], deviceCount: number }) => {
                this.isLoading = false;
                this.totalDevices = deviceData.deviceCount;
                this.devices = deviceData.devices;
            });
    }

    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.devicesPerPage = pageData.pageSize;
        this.devicesService.getDevices(this.devicesPerPage, this.currentPage);
    }

    onDelete(deviceId: string) {
        this.devicesService.deleteDevice(deviceId)
            .subscribe(() => {
                this.isLoading = true;
                this.devicesService.getDevices(this.devicesPerPage, this.currentPage);
            });
    }

    ngOnDestroy() {
        // TODO: (5)離開該Component時, 移除Subscription, 否則會memory leak
        this.devicesSub.unsubscribe();
    }
}
