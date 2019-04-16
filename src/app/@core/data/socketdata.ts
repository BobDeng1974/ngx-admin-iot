import { Observable } from 'rxjs';

export abstract class SocketData {
  abstract getData(identifier: string): Observable<any>;
}
