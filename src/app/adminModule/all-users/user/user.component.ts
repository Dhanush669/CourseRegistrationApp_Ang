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
  isNotChanged:boolean=true
  filtered:User[]=[]

  constructor(private adminHttp:AdminService,private course:CourseService,private route:Router, private auth:AuthService,private toast:TostNotificationService) { }

  ngOnInit(): void {
    this.adminHttp.showAllUsers().subscribe({
      next:(response)=>{
        
        this.filtered=response.filter((curUser:User)=>{
          return curUser.role==="user"
        })

         this.allUsers=response
         

      },
      error:(error)=>{
        console.log(error);
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
          console.log(res);
          
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
      else if(error.text==="unauthorised user"){
        this.toast.showError("Unauthorised route")
        this.route.navigate(['/adminHome'])
      }
      else{
        this.toast.showError("something went wrong please try again later")
      } 
      }
    })
  }

  makeAdmin(userName:string,role:string){
    this.adminHttp.makeAdmin(userName,role).subscribe({
      next:(response)=>{
        this.toast.showSuccess("Admin Done")
        window.location.reload()
      },
      error:(error)=>{
        console.log(error);
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

  onChange(role:string){
    this.isNotChanged=false
    this.filtered=this.allUsers.filter((curUser:User)=>{
      return curUser.role===role
    })
  }

}
