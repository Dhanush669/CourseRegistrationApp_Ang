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
    
    return this.courses.getAllCourses("getAllCourses")
  }

  getSyllabus(name:string){
    this.setHeader()

      let uri="getSyllabus/?name="+name
      return this.courses.getSyllabus(uri)
  }

  enrollCourse(body:Object){
  // let  body={
  //     "emailId":user
  //   }
  this.setHeader()
    return this.courses.enrollCourse("update/enrollmentdetails",body)
  }

  increaseEnrollmentCount(payload:Object){
    this.setHeader()
   
    return this.courses.increaseEnrollmentCount("update/enrollment",payload)
  }

  searchCourse(course:string){
    this.setHeader()
    return this.courses.searchCourses("getByName/?name="+course);

  }

  filterCourse(filter:string){
    this.setHeader()
    return this.courses.filterCourse("filterByCategory/?category="+filter);
  }

  filterCourseSub(filter:string){
    this.setHeader()
    return this.courses.filterCourseSub("filterBySubCategory/?sub_category="+filter);
  }

  // setUpCourse(selected:Course){
  //   this.course=selected
  // }

  getSelectedCourse(courseName:string){
    this.setHeader()
    let uri= "getSelectedCourse/?name="+courseName
    return this.courses.getSelectedCourse(uri)
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
    return this.courses.addComment(uri,payload)
  }

  getComments(courseName:string){
    this.setHeader()
    let uri="getComments/?name="+courseName
    return this.courses.getComments(uri)
  }

  getAllCategory(){
    this.setHeader()
    let uri="allCategory"
    return this.courses.getAllCategory(uri)
  }

  getAllSubCategory(){
    this.setHeader()
    let uri="allSubCategory"
    return this.courses.getAllCategory(uri)
  }

  getPaymentOrder(body:Object){
    const uri="orders"
    return this.courses.paymentOerder(uri,body)
  }

  verifyPayment(body:Object){
    const uri="verigyPayment"
    return this.courses.verifyPayment(uri,body)
  }


}
