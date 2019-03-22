import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Meetingroom } from './meetingroom.model';
import { UserService } from '../../@core/data/users.service';

const BACKEND_URL = environment.apiUrl + "/meetingroom/";

@Injectable({ providedIn: "root"})
export class MeetingroomsService {
    private meetingrooms: Meetingroom[] = [];

    // TODO: (1)宣告Subject, 會傳入Meetingroom陣列
    private meetingroomsUpdated = new Subject<{ meetingrooms: Meetingroom[], meetingroomCount: number }>();

    constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

    getMeetingrooms(meetingroomsPerPage: number, currentPage: number) {
        console.log('get meetingrooms paging', meetingroomsPerPage, currentPage);

        const queryParams = `?pagesize=${meetingroomsPerPage}&page=${currentPage}`;

        this.http
            .get<{ message: string, meetingrooms: any, maxMeetingrooms: number }>(BACKEND_URL + queryParams) ///
            .pipe(map((meetingroomDate) => {
                return {
                    meetingrooms: meetingroomDate.meetingrooms.map((meetingroom) => {
                        return {
                            name: meetingroom.name,
                            imagePath: meetingroom.imagePath,
                            createdBy: meetingroom.createdBy,
                            createdDate: meetingroom.createdDate,
                            id: meetingroom._id
                        };
                    }),
                    maxMeetingrooms: meetingroomDate.meetingrooms
                };
            }))
            .subscribe((transformedMeetingroomData) => {
                console.log('transformed Meetingroom data', transformedMeetingroomData);
                this.meetingrooms = transformedMeetingroomData.meetingrooms;
                this.meetingroomsUpdated.next({
                    meetingrooms: [...this.meetingrooms],
                    meetingroomCount: transformedMeetingroomData.maxMeetingrooms
                });
            });
    }

    getMeetingroomUpdateListener() {
        return this.meetingroomsUpdated.asObservable();
    }

    getMeetingroom(meetingroomId: string) {
        return this.http.get<Meetingroom>(BACKEND_URL + meetingroomId);
    }

    addMeetingroom(name: string, image: File) {
        const meetingroomData = new FormData();
        meetingroomData.append('name', name);
        meetingroomData.append('image', image, image.name);
        // meetingroomData.append('createdBy', this.userService.getCurrentUser().userId);
        // meetingroomData.append('createdDate', new Date().toLocaleString());
        
        this.http
            .post<{ message: string, meetingroom: Meetingroom}>(
                BACKEND_URL,
                meetingroomData
            )
            .subscribe(res => {
                //console.log('created result ----', res);
                // const meetingroom: Meetingroom = {
                //     id: res.meetingroom.id,
                //     name: name,
                //     imagePath: res.meetingroom.imagePath,
                //     createdBy: res,
                //     createdDate: Date.now().toLocaleString()
                // };
                // this.meetingrooms.push(meetingroom);

                this.router.navigate(["/pages/meetingroom/meetingroom-list"]);
            });
    }
}