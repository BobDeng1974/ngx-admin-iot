import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingroomComponent } from './meetingroom.component';
import { MeetingroomListComponent } from './meetingroom-list/meetingroom-list.component';
import { MeetingroomCreateComponent } from './meetingroom-create/meetingroom-create.component';

const routes: Routes = [{
    path: '',
    component: MeetingroomComponent,
    children: [
        {
            path: 'meetingroom-list',
            component: MeetingroomListComponent,
        },
        {
            path: 'meetingroom-create',
            component: MeetingroomCreateComponent,
        },
        {
            path: 'meetingroom-edit/:meetingroomId',
            component: MeetingroomCreateComponent,
        },
    ],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class MeetingroomRoutingModule {}

export const routedComponents = [
    MeetingroomComponent,
    MeetingroomListComponent,
    MeetingroomCreateComponent,
];
