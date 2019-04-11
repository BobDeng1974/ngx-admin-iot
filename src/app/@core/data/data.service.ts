import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Globals } from './app.global';
import { NbAuthService, NbAuthToken } from '@nebular/auth';

@Injectable()
export class DataService {
	token;
	dataLimit = 30;

	constructor(private http: Http,
		private authService: NbAuthService) {
	}

	private createAuthorizationHeader(headers: Headers) {
		this.authService.getToken().subscribe((token: NbAuthToken) => {
			headers.append('Authorization', 'Bearer ' + token.getValue());
			headers.append('Accept-Language', 'en_US');
			headers.append('Content-Type', 'application/json');
		});
	}

	// TODO: 建立資料
	create(data): Observable<Response> {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.post(Globals.BASE_API_URL + 'api/v1/data', data, {
			headers: headers
		});
	}

	// TODO: 取得資料
	get(id): Observable<Response> {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		console.log('url', Globals.BASE_API_URL + 'api/v1/data/' + id + '/' + this.dataLimit);
		return this.http.get(Globals.BASE_API_URL + 'api/v1/data/' + id + '/' + this.dataLimit, {
			headers: headers
		});
	}

}
