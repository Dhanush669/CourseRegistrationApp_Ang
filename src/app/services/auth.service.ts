import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn!:string
  constructor(private auth:HttpRequestService) { 
      this.isLoggedIn=localStorage.getItem("Login_Status")||"no"
  }

  validate(){
    const uri=localStorage.getItem("TOKEN");
    
  }

  Login(){
    this.isLoggedIn=localStorage.getItem("Login_Status")||"no"
  }

  Logout(){
    this.auth.removeToken();
    localStorage.clear()
    this.isLoggedIn="no"
  }
}
