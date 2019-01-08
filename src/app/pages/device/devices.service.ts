import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
// map可轉換任何元素到新的陣列並儲存
import { map } from "rxjs/operators";

import { Device } from "./device.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class DevicesService {
    private devices: Device[] = [];

    // TODO: (1)宣告Subject, 會傳入Device陣列
    private devicesUpdated = new Subject<Device[]>();

    constructor(private http: HttpClient) { }

    getDevices() {
        //要用...才是真正複製陣列, 否則只是複製位址
        // return [...this.devices];

        this.http
            .get<{ message: string, devices: any }>('http://localhost:3000/api/device')
            .pipe(map((deviceDate) => {
                return deviceDate.devices.map((device) => {
                    return {
                        name: device.name,
                        macAddress: device.macAddress,
                        createdBy: device.createdBy,
                        createdDate: device.createdDate,
                        id: device._id
                    };
                });
            }))
            .subscribe((transformedDeviceData) => {
                this.devices = transformedDeviceData;
                this.devicesUpdated.next([...this.devices]);
            });
    }

    // TODO: (3)提供監聽Subject變更的方法
    getDeviceUpdateListener() {
        return this.devicesUpdated.asObservable();
    }

    addDevice(device: Device) {
        const newDevice: Device = {
            id: device.id,
            name: device.name,
            macAddress: device.macAddress,
            createdBy: device.createdBy,
            createdDate: device.createdDate
        };

        // TODO: 傳送POST到API Server新增資料
        this.http.post<{ message: string }>('http://localhost:3000/api/device', newDevice)
            .subscribe((response) => {
                console.log(response);

                // TODO: 成功執行callback才更新資料陣列
                this.devices.push(newDevice);
                // TODO: (2)發出變更通知, 複製要通知的陣列並傳入（註冊要觀察的變更物件）
                this.devicesUpdated.next([...this.devices]);
            });
    }
}