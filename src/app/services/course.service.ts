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

  setHeader(){
    this.token=localStorage.getItem("TOKEN")||''
    this.headers = new HttpHeaders({ 
      'Authorization': this.token });
  }

  getAllCourse(){
    this.setHeader()
    console.log(this.token);
    
    return this.courses.getAllCourses("getAllCourses",this.headers)
  }

  getSyllabus(name:string){
    this.setHeader()

      let uri="getSyllabus/?name="+name
      return this.courses.getSyllabus(uri,this.headers)
  }

  enrollCourse(body:Object){
  // let  body={
  //     "emailId":user
  //   }
  this.setHeader()
    return this.courses.enrollCourse("update/enrollmentdetails",this.headers,body)
  }

  increaseEnrollmentCount(payload:Object){
    this.setHeader()
   
    return this.courses.increaseEnrollmentCount("update/enrollment",this.headers,payload)
  }

  searchCourse(course:string){
    this.setHeader()
    return this.courses.searchCourses("getByName/?name="+course,this.headers);

  }

  filterCourse(filter:string){
    this.setHeader()
    return this.courses.filterCourse("filterByCategory/?category="+filter,this.headers);
  }

  filterCourseSub(filter:string){
    this.setHeader()
    return this.courses.filterCourseSub("filterBySubCategory/?sub_category="+filter,this.headers);
  }

  // setUpCourse(selected:Course){
  //   this.course=selected
  // }

  getSelectedCourse(courseName:string){
    this.setHeader()
    let uri= "getSelectedCourse/?name="+courseName
    return this.courses.getSelectedCourse(uri,this.headers)
  }

  getToken(){
    return this.courses.getAccessToken();
  }

  removeToken(){
    return this.courses.removeToken();
  }

  addComments(payload:Object){
    this.setHeader()
    let uri= "addComment"
    return this.courses.addComment(uri,this.headers,payload)
  }

  getComments(courseName:string){
    this.setHeader()
    let uri="getComments/?name="+courseName
    return this.courses.getComments(uri,this.headers)
  }

  getAllCategory(){
    this.setHeader()
    let uri="allCategory"
    return this.courses.getAllCategory(uri,this.headers)
  }

  getAllSubCategory(){
    this.setHeader()
    let uri="allSubCategory"
    return this.courses.getAllCategory(uri,this.headers)
  }


}
