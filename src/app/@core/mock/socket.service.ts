import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Rx';
import { Globals } from '../data/app.global';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { SocketData } from '../data/socketdata';

@Injectable()
export class SocketService extends SocketData{
	private socket;
	constructor(private authService: NbAuthService) {
		super();
		this.authService.getToken().subscribe((token: NbAuthToken) => {
			console.log('authhhhhhhhhhhhhhh', token.getValue());
			this.socket = io(Globals.BASE_API_URL, {
				'query': 'token=' + token.getValue(),
			});
		});	
	}

	getData(identifier) {
		console.log('socket.service.ts', 'data:save:' + identifier);
		let observable = new Observable(observer => {
			// observer.error(err => {
			// 	console.log('Observer getData error', err);
			// });
			this.socket.on('data:save:'.concat(identifier), (data) => {
				console.log('Get data:save', identifier);
				observer.next(data);
			});
			console.log('socket service');
			return (error) => {
				this.socket.disconnect();
			};
		})
		return observable;
	}
}
