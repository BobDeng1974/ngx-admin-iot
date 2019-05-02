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
		this.init();
	}

	init() {
		this.authService.getToken().subscribe((token: NbAuthToken) => {
			console.log('authhhhhhhhhhhhhhh', token.getValue());
			this.socket = io(Globals.BASE_API_URL, {
				'query': 'token=' + token.getValue(),
			});
			console.log('socket init', this.socket);
		});	
	}

	getData(identifier) {
		
		// TODO: 處理切換component socket斷線問題
		// 切換回dashboard需要重新連線
		if(this.socket.connected == false) this.init();

		console.log('socket.service.ts', 'data:save:' + identifier);
		let observable = new Observable(observer => {
			console.log('socket service start ----------------', this.socket);
			// observer.error(err => {
			// 	console.log('Observer getData error', err);
			// });
			this.socket.on('data:save:'.concat(identifier), (data) => {
				console.log('Get data:save', identifier);
				observer.next(data);
				return data;
			});
			
			return (error) => {
				console.log('socket service error ----------------', error);
				this.socket.disconnect();
				console.log('disconnected', this.socket);
			};
		})
		return observable;
	}
}
