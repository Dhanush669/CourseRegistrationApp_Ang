import { Injectable } from '@angular/core';
import { RegisterUser } from 'src/models/register.model';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private register:HttpRequestService) { }

  createNewUser(user:Object){
    return this.register.register('register',user)
  }

  findUser(email:string){
    return this.register.findUser('oneuser/?emailId='+email)
  }
}
