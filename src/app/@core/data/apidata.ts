import { Observable } from 'rxjs';
import { Response } from '@angular/http';

export abstract class ApiData {
  abstract create(data: any): Observable<any>;
  abstract get(id: any): Observable<any>;
}
