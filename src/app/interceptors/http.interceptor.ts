import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('TOKEN');
        if(token){
            const cloned = req.clone({
                headers: req.headers.set('Authorization', token),
                
            })
            return next.handle(cloned);
        }else{
            const cloned = req.clone({
                
            })
            return next.handle(cloned);
        }
  }
}
