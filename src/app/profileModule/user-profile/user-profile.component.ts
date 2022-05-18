import { fn } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { TostNotificationService } from 'src/app/services/tost-notification.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user.helper';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  fname:string=""
  phno:string=""
  email:string=""
  isOwner:boolean=true
  isUpdate:boolean=false
  curUser!:User
  enrollments:any[]=[]
  btn_text:string="Edit"
  
  constructor(private userService:UserService,private route:Router, private auth:AuthService,private rout:ActivatedRoute,private selected:CourseService,private toast:TostNotificationService) { }

  ngOnInit(): void {
    let user=this.rout.snapshot.paramMap.get('name')||''
    if(user===''){
      this.isOwner=true
      this.userService.findOneUser().subscribe({
        next:(response)=>{
          console.log(response+" hey my");
          this.curUser=response
          this.fname=this.curUser.firstName
          this.email=this.curUser.emailId
          this.phno=this.curUser.phno
        },
        error:(error)=>{
          console.log("insideeeeee "+error);
          if(error==="IV_JWT"){
          this.selected.getToken().subscribe({next:(res:any)=>{
            localStorage.removeItem("TOKEN")
            localStorage.removeItem("Login_Status")
            if(res==="jwt expired"){
              this.route.navigate(['/login'])
              localStorage.clear()
              this.auth.Logout()
              this.selected.removeToken()
              return
            }
            let response=JSON.parse(res)
            let token=response.token
            let role=response.role
            localStorage.setItem("TOKEN",token);
            localStorage.setItem("Login_Status",role);
            console.log(" "+role);
            
            //this.route.navigate(['/home'])
            window.location.reload()
          }});
        }
        else{
          this.toast.showError("something went wrong please try again later")
        }
        }
      })
      this.userService.getMyEnrollments().subscribe({
        next:(response)=>{
          let arr=response
        console.log(arr);
        
        for(let i=0;i<arr.length;i++){
          console.log(arr[i]);
          this.enrollments.push(arr[i])
        }
        }
      })
    }
    else{
      console.log(user);
      
      let obj:string=user
      this.isOwner=false
      this.userService.findHim(obj).subscribe({
        next:(res:any)=>{
          this.curUser=res.user
          let arr=res.enrollments
          console.log(arr);
        
        for(let i=0;i<arr.length;i++){
          console.log(arr[i]);
          this.enrollments.push(arr[i])
        }
        }
      })
    }
  }

  update(){
    if(this.isOwner && !this.isUpdate){
    this.isUpdate=true
    this.btn_text="Update"
    }
    else if(this.isOwner && this.isUpdate){
      this.isUpdate=false
      let body={
        "firstName":this.fname,
        "emailId":this.email,
        "phno":this.phno
      }
      this.userService.updateUser(body).subscribe({
        next:(res)=>{
          
          this.toast.showSuccess(res)
          window.location.reload()
        },
        error:(error)=>{
          console.log("insideeeeee "+error);
          if(error==="IV_JWT"){
          this.selected.getToken().subscribe({next:(res:any)=>{
            localStorage.removeItem("TOKEN")
            localStorage.removeItem("Login_Status")
            if(res==="jwt expired"){
              this.route.navigate(['/login'])
              localStorage.clear()
              this.auth.Logout()
              this.selected.removeToken()
              return
            }
            let response=JSON.parse(res)
            let token=response.token
            let role=response.role
            localStorage.setItem("TOKEN",token);
            localStorage.setItem("Login_Status",role);
            console.log(" "+role);
            
            //this.route.navigate(['/home'])
            window.location.reload()
          }});
        }
        else{
          this.toast.showError("something went wrong please try again later")
        }
        }
      })
    }
  }

  cancle(){
    this.isUpdate=false
    this.btn_text="Edit"
  }

}
