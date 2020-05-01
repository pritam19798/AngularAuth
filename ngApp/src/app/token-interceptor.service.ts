import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private injectable:Injector
  ) { }

  intercept(req,next){
    let authorization=this.injectable.get(AuthService)
    let tokenize=req.clone({
      setHeaders:{
        Authorization: `Barer ${authorization.getToken()}`
      }
    })
    return next.handle(tokenize)
  }

}
