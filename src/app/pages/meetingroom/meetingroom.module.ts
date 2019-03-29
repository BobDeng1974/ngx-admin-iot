import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { MeetingroomRoutingModule, routedComponents } from './meetingroom-routing.module';
import { MeetingroomHeaderComponent } from './meetingroom-header/meetingroom-header.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  } from '@angular/material';
@NgModule({
    imports: [
        ThemeModule,
        MeetingroomRoutingModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatPaginatorModule,
        Ng2SmartTableModule,
     ],
    declarations: [
        ...routedComponents,
        MeetingroomHeaderComponent,
    ],
    providers: [],
})
export class MeetingroomModule {}
