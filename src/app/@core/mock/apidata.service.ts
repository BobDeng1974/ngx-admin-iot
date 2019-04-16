import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Globals } from '../data/app.global';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { ApiData } from '../data/apidata';

@Injectable()
export class ApiDataService extends ApiData {
	token;
	dataLimit = 30;

	constructor(private http: HttpClient,
		private authService: NbAuthService) {
		super();
	}

	private createAuthorizationHeader(headers: HttpHeaders) {
		this.authService.getToken().subscribe((token: NbAuthToken) => {
			headers.append('Authorization', 'Bearer ' + token.getValue());
			headers.append('Accept-Language', 'en_US');
			headers.append('Content-Type', 'application/json');
		});
	}

	// TODO: 建立資料
	create(data): Observable<any> {
		// console.log('api server create callllllll', data);
		const headers = new HttpHeaders();
		this.createAuthorizationHeader(headers);
		return this.http.post(Globals.BASE_API_URL + 'api/v1/data', data, {
			headers: headers,
		});
	}

	// TODO: 取得資料
	get(id): Observable<any> {
		const headers = new HttpHeaders();
		this.createAuthorizationHeader(headers);
		// console.log('url', Globals.BASE_API_URL + 'api/v1/data/' + id + '/' + this.dataLimit);
		return this.http.get(Globals.BASE_API_URL + 'api/v1/data/' + id + '/' + this.dataLimit, {
			headers: headers,
		});
	}
}
