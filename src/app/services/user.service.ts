import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/models/course.helper';
import { HttpRequestService } from './http-request.service';

function getWindows():any{
  return window
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  giveWindow(){
    return getWindows()
  }

  constructor(private httpService:HttpRequestService) { }

  getMyEnrollments() {
    let token=localStorage.getItem("TOKEN")||''
    let headers = new HttpHeaders({
      'Authorization': token });
    return this.httpService.getMyEnrollments("myEnrollments")
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

  getDetails(email:string){
    const uri="getDetails/?email="+email
    return this.httpService.getDetails(uri);
  }

  findOneUser(){
    let token=localStorage.getItem("TOKEN")||''
    let headers = new HttpHeaders({
      'Authorization': token });
    let uri="findUser"
    return this.httpService.getOneUser(uri)
  }

  findHim(uid:string){
    let token=localStorage.getItem("TOKEN")||''
    let headers = new HttpHeaders({
      'Authorization': token });
      let uri="findHim/?uid="+uid
      return this.httpService.findHim(uri)
  }

  updateUser(body:Object){
    let token=localStorage.getItem("TOKEN")||''
    let headers = new HttpHeaders({
      'Authorization': token });
      let uri="update/userdetails"
      return this.httpService.updateUser(uri,body)
  }

  sendOTP(phno:string){
    const uri="sendOTP/?phno="+phno
    return this.httpService.sendOTP(uri)
  }

  verifyOtp(phno:string,code:string){
    const uri="verifyOtp/?phno="+phno+"&otp="+code
    return this.httpService.verifyOtp(uri)
  }

  resetPassword(body:Object){
    const uri="resetPassword"
    return this.httpService.resetPassowrd(uri,body)
  }

}
