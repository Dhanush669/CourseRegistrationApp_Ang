import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError} from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request) .pipe(

      //retry(1),

      catchError((error: HttpErrorResponse) => {

        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {

          // client-side error

          errorMessage = error.error.message;

        } else {

          // server-side error

          errorMessage = error.error.message;
          console.log("dy dhey "+JSON.stringify(error)+" "+error.error);
          

        }
        //window.alert(error.error.text)
        return throwError(error.error);

      })

    )
  }
}
