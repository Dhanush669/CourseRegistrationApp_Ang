import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Course } from 'src/models/course.helper';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  token!:string
  headers!:HttpHeaders

  constructor(private courses:HttpRequestService) { 
    // this.token=localStorage.getItem("TOKEN")||''
    // this.headers = new HttpHeaders({
    //   'Authorization': this.token });
  }

  getAllCourse(){
    this.token=localStorage.getItem("TOKEN")||''
    this.headers = new HttpHeaders({
      'Authorization': this.token });
    console.log(this.token);
    
    return this.courses.getAllCourses("getAllCourses",this.headers)
  }

  enrollCourse(body:Object){
  // let  body={
  //     "emailId":user
  //   }
  this.token=localStorage.getItem("TOKEN")||''
    this.headers = new HttpHeaders({
      'Authorization': this.token });
    return this.courses.enrollCourse("update/enrollmentdetails",this.headers,body)
  }

  increaseEnrollmentCount(payload:Object){
    this.headers = new HttpHeaders({
      'Authorization': this.token });
   
    return this.courses.increaseEnrollmentCount("update/enrollment",this.headers,payload)
  }

  searchOneCourse(course:string){
    this.token=localStorage.getItem("TOKEN")||''
    this.headers = new HttpHeaders({
      'Authorization': this.token });
    return this.courses.getOneCourse("getByName/?name="+course,this.headers);

  }

  filterCourse(filter:string){
    this.token=localStorage.getItem("TOKEN")||''
    this.headers = new HttpHeaders({
      'Authorization': this.token });
    return this.courses.filterCourse("filterByCategory/?category="+filter,this.headers);
  }

  filterCourseSub(filter:string){
    this.token=localStorage.getItem("TOKEN")||''
    this.headers = new HttpHeaders({
      'Authorization': this.token });
    return this.courses.filterCourseSub("filterBySubCategory/?sub_category="+filter,this.headers);
  }

  // setUpCourse(selected:Course){
  //   this.course=selected
  // }

  getSelectedCourse(courseName:string){
    this.token=localStorage.getItem("TOKEN")||''
    this.headers = new HttpHeaders({
      'Authorization': this.token });
    let uri= "getSelectedCourse/?name="+courseName
    return this.courses.getSelectedCourse(uri,this.headers)
  }

  getToken(){
    return this.courses.getAccessToken();
  }

  removeToken(){
    return this.courses.removeToken();
  }


}
