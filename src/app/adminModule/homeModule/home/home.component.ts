import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { TostNotificationService } from 'src/app/services/tost-notification.service';
import { Course } from 'src/models/course.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses:Course[]=[]
  allCourses:Course[]=[]
  allSubCategory:Course[]=[]
  categories:string[]=["Select","All"]
  subCategories:string[]=["Select","All"]
  
  constructor(private httpCourse:CourseService,private route:Router, private auth:AuthService,private toast:TostNotificationService) { }
  searchTxt:string=""

  ngOnInit(): void {
    this.httpCourse.getAllCourse().subscribe({
      next:(response:any)=>{
    
      for(let i=0;i<response.length;i++){
        this.courses.push(response[i])
      }
      this.allCourses=this.courses
      //this.toast.showSuccess("Welcome")
      
    },
    error:(error)=>{
      console.log(error);
      
      //console.log(error.error.text);
      this.httpCourse.getToken().subscribe({next:(res:any)=>{
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("Login_Status")
        if(res==="jwt expired"){
          this.route.navigate(['/login'])
          this.auth.Logout()
          this.httpCourse.removeToken()
          localStorage.clear()
          return
        }
        let response=JSON.parse(res)
        let token=response.token
        let role=response.role
        localStorage.setItem("TOKEN",token);
        localStorage.setItem("Login_Status",role);
        console.log(" "+role);
        
        //this.route.navigate(['/home'])
        window.location.reload()
      }});
      
    }
  })
  this.httpCourse.getAllCategory().subscribe({
    next:(response)=>{
      for(let i=0;i<response.length;i++){
        console.log(response[i]);
        
        this.categories.push(response[i])
      }
    }
})

this.httpCourse.getAllSubCategory().subscribe(
  {
    next:(response)=>{
      for(let i=0;i<response.length;i++){
        this.subCategories.push(response[i])
      }
    }
  }
)
  } 

  searchCourse(search:string){
    if(search===""){
      alert("please type something to search..!")
      return
    }

    this.courses=this.allCourses.filter((fcourse:Course)=>{
      let curCourse=fcourse.name.toLowerCase()
      return curCourse.includes(search.toLowerCase())
    })
  }

  overView(courseName:string){
    this.route.navigate(['/courseDetails',{name:courseName}])
  }

  onChange(event:Event){
    const filter:string=(event.target as HTMLInputElement).value

    if(filter==="Select"){
      return
    }
    if(filter==="All"){
      this.courses=this.allCourses
      return
    }
    this.courses=this.allCourses.filter((fcourse:Course)=>{
      return fcourse.category===filter
    })
    this.allSubCategory=this.courses
  }

  onChangeSub(event:Event){
    const filter:string=(event.target as HTMLInputElement).value
    if(filter==="Select"){
      return
    }
    if(filter==="All"){
      this.courses=this.allSubCategory
    }
    else{
      this.courses=this.allCourses.filter((fcourse:Course)=>{
        return fcourse.sub_category===filter
      })
  }

  }

}
