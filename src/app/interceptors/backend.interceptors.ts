import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MANAGE } from '../consts/httpConsts';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructToken = '';
  auth: any;
  errorMessage: string;
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    switch (req.headers.get('X-META')) {
      case MANAGE:
        req = this.interceptAnnotation(req);
        break;
    }
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = `Error: ${error.error.message}`;
            if (error.status >= 500 || error.status === 401) {
              // To clear token
              //   this.auth.setToken('');
            }
          } else {
            this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          return throwError(this.errorMessage);
        }
      )
    );
  }

  interceptAnnotation(req) {
    if (req.headers.has('token')) {
      this.constructToken = req.headers.get('token');
    }
    req = req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + this.constructToken)
        .delete('X-META')
    });
    return req;
  }
}
