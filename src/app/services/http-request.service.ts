import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { RegisterUser } from 'src/models/register.model';
import { RegisterHelper } from 'src/models/register.helper';
import { Course } from 'src/models/course.helper';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, Observable, retry } from 'rxjs';
import { User } from 'src/models/user.helper';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  url:string='http://localhost:9000/user'
  courseurl:string='http://localhost:9000/course'
  constructor(private http: HttpClient) { }

  // get(uri: string) {
  //   return this.http.get(`${this.url}/${uri}`);
  // }

  //-------- register -----------
  register(uri:string,payload:Object){
    return this.http.post(`${this.url}/${uri}`,payload,{responseType:"text"});
  }
 
  findUser(uri:string){
    return this.http.get(`${this.url}/${uri}`,{responseType:"text"});
  }

  //------ login -----------
  login(uri:string,payload:Object){
    return this.http.post(`${this.url}/${uri}`,payload,{responseType:"text"});
  }

  googleSignin(){
    console.log("daiii vaa faa");
    
    return this.http.get(`http://localhost:9000/user/auth/google`,{responseType:"text"})
  }

  // ---------- user -----------
  getMyEnrollments(uri:string):Observable<Course[]>{
      return this.http.get<Course[]>(`${this.url}/${uri}`,{responseType:"json"})
  }

  getOneUser(uri:string):Observable<User>{
    return this.http.get<User>(`${this.url}/${uri}`,{responseType:"json"})
  }

  findHim(uri:string):Observable<Object>{
    return this.http.get<Object>(`${this.url}/${uri}`,{responseType:"json"})
  }

  updateUser(uri:string,body:Object){
    return this.http.patch(`${this.url}/${uri}`,body,{responseType:"text"})
  }

  sendOTP(uri:string){
    return this.http.get(`${this.url}/${uri}`,{responseType:"text"})
  }

  verifyOtp(uri:string){
    return this.http.get(`${this.url}/${uri}`,{responseType:"text"})
  }

  getDetails(uri:string){
    return this.http.get<User>(`${this.url}/${uri}`,{responseType:"json"})
  }

  resetPassowrd(uri:string,body:Object){
    return this.http.patch(`${this.url}/${uri}`,body,{responseType:"text"})
  }

  // ------- courses -------
  enrollCourse(uri:string,payload:Object):Observable<string>{
    return this.http.patch(`${this.url}/${uri}`,payload,{responseType:"text"});
  }

  increaseEnrollmentCount(uri:string,payload:Object){
    return this.http.patch(`${this.courseurl}//${uri}`,payload,{responseType:"text"});
    //return this.http.patch("http://localhost:9000/course/update/enrollment",payload,{responseType:"text",headers:header})
  }

  getAllCourses(uri:string):Observable<Course>{
     return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json"},)
    //.pipe(
    //   catchError(this.handleError)
    // );
  }

  getSelectedCourse(uri:string):Observable<Course>{
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json"});
  }

  searchCourses(uri:string):Observable<Course>{
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json"});
  }

  filterCourse(uri:string):Observable<Course>{
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json"});
  }

  filterCourseSub(uri:string):Observable<Course>{
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json"});
  }

  addComment(uri:string,payload:Object):Observable<string>{
    return this.http.patch(`${this.courseurl}/${uri}`,payload,{responseType:"text"});
  }

  getSyllabus(uri:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.courseurl}/${uri}`,{responseType:"json"})
  }

  getComments(uri:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.courseurl}/${uri}`,{responseType:"json"})
  }

  paymentOerder(uri:string,body:Object):Observable<Object>{
    return this.http.post<Object>(`${this.url}/${uri}`,body,{responseType:"json"})
  }

  verifyPayment(uri:string,body:Object){
      return this.http.post(`${this.url}/${uri}`,body,{responseType:"text"})
  }

  //----------- auth ------------
  validateUser(uri:string){

    return this.http.get(`${this.url}/${uri}`,{responseType:"text"})

  }

  getAccessToken(){
    let ref_token=localStorage.getItem("TOKEN")
    
    ref_token=ref_token?.split(' ')[2]||''
    
    return this.http.get(`${this.url}/getToken/?refreshToken=${ref_token}`,{responseType:"text"})
  }

  removeToken(){
    let ref_token=localStorage.getItem("TOKEN")
  
    ref_token=ref_token?.split(' ')[2]||''
    
    return this.http.delete(`${this.url}/removeToken/?refreshToken=${ref_token}`,{responseType:"text"})
  }

  //------------- admin---------
  deleteCourse(uri:string):Observable<string>{
    return this.http.delete(`${this.courseurl}/${uri}`,{responseType:"text"})
  }

  addCourse(uri:string,body:Object):Observable<string>{
    return this.http.post(`${this.courseurl}/${uri}`,body,{responseType:"text"})
  }

  updateCourse(uri:string,body:Object):Observable<string>{
    return this.http.patch(`${this.courseurl}/${uri}`,body,{responseType:"text"})
  }

  showAllUsers(uri:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/${uri}`,{responseType:"json"})
  }

  makeAdmin(uri:string,body:Object){
    return this.http.patch(`${this.url}/${uri}`,body,{responseType:"text"})
  }

  addCategory(uri:string,body:Object){
    return this.http.patch(`${this.courseurl}/${uri}`,body,{responseType:"text"})
  }

  addSubCategory(uri:string,body:Object){
    return this.http.patch(`${this.courseurl}/${uri}`,body,{responseType:"text"})
  }

  getAllCategory(uri:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.courseurl}/${uri}`,{responseType:"json"})
  }

  getAllSubCategory(uri:string):Observable<string[]>{
    return this.http.get<string[]>(`${this.courseurl}/${uri}`,{responseType:"json"})
  }
 

}
