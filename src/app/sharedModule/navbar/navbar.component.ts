import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TostNotificationService } from 'src/app/services/tost-notification.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isSmaller:boolean=false
  //isLoggedIn!:string
  constructor(public auth:AuthService,private router:Router,private toast:TostNotificationService) { 
   // this.isLoggedIn=this.auth.isLoggedIn;
  }
  

  ngOnInit(): void {

  }

  goToHome(){
    this.router.navigate(['/home'])
  }

  goToHomeAdmin(){
    this.router.navigate(['/adminHome'])
  }

  logout(){
    this.auth.Logout()
    localStorage.clear()
    this.toast.showSuccess("Logging out")
    this.router.navigate(['/login'])
  }

  showMenu(){
    if(this.isSmaller){
    this.isSmaller=false
    }
    else{
      this.isSmaller=true
    }
  }

  hide(){
    this.isSmaller=false
  }


}
