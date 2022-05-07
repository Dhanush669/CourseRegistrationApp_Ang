import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CourseService } from './course.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private userAuth:UserService,private route:Router,private course:CourseService,private auth:AuthService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.userAuth.isValidUser()){
        return true
      }
      //else{
        // this.course.getToken().subscribe({
        //   next:(res:any)=>{
        //     localStorage.removeItem("TOKEN")
        //     localStorage.removeItem("Login_Status")
        //     localStorage.removeItem("Expiration_Time")
        //     if(res==="jwt expired"){
        //       this.route.navigate(['/login'])
        //       localStorage.clear()
        //       this.auth.Logout()
        //       this.course.removeToken()
        //       return false
        //     }
        //     let response=JSON.parse(res)
        //     let token=response.token
        //     let role=response.role
        //     localStorage.setItem("TOKEN",token);
        //     localStorage.setItem("Login_Status",role);
        //     var currentDate = new Date();
        //     var futureDate = new Date(currentDate.getTime() + 30*60000);
        //     localStorage.setItem("Expiration_Time",""+futureDate.getTime())
        //     return true
        //   },
        // })

      //}
      localStorage.clear()
      this.auth.Logout()
      this.route.navigate(['/login'])
    return false;
  }
  
}
