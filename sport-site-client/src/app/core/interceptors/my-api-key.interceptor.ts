import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable()
export class MyApiKeyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.myApiUrl)) {
      console.log("zzzzzzz")
      const clonedReq = req.clone({
        setHeaders: {
          'x-api-key': environment.mApiKey,
        },
        withCredentials: true 
      });

      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}