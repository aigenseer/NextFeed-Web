import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieStore, StoreIds} from "./CookieStore";
import {Token} from "../model/token/token.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = CookieStore.getParsedJSONOrDefault<Token>(StoreIds.participantToken, obj => new Token(obj.token), null);
    if(token === null) {
      token = CookieStore.getParsedJSONOrDefault<Token>(StoreIds.adminToken, obj => new Token(obj.token), null);
    }

    if (token === null || token.token.length === 0) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', token.token),
    });

    return next.handle(req1);
  }

}
