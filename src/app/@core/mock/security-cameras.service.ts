import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Camera, SecurityCamerasData } from '../data/security-cameras';

@Injectable()
export class SecurityCamerasService extends SecurityCamerasData {

  private cameras: Camera[] = [
    {
      title: 'Camera #1',
      source: 'assets/images/camera1.jpg',
    },
    {
      title: 'Camera #2',
      source: 'assets/images/camera2.jpg',
    },
    {
      title: 'Camera #3',
      source: 'assets/images/camera3.jpg',
    },
    {
      title: 'Camera #4',
      source: 'http://10.192.211.175:5000/video_feed',
    },
  ];

  getCamerasData(): Observable<Camera[]> {
    return observableOf(this.cameras);
  }
}
