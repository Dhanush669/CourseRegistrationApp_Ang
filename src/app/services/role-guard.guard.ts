import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  constructor(private userAuth:UserService,private route:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data['expectedRole'];
      const role=this.userAuth.getRole()
      if(role===expectedRole || role==="support"){
        return true
      }
      alert("unauthorised user") 
      if(this.userAuth.isValidUser()){
      this.route.navigate(["/home"])
      }
      else{
        this.route.navigate(['/login'])
      }
      return false
  }
  
}
