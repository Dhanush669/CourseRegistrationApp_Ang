import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/models/course.helper';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpRequestService) { }

  getMyEnrollments() {
    let token=localStorage.getItem("TOKEN")||''
    let headers = new HttpHeaders({
      'Authorization': token });
    return this.httpService.getMyEnrollments("myEnrollments",headers)
  }

  isValidUser(){
      let expiry = localStorage.getItem("Expiration_Time")||''
      // console.log(expiry);
      if(expiry===''){
        console.log("emp");
        return false
        
      }
      let expiryTime=Number(expiry)
      // console.log((Math.floor((new Date).getTime())) >= expiryTime);
      // console.log(new Date(expiryTime));
      
      return   expiryTime >= (Math.floor((new Date).getTime()))
  }

}
