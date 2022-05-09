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

  // ---------- user -----------
  getMyEnrollments(uri:string,header:HttpHeaders):Observable<User>{
      return this.http.get<User>(`${this.url}/${uri}`,{responseType:"json",headers:header})
  }

  // ------- courses -------
  enrollCourse(uri:string,header:HttpHeaders,payload:Object):Observable<string>{
    return this.http.patch(`${this.url}/${uri}`,payload,{responseType:"text",headers:header});
  }

  increaseEnrollmentCount(uri:string,header:HttpHeaders,payload:Object){
    return this.http.patch(`${this.courseurl}//${uri}`,payload,{responseType:"text",headers:header});
    //return this.http.patch("http://localhost:9000/course/update/enrollment",payload,{responseType:"text",headers:header})
  }

  getAllCourses(uri:string,header:HttpHeaders):Observable<Course>{
     return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header},)
    //.pipe(
    //   catchError(this.handleError)
    // );
  }

  getSelectedCourse(uri:string,header:HttpHeaders):Observable<Course>{
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header});
  }

  getOneCourse(uri:string,header:HttpHeaders):Observable<Course>{
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header});
  }

  filterCourse(uri:string,header:HttpHeaders):Observable<Course>{
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header});
  }

  filterCourseSub(uri:string,header:HttpHeaders):Observable<Course>{
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header});
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

  
 

}
