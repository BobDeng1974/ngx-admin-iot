import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthToken } from '@nebular/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: NbAuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authtoken: string;
        this.authService.getToken().subscribe((token: NbAuthToken) => {
            authtoken = token.getValue();
        });

        // console.log('Auth Inteerceptor', authtoken);
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authtoken),
        });
        return next.handle(authRequest);
    }
}

