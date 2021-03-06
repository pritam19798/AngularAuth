import { Injectable } from '@angular/core';
import { CanActivate, Router  } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private route:Router,
    private auth:AuthService
  ){}
  canActivate():boolean {
    if(this.auth.islogin()){
      return true
    }else{
      this.route.navigate(['/login'])
      return false
    }
  }
}
