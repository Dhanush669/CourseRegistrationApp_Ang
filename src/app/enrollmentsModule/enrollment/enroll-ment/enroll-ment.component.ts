import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/models/course.helper';

@Component({
  selector: 'app-enroll-ment',
  templateUrl: './enroll-ment.component.html',
  styleUrls: ['./enroll-ment.component.css']
})
export class EnrollMentComponent implements OnInit {
  enrollments:Course[]=[]
  constructor(private user:UserService,private route:Router,private course:CourseService,private auth:AuthService) { }

  ngOnInit(): void {
    this.user.getMyEnrollments().subscribe({
      next:(response)=>{
        let arr=response.courses_Enrolled
        console.log(arr);
        
        for(let i=1;i<arr.length;i++){
          console.log(arr[i]);
          
          this.enrollments.push(JSON.parse(arr[i]))
        }
      },
      error:(error)=>{
        //console.log(error.error.text);
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
    })
  }
}
