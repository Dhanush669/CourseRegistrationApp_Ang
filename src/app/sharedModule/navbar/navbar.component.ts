import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //isLoggedIn!:string
  constructor(public auth:AuthService,private router:Router) { 
   // this.isLoggedIn=this.auth.isLoggedIn;
  }
  

  ngOnInit(): void {

    

  }

  logout(){
    alert("are you sure!. You want to logout")
    localStorage.clear()
    this.auth.Logout()
    this.router.navigate(['/login'])

  }


}
