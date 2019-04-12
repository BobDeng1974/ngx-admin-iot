import { Component, Input } from '@angular/core';
import { ApiData } from '../../../@core/data/apidata';



@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="toggleChange(this)" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Input() topic: string;

  constructor(private apiDataService: ApiData) { }

  toggleChange(state) {
    this.on = !this.on;
    console.log(state.on);
    let data = {
      macAddress: 'aaa',
      data: {
        l: state.on
      },
      topic: 'led'
    };

    this.apiDataService.create(data)
      .subscribe((res) => {
        console.log(res);
      });
    
    // this.apidataService.create(data).subscribe((resp) => {
    //       if (resp.json()._id) {
    //             // this.notificationsService.success('Device Notified!');
    //       }
    // }, (err) => {
    //       console.log(err);
    //       //this.notificationsService.error('Device Notification Failed. Check console for the error!');
    // })
  }
}
