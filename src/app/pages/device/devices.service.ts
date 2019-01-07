import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Device } from "./device.model";

@Injectable({providedIn:"root"})
export class DevicesService {
    private devices: Device[] = [];

    // TODO: (1)宣告Subject, 會傳入Device陣列
    private devicesUpdated = new Subject<Device[]>();
    
    getDevices() {
        //要用...才是真正複製陣列, 否則只是複製位址
        return [...this.devices];
    }

    // TODO: (3)提供監聽Subject變更的方法
    getPostUpdateListener() {
        return this.devicesUpdated.asObservable();
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

        // TODO: (2)發出變更通知, 複製要通知的陣列並傳入（註冊要觀察的變更物件）
        this.devicesUpdated.next([...this.devices]);
    }
}