
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { TostNotificationService } from 'src/app/services/tost-notification.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category:string=""
  subcategory:string=""
  categoryList:string[]=[]
  subCategoryList:string[]=[]
  constructor(private adminHttp:AdminService,private httpCourse:CourseService,private route:Router,private auth:AuthService,private toast:TostNotificationService) { }

  ngOnInit(): void {
    this.adminHttp.getAllCategory().subscribe({
      next:(response)=>{
        this.categoryList=response
      },
      error:(error)=>{
        console.log("insideeeeee "+error);
        if(error==="IV_JWT"){
        this.httpCourse.getToken().subscribe({next:(res:any)=>{
          localStorage.removeItem("TOKEN")
          localStorage.removeItem("Login_Status")
          if(res==="jwt expired"){
            this.route.navigate(['/login'])
            localStorage.clear()
            this.auth.Logout()
            this.httpCourse.removeToken()
            return
          }
          let response=JSON.parse(res)
          let token=response.token
          let role=response.role
          localStorage.setItem("TOKEN",token);
          localStorage.setItem("Login_Status",role);
          console.log(" "+role);
          
          //this.route.navigate(['/home'])
          //window.location.reload()
          alert("sorry try again")
        }});
      }
      else{
        alert("something went wrong please try again later")
      }
    }
    })

    this.adminHttp.getAllSubCategory().subscribe({
      next:(response)=>{
        this.subCategoryList=response
      },
      error:(error)=>{
        console.log("insideeeeee "+error);
        if(error==="IV_JWT"){
        this.httpCourse.getToken().subscribe({next:(res:any)=>{
          localStorage.removeItem("TOKEN")
          localStorage.removeItem("Login_Status")
          if(res==="jwt expired"){
            this.route.navigate(['/login'])
            localStorage.clear()
            this.auth.Logout()
            this.httpCourse.removeToken()
            return
          }
          let response=JSON.parse(res)
          let token=response.token
          let role=response.role
          localStorage.setItem("TOKEN",token);
          localStorage.setItem("Login_Status",role);
          console.log(" "+role);
          
          //this.route.navigate(['/home'])
          //window.location.reload()
          this.toast.showError("please try again")
        }});
      }
      else{
        this.toast.showError("something went wrong please try again later")
      }
    }
    })
  }

  addCategory(){
    if(this.category!==""){
    this.adminHttp.addCategory(this.category).subscribe({
      next:(response)=>{
        alert(response)
        this.category=""
        if(this.subcategory!==""){
          this.adminHttp.addSubCategory(this.subcategory).subscribe({
            next:(response)=>{
              alert(response)
              this.subcategory=""
            },
          })
          this.toast.showSuccess("Categories added Successfully")
          window.location.reload()
          return 
        }
      },
      error:(error)=>{
        console.log("insideeeeee "+error);
        if(error==="IV_JWT"){
        this.httpCourse.getToken().subscribe({next:(res:any)=>{
          localStorage.removeItem("TOKEN")
          localStorage.removeItem("Login_Status")
          if(res==="jwt expired"){
            this.route.navigate(['/login'])
            localStorage.clear()
            this.auth.Logout()
            this.httpCourse.removeToken()
            return
          }
          let response=JSON.parse(res)
          let token=response.token
          let role=response.role
          localStorage.setItem("TOKEN",token);
          localStorage.setItem("Login_Status",role);
          console.log(" "+role);
          
          //this.route.navigate(['/home'])
          //window.location.reload()
          this.toast.showError("please try again")
        }});
      }
      else{
        this.toast.showError("something went wrong please try again later")
      }
    }

    })
    }
    else if(this.category==="" && this.subcategory!==""){
      this.adminHttp.addSubCategory(this.subcategory).subscribe({
        next:(response)=>{
          alert(response)
          this.subcategory=""
          this.toast.showSuccess("SubCategory added successfully")
          window.location.reload()
        },
        error:(error)=>{
          console.log("insideeeeee "+error);
          if(error==="IV_JWT"){
          this.httpCourse.getToken().subscribe({next:(res:any)=>{
            localStorage.removeItem("TOKEN")
            localStorage.removeItem("Login_Status")
            if(res==="jwt expired"){
              this.route.navigate(['/login'])
              localStorage.clear()
              this.auth.Logout()
              this.httpCourse.removeToken()
              return
            }
            let response=JSON.parse(res)
            let token=response.token
            let role=response.role
            localStorage.setItem("TOKEN",token);
            localStorage.setItem("Login_Status",role);
            console.log(" "+role);
            
            //this.route.navigate(['/home'])
            //window.location.reload()
            this.toast.showError("sorry try again")
          }});
        }
        else{
          this.toast.showError("something went wrong please try again later")
        }
      }
      })
    }

    else{
    this.toast.showError("some fields are missing")
    }

  }

}
