import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerApi="http://localhost:3000/api/register"
  private _loginApi="http://localhost:3000/api/login"
  constructor(
    private http:HttpClient,
    private route:Router
  ) {}

    registerUserApi(user){
      return this.http.post<any>(this._registerApi,user)
    }
    loginUserApi(user){
      return this.http.post<any>(this._loginApi,user)
    }

    logout(){
      sessionStorage.removeItem('token')
      this.route.navigate(['/events'])
    }

    islogin(){
      return !!sessionStorage.getItem('token')
    }


    getToken(){
      return sessionStorage.getItem('token')
    }

}
