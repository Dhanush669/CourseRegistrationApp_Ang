import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/models/course.helper';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!:Course
  constructor(private selected:CourseService,private router:Router,private auth:AuthService) {
   }

  ngOnInit(): void {
    this.course=this.selected.getSelectedCourse();
  }

  enroll(){
    let body={
      "courses_Enrolled":{"name":this.course.name,"img_thumbnai":this.course.img_thumbnai}
    }
    this.selected.enrollCourse(body).subscribe({
      next:(res)=>{
      alert("Sucessfully enrolled the course "+this.course.name)
      this.router.navigate(['/courses'])
      
    },
    error:(error)=>{
      //console.log(error.error.text);
      this.selected.getToken().subscribe({next:(res:any)=>{
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("Login_Status")
        if(res==="jwt expired"){
          this.router.navigate(['/login'])
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
        window.location.reload()
    }});
      
    }
  })
  }

}
