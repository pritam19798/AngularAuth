import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerUserData={
    email:"",
    password:""
  };
  constructor(
    private service:AuthService,
    private route:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.service.loginUserApi(this.registerUserData).subscribe(
      res=>{
        sessionStorage.setItem('token',res.token)
        console.log(res)
        this.route.navigate(['/special'])
      },
      err=>console.log(err)
    )
  }

}
