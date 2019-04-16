import { Observable } from 'rxjs';

export abstract class ApiData {
  abstract create(data: any): Observable<any>;
  abstract get(id: any): Observable<any>;
}
