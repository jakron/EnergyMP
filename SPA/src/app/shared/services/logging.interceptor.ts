import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log('intercept ' + request.method, request);
        // if (request.headers.get('No-Auth') === 'True') {
        //     return next.handle(request.clone());
        // }
        // if (localStorage.getItem('token') != null) {
        //     const clonedReq = request.clone({
        //         headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
        //     });
        //     return next.handle(clonedReq).pipe(
        //         tap(succes => { },
        //             err => {
        //                 if (err.status === 401) {
        //                     this.router.navigate(['/login']);
        //                 }
        //             }
        //         ));
        // } else {
        //     this.router.navigate(['/login']);
        // }
        return next.handle(request);
    }
}
