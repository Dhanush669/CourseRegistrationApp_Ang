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

  getRole(){
    let token=localStorage.getItem("TOKEN")||''
    if(token===''){
      return "no"
    }
      let obj:any=atob(token.split('.')[1]);
      obj=JSON.parse(obj)
      return obj.user.role
  }

  findOneUser(){
    let token=localStorage.getItem("TOKEN")||''
    let headers = new HttpHeaders({
      'Authorization': token });
      let uri="findUser"
    return this.httpService.getOneUser(uri,headers)
  }

  findHim(uid:string){
    let token=localStorage.getItem("TOKEN")||''
    let headers = new HttpHeaders({
      'Authorization': token });
      let uri="findHim/?uid="+uid
      return this.httpService.findHim(uri,headers)
  }

  updateUser(body:Object){
    let token=localStorage.getItem("TOKEN")||''
    let headers = new HttpHeaders({
      'Authorization': token });
      let uri="update/userdetails"
      return this.httpService.updateUser(uri,headers,body)
  }

}
