import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn!:string
  token!:string
  constructor(private auth:HttpRequestService) { 
      //this.isLoggedIn=localStorage.getItem("Login_Status")||"no"
      this.token=localStorage.getItem("TOKEN")||'no'
      if(this.token==='no'){
        this.isLoggedIn='no'
      }
      else{
        let obj:any=atob(this.token.split('.')[1]);
        obj=JSON.parse(obj)
        this.isLoggedIn=obj.user.role
      }
  }

  setToken(){
    this.token=localStorage.getItem("TOKEN")||'no'
  }

  validate(){
    const uri=localStorage.getItem("TOKEN");
    
  }

  Login(){
    //this.isLoggedIn=localStorage.getItem("Login_Status")||"no"
    this.setToken()
    if(this.token==='no'){
      this.isLoggedIn='no'
      
    }
    else{
      let obj:any=atob(this.token.split('.')[1]);
      obj=JSON.parse(obj)
      this.isLoggedIn=obj.user.role
      
    }
  }

  Logout(){
    this.auth.removeToken().subscribe((res)=>{
          
    })
    localStorage.clear()
    this.isLoggedIn="no"
  }
}
