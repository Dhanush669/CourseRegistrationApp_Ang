import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { RegisterUser } from 'src/models/register.model';
import { RegisterHelper } from 'src/models/register.helper';
import { Course } from 'src/models/course.helper';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, retry } from 'rxjs';

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

  // ------- courses -------
  enrollCourse(uri:string,header:HttpHeaders,payload:Object){
    return this.http.patch(`${this.url}/${uri}`,payload,{responseType:"text",headers:header});
  }

  getAllCourses(uri:string,header:HttpHeaders){
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header},).pipe(
      catchError(this.handleError)
    );
  }

  getOneCourse(uri:string,header:HttpHeaders){
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header});
  }

  filterCourse(uri:string,header:HttpHeaders){
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header});
  }

  filterCourseSub(uri:string,header:HttpHeaders){
    return this.http.get<Course>(`${this.courseurl}/${uri}`,{responseType:"json",headers:header});
  }

  //----------- auth ------------
  validateUser(uri:string){

    return this.http.get(`${this.url}/${uri}`,{responseType:"text"})

  }

  getAccessToken(){
    let ref_token=localStorage.getItem("TOKEN")
    localStorage.clear()
    this.http.get(`${this.url}/getToken/?refreshToken:${ref_token?.split(' ')[2]}`).subscribe((res:any)=>{
        localStorage.setItem("TOKEN",res);
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      if(error.error.text==="IV_JWT"){
        alert("jwt Expired")
      }
      console.error(
        `Backend returned code ${error.status}, text was: `, error.error.text);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
