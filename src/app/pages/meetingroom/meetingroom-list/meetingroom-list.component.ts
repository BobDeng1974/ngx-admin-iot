import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Meetingroom } from '../meetingroom.model';
import { MeetingroomsService } from '../meetingroom.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';

@Component({
    selector: 'app-meetingroom-list',
    templateUrl: './meetingroom-list.component.html',
    styleUrls: ['./meetingroom-list.component.css']
})
export class MeetingroomListComponent implements OnInit, OnDestroy {
    meetingrooms: Meetingroom[] = [];
    private meetingroomSub: Subscription;
    isLoading = false;

    //TODO: Paging setting
    totalMeetingrooms = 0;
    meetingroomsPerPage = 1;
    currentPage = 1;
    pagesSizeOptions = [1, 2, 5, 10];

    //TODO: Smart Table Setting
    settings = {
        actions: {
            add: false,
            edit: false,
            delete: true
        },
        noDataMessage: 'No Meetingroom Added Yet',
        pager: {  
            display: true,  
            perPage: 1
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            name: {
                title: 'Meetingroom'
            },
            imagePath: {
                title: 'Meetingroom Photo',
                type: 'html',
                sort: false,
                editable: false,
                addable: false,
                valuePrepareFunction: (value) => { return `<img src= ${value} height='50%' width='50%' />` }
            },
            createdBy: {
                title: 'Created By',
                editable: false,
                addable: false
            },
            createdDate: {
                title: 'Created Date',
                editable: false,
                addable: false
            }
        }
    };
    
    serverDataSource: ServerDataSource;

    constructor(private http: HttpClient, public meetingroomsService: MeetingroomsService, public router: Router) { 

    }

    ngOnInit(): void {
        this.isLoading = true;
        
        this.serverDataSource = this.meetingroomsService.getMeetingrooms2();
        
        // console.log(`取得當前Table資訊 ${this.serverDataSource.getPaging()}`)
        // this.serverDataSource.onChanged().subscribe(data => {
        //     console.log(`Table資料來源已改變`)
        //     console.log(data)
        // });
    }

    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.meetingroomsPerPage = pageData.pageSize;
        this.meetingroomsService.getMeetingrooms(this.meetingroomsPerPage, this.currentPage);
    }

    ngOnDestroy() {
        // TODO: (5)離開該Component時, 移除Subscription, 否則會memory leak
        //this.meetingroomSub.unsubscribe();
    }

    onDeleteConfirm(event): void {
        console.log('deleteeeeeeeeeeee', event.data);
        if (window.confirm('Are you sure you want to delete?')) {
            
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

    onUserRowSelect(event): void {
        //console.log('RowSelectttttt', event.data);
        this.router.navigate(['/pages/meetingroom/meetingroom-edit', event.data._id]);
    }
}
