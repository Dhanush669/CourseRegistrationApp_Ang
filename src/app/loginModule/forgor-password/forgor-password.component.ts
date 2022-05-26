import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TostNotificationService } from 'src/app/services/tost-notification.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user.helper';

@Component({
  selector: 'app-forgor-password',
  templateUrl: './forgor-password.component.html',
  styleUrls: ['./forgor-password.component.css']
})
export class ForgorPasswordComponent implements OnInit {
  otp:string=""
  phno:string=""
  emailid:string=""
  exception:string=""
  Aexception:string=""
  user!:User
  isVerified:boolean=false
  password:string=""
  confirmPassword=""
  showResend:boolean=false
  isSendClicked:boolean=false
  timeLeft:number=50
  optSend:boolean=false
  interval!:any

  constructor(private rout:ActivatedRoute,private userService:UserService,private toast:TostNotificationService,private router:Router) { }

  ngOnInit(): void {
    this.emailid=this.rout.snapshot.paramMap.get('email')||''
    this.userService.getDetails(this.emailid).subscribe({
      next:(response)=>{
        this.user=response
        this.exception=""
        this.phno="+91********"+response.phno.slice(8,10)
        
      },error:(err)=>{
        this.user={
          firstName:"",
          lastName:"",
          emailId:this.emailid,
          password:"",
          phno:"",
          role:""

        }
        this.Aexception="no user found with this email id, please check your email id or create one!"
      }
    })
  }

  SendOTP(){
    this.exception=""
    this.startTimer()
    this.isSendClicked=true
    this.userService.sendOTP(this.user.phno).subscribe({
      next:(res)=>{
        this.optSend=true
        this.toast.showSuccess("OTP Sent")
      },error:(err)=>{
        this.toast.showError("something went wrong")
        this.exception=err
      }
    })
  }

  resend(){
    this.exception=""
    this.isSendClicked=true
    this.showResend=false
    this.timeLeft=50
    this.SendOTP()
  }

  startTimer() {
    
    
    this.interval= setInterval(() => { 
      console.log("called meeeee");
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.isSendClicked=false
        this.showResend=true
        clearInterval(this.interval)
      }
    },1000)
  }

  verify(){
    if(this.otp==="" || this.otp.length!=4){
      this.toast.showError("Please enter a valid otp!")
      return
    }
    
    return this.userService.verifyOtp(this.user.phno,this.otp).subscribe({
      next:(res)=>{
        
          this.isVerified=true
          this.toast.showSuccess("OTP verification Successfull")
        
      },error:(err)=>{
        
          this.exception="invalid opt"
        
      }
    })
    
  }

  resetPassword(){
    if(this.password!==this.confirmPassword){
      return
    }
    const body={
      "emailId":this.user.emailId,
      "password":this.password
    }
    console.log(body);
    
    this.userService.resetPassword(body).subscribe({
      next:(res)=>{
        this.toast.showSuccess("password updated Successfully")
        this.router.navigate(['/login'])
      },error:(err)=>{
        this.exception=err
      }
    })
  }

}
