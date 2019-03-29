import { Component, OnInit } from '@angular/core';
import { Device } from '../device.model';
import { NgForm } from '@angular/forms';
import { DevicesService } from '../devices.service';
import { UserService } from '../../../@core/data/users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'ngx-device-create',
    templateUrl: './device-create.component.html',
    styleUrls: ['./device-create.component.css'],
})
export class DeviceCreateComponent implements OnInit {
    private mode = 'create';
    private deviceId: string;
    device: Device;
    isLoading = false;

    constructor(public devicesService: DevicesService, public userService: UserService, public route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // TODO: 檢查route中是否有參數
        // paramMap是一個observable, 因此可訂閱用以監測route是否有改變
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('deviceId')) {
                this.mode = 'edit';
                // TODO: 取得id
                this.deviceId = paramMap.get('deviceId');

                // TODO:設定Progess Loading
                this.isLoading = true;

                // TODO: 取得物件資訊
                this.devicesService.getDevice(this.deviceId)
                    .subscribe((deviceData) => {
                        this.isLoading = false;
                        this.device = deviceData;
                    });
            } else {
                this.mode = 'create';
                this.deviceId = null;
            }
        });
    }

    onSaveDevice(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.isLoading = true;

        const newDevice: Device = {
            id: this.deviceId,
            name: form.value.name,
            macAddress: form.value.macAddress,
            createdBy: 'Admin',
            createdDate: Date.now().toLocaleString(),
        };

        if (this.mode === 'create') {
            // console.log('create');
            this.devicesService.addDevice(newDevice);
        } else {
            // console.log('update');
            this.devicesService.updateDevice(newDevice);
        }

        form.resetForm();
    }
}
