import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterHelper } from 'src/models/register.helper';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fname:string=""
  lname:string=""
  email:string=""
  password:string=""
  phno:string=""
  confirmPassword:string=""
  exception:string=""
  isSuccessfull:boolean=false
  constructor(private register:RegisterService,private router:Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.register.findUser(this.email).subscribe((duplicate)=>{
      console.log("hey "+duplicate);
      
      if(duplicate==="true"){
        this.exception="user with this email already exist"
        return 
      }
      else{
        
        
      }
    })

    this.exception=""
        const newUser={"fname":this.fname,"lname":this.lname,"email":this.email,"password":this.password,"phno":this.phno}
        this.register.createNewUser(newUser).subscribe((Response)=>{
          console.log("yess in"+Response);
          
          this.isSuccessfull=true
        })
    
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
