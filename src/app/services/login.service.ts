import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private register:HttpRequestService) { }

  userLogin(credentials:Object){
    return this.register.login('login',credentials)
  }

  googleSignin(){
    return this.register.googleSignin(); 
  }
  
}
