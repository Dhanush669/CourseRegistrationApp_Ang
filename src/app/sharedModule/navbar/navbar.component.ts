import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //isLoggedIn!:string
  constructor(public auth:AuthService) { 
   // this.isLoggedIn=this.auth.isLoggedIn;
  }
  

  ngOnInit(): void {

    

  }

  logout(){
    
  }

  account(){

  }


}
