import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
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
  topCourses:Course[]=[]
  totalEnrollments!:string
  totalStudents!:string
  totalCourses!:string
  income!:string

  constructor(private adminHttp:AdminService,private httpCourse:CourseService,private route:Router, private auth:AuthService,private toast:TostNotificationService) { }
  searchTxt:string=""

  ngOnInit(): void {

    this.httpCourse.getAllCourse().subscribe({
      next:(response:any)=>{
      let tot_enrollments=0
      let tot_income=0
      let tot_hours=0
      for(let i=0;i<response.length;i++){
        this.courses.push(response[i])
        tot_enrollments+=Number(response[i].no_of_enrollments)
        tot_income+=tot_enrollments*Number(response[i].price)
        
      }
      this.totalEnrollments=""+tot_enrollments
      this.income=""+tot_income
      this.allCourses=this.courses
      this.totalCourses=""+this.courses.length
      this.topCourses =  this.allCourses.sort((course1, course2) => (course1.no_of_enrollments > course2.no_of_enrollments ? -1 : 1));
      this.topCourses=this.topCourses.slice(0,3)
      console.log(this.topCourses);
    },
    error:(error)=>{
      console.log(error);
      
    
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

  this.adminHttp.showAllUsers().subscribe({
    next:(res)=>{
      let tot_stud=0
      for(let i=0;i<res.length;i++){
        if(res[i].role==="user"){
          tot_stud++
        }
      }
      this.totalStudents=""+tot_stud
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
