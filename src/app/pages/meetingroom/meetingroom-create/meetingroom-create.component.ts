import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { Meetingroom } from '../meetingroom.model';
import { MeetingroomsService } from './../meetingroom.service';
import { UserService } from '../../../@core/data/users.service';

import { mimeType } from './mime-type.validator';
@Component({
    selector: 'ngx-meetingroom-create',
    templateUrl: './meetingroom-create.component.html',
    styleUrls: ['./meetingroom-create.component.scss'],
})
export class MeetingroomCreateComponent implements OnInit {
    private mode = 'create';
    private meetingroomId: string;
    panelTitle: string;
    meetingroom: Meetingroom;
    isLoading = false;
    form: FormGroup;
    imagePreview: string;
    imageName: string = '';

    constructor(
        public meetingroomsService: MeetingroomsService,
        public userService: UserService, public route: ActivatedRoute) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            meetingroomName: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)],
            }),
            image: new FormControl(null, {
                validators: [Validators.required],
                asyncValidators: [mimeType],
            }),
        });

        // TODO: 檢查route中是否有參數
        // paramMap是一個observable, 因此可訂閱用以監測route是否有改變
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('meetingroomId')) {
                this.panelTitle = 'Edit Meetingroom';
                this.mode = 'edit';
                // TODO: 取得id
                this.meetingroomId = paramMap.get('meetingroomId');
                // TODO:設定Progess Loading
                this.isLoading = true;

                // TODO: 取得物件資訊
                this.meetingroomsService.getMeetingroom(this.meetingroomId)
                    .subscribe((meetingroomData) => {
                        this.isLoading = false;
                        this.meetingroom = {
                            id: meetingroomData._id,
                            name: meetingroomData.name,
                            imagePath: meetingroomData.imagePath,
                            createdBy: meetingroomData.createdBy,
                            createdDate: meetingroomData.createdDate,
                        };

                        this.form.setValue({
                            meetingroomName: this.meetingroom.name,
                            image: this.meetingroom.imagePath,
                        });

                        this.imageName = this.meetingroom.imagePath.split('/').pop().replace(/\.[^/.]+$/, '');
                        this.imagePreview = this.meetingroom.imagePath;
                    });
            } else {
                this.panelTitle = 'Create Meetingroom';
                this.mode = 'create';
                this.meetingroomId = null;
            }
        });
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
        this.imageName = this.form.value.image.name.replace(/\.[^/.]+$/, '');
    }

    onSaveMeetingroom() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.meetingroomsService.addMeetingroom(
                this.form.value.meetingroomName,
                this.form.value.image,
            );
        } else {
            this.meetingroomsService.updateMeetingrooms(
                this.meetingroomId,
                this.form.value.meetingroomName,
                this.form.value.image);
        }
        this.form.reset();
    }
}
