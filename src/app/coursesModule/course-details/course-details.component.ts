import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/models/course.helper';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!:Course
  constructor(private selected:CourseService,private router:Router) {
   }

  ngOnInit(): void {
    this.course=this.selected.getSelectedCourse();
  }

  enroll(){
    // this.router.navigate(['/login'])
    let body={
      "emailId":localStorage.getItem("USER_NAME")
    }
    this.selected.enrollCourse(body).subscribe((res)=>{
      console.log(res);
      
    })
  }

}
