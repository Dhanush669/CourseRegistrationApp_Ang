import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { TostNotificationService } from 'src/app/services/tost-notification.service';
import { User } from 'src/models/user.helper';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allUsers:User[]=[]

  constructor(private adminHttp:AdminService,private course:CourseService,private route:Router, private auth:AuthService,private toast:TostNotificationService) { }

  ngOnInit(): void {
    this.adminHttp.showAllUsers().subscribe({
      next:(response)=>{
        
        this.allUsers=response.filter((curUser:User)=>{
          return curUser.role!=="admin"
        })

      },
      error:(error)=>{
        console.log("insideeeeee "+error);
        if(error==="IV_JWT"){
        this.course.getToken().subscribe({next:(res:any)=>{
          localStorage.removeItem("TOKEN")
          localStorage.removeItem("Login_Status")
          if(res==="jwt expired"){
            this.route.navigate(['/login'])
            localStorage.clear()
            this.auth.Logout()
            this.course.removeToken()
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

  makeAdmin(userName:string){
    this.adminHttp.makeAdmin(userName).subscribe({
      next:(response)=>{
        this.toast.showSuccess("Admin Done")
      },
      error:(error)=>{
        console.log("insideeeeee "+error);
        if(error==="IV_JWT"){
        this.course.getToken().subscribe({next:(res:any)=>{
          localStorage.removeItem("TOKEN")
          localStorage.removeItem("Login_Status")
          if(res==="jwt expired"){
            this.route.navigate(['/login'])
            localStorage.clear()
            this.auth.Logout()
            this.course.removeToken()
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
