import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router:Router,private userState:UserService){}
  ngOnInit(): void {
    const role=this.userState.getRole()
    localStorage.setItem("IS_LOGGEDIN","NO")
    // if(role==="no"){
    //   localStorage.setItem("IS_LOGGEDIN","NO")
    //   this.router.navigate(['/login'])
    // }
    // else{
    //   localStorage.setItem("IS_LOGGEDIN",role)
    //   if(role==="admin"){
    //     this.router.navigate(['/adminHome'])
    //   }
    //   else{
    //     this.router.navigate(['/home'])
    //   }
    // }
  }
}
