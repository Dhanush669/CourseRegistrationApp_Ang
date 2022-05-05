import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean=false
  constructor(private auth:HttpRequestService) { }

  validate(){
    const uri=localStorage.getItem("TOKEN");
    
  }

  Login(){
    this.isLoggedIn=true
  }

  Logout(){
    this.isLoggedIn=false
  }
}
