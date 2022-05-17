import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  token!:string
  header!:HttpHeaders
  constructor(private adminHttp:HttpRequestService) { }

  setHeader(){
    this.token=localStorage.getItem("TOKEN")||''
    this.header = new HttpHeaders({
      'Authorization': this.token });
  }

  deleteCourse(courseName:string){
    this.setHeader()
    let uri="deleteCourse/?name="+courseName
    return this.adminHttp.deleteCourse(uri,this.header)
  }

  addCourse(newCourse:Object){
    this.setHeader()
    let uri="create"
    return this.adminHttp.addCourse(uri,this.header,newCourse)
  }

  updateCourse(updateCourse:Object){
    this.setHeader()
    let uri="updateCourse"
    return this.adminHttp.updateCourse(uri,this.header,updateCourse)
  }

  showAllUsers(){
    this.setHeader()
    let uri="allUsers"
    return this.adminHttp.showAllUsers(uri,this.header)
  }

  makeAdmin(userName:string){
    this.setHeader()
    let uri="makeAdmin"
    let body={ 
      "emailId":userName
    }
    return this.adminHttp.makeAdmin(uri,this.header,body)
  }

  addCategory(newCategory:string){
    this.setHeader()
    let uri="addCategory"
    let body={
      "category":newCategory
    }

    return this.adminHttp.addCategory(uri,this.header,body)

  }

  addSubCategory(newSubCategory:string){
    this.setHeader()
    let uri="addSubCategory"
    let body={
      "subCategory":newSubCategory
    }
    return this.adminHttp.addSubCategory(uri,this.header,body)
  }

  getAllCategory(){
    this.setHeader()
    let uri="allCategory"
    return this.adminHttp.getAllCategory(uri,this.header)
  }

  getAllSubCategory(){
    this.setHeader()
    let uri="allSubCategory"
    return this.adminHttp.getAllCategory(uri,this.header)
  }

}
