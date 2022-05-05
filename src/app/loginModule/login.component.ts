import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { NavbarComponent } from '../sharedModule/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string=""
  password:string=""
  exception:string=""
  constructor(private login:LoginService,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
    //this.auth.Logout()
    const userCredentials={"emailId":this.email,"password":this.password}
    this.login.userLogin(userCredentials).subscribe((response)=>{
      console.log(response);
      
      if(response==="UNF"){
        this.exception="No user found with these credentials try again (or) Please Login..!"
      }
      else if(response=="WP"){
        this.exception="Incorrect Password. Try again..!"
      }
      else{
        console.log(response);
        this.exception=""
        localStorage.setItem("TOKEN",response);
        localStorage.setItem("USER_NAME",this.email)
        this.auth.Login()
        this.router.navigate(['/home']);
        
        
        
      }
    })
  }

}
