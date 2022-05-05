import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/models/course.helper';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  course!:Course
  token!:string
  headers!:HttpHeaders

  constructor(private courses:HttpRequestService) { 
    this.token=localStorage.getItem("TOKEN")||''
    this.headers = new HttpHeaders({
      'Authorization': this.token });
  }

  getAllCourse(){
    //const token=localStorage.getItem("TOKEN")||''
    // let headers = new HttpHeaders({
    //   'Authorization': token });
    console.log(this.token);
    
    return this.courses.getAllCourses("getAllCourses",this.headers);
  }

  enrollCourse(body:Object){
  // let  body={
  //     "emailId":user
  //   }
    return this.courses.enrollCourse("update/enrollmentdetails",this.headers,body)
  }

  searchOneCourse(course:string){
    return this.courses.getOneCourse("getByName/?name="+course,this.headers);

  }

  filterCourse(filter:string){
    return this.courses.filterCourse("filterByCategory/?category="+filter,this.headers);
  }

  filterCourseSub(filter:string){
    return this.courses.filterCourseSub("filterBySubCategory/?sub_category="+filter,this.headers);
  }

  setUpCourse(selected:Course){
    this.course=selected
  }

  getSelectedCourse(){
    return this.course
  }


}
