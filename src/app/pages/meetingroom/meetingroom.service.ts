import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Meetingroom } from './meetingroom.model';

import { ServerDataSource } from 'ng2-smart-table';

const BACKEND_URL = environment.apiUrl + '/meetingroom/';

@Injectable({ providedIn: 'root'})
export class MeetingroomsService {
    private meetingrooms: Meetingroom[] = [];
    private serverDataSource: ServerDataSource;

    // TODO: (1)宣告Subject, 會傳入Meetingroom陣列
    private meetingroomsUpdated = new Subject<{ meetingrooms: Meetingroom[], meetingroomCount: number }>();

    constructor(protected http: HttpClient, private router: Router) {
    }

    getMeetingrooms(meetingroomsPerPage: number, currentPage: number) {
        // console.log('get meetingrooms paging', meetingroomsPerPage, currentPage);

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
                            id: meetingroom._id,
                        };
                    }),
                    maxMeetingrooms: meetingroomDate.meetingrooms,
                };
            }))
            .subscribe((transformedMeetingroomData) => {
                // console.log('transformed Meetingroom data', transformedMeetingroomData);
                this.meetingrooms = transformedMeetingroomData.meetingrooms;
                this.meetingroomsUpdated.next({
                    meetingrooms: [...this.meetingrooms],
                    meetingroomCount: transformedMeetingroomData.maxMeetingrooms,
                });
            });
    }

    getMeetingrooms2(): ServerDataSource {
        this.serverDataSource = new ServerDataSource(this.http, {
            endPoint: BACKEND_URL + '?_start=1',
            dataKey: 'meetingrooms',
            totalKey: 'maxMeetingrooms',
            pagerLimitKey: '_limit',
            pagerPageKey: '_page',
            sortDirKey: '_order',
            sortFieldKey: '_sort',
        });

        // this.serverDataSource.setSort([{ field: 'createdDate', direction: 'asc' }], false);

        return this.serverDataSource;
    }

    getMeetingroomUpdateListener() {
        return this.meetingroomsUpdated.asObservable();
    }

    getMeetingroom(id: string) {
        return this.http.get<{
            _id: string;
            name: string;
            imagePath: string;
            createdBy: string;
            createdDate: string;
        }>(BACKEND_URL + id);
    }

    addMeetingroom(name: string, image: File) {
        const meetingroomData = new FormData();
        meetingroomData.append('name', name);
        meetingroomData.append('image', image, image.name);
        this.http
        .post<{ message: string, meetingroom: Meetingroom}>(
                BACKEND_URL,
                meetingroomData,
            )
            .subscribe(res => {
                // console.log('created result ----', res);
                // const meetingroom: Meetingroom = {
                //     id: res.meetingroom.id,
                //     name: name,
                //     imagePath: res.meetingroom.imagePath,
                //     createdBy: res,
                //     createdDate: Date.now().toLocaleString()
                // };
                // this.meetingrooms.push(meetingroom);

                this.router.navigate(['/pages/meetingroom/meetingroom-list']);
            });
    }

    updateMeetingrooms(id: string, name: string, image: File | string) {
        let meetingroomData: Meetingroom | FormData;
        if (typeof image === 'object') {
            meetingroomData = new FormData();
            meetingroomData.append('id', id);
            meetingroomData.append('name', name);
            meetingroomData.append('image', image, name);
        } else {
            meetingroomData = {
                id: id,
                name: name,
                imagePath: image,
                createdBy: null,
                createdDate: null,
            };
        }
        this.http
        .put(BACKEND_URL + id, meetingroomData)
        .subscribe(response => {
            this.router.navigate(['/pages/meetingroom/meetingroom-list']);
        });
    }

    deleteMeetingroom(meetingroomId: string) {
        return this.http.delete(BACKEND_URL + meetingroomId);
      }
}
