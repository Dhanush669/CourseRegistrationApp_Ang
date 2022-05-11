import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/models/course.helper';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  
  courses:Course[]=[]
  allCourses:Course[]=[]
  allSubCategory:Course[]=[]
  filterCategory:Course[]=[]
  filterSubCategory:Course[]=[]
  categories:string[]=["All","Development","DSA","Testing","Bootcamp","Ago/DSA","Database","Interview Prepration"]
  subCategories:string[]=["Select","All","Mobile Development","Web Development","UI/UX","Fontend","Backend"]
  filter:string=""
  
  constructor(private course:CourseService,private route:Router,private auth:AuthService) { }
  search:string=""
  ngOnInit(): void {
    this.course.getAllCourse().subscribe({
      next:(response:any)=>{
    
      for(let i=0;i<response.length;i++){
        this.courses.push(response[i])
      }
      this.allCourses=this.courses
      
    },
    error:(error)=>{
      console.log(error);
      
      //console.log(error.error.text);
      this.course.getToken().subscribe({next:(res:any)=>{
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("Login_Status")
        if(res==="jwt expired"){
          this.route.navigate(['/login'])
          this.auth.Logout()
          this.course.removeToken()
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
  
  }

  searchCourse(){
    if(this.search===""){
      alert("please type something to search..!")
      return
    }
    
    this.course.searchOneCourse(this.search).subscribe({
      next:(response:any)=>{
      
      
      this.courses=[]
      for(let i=0;i<response.length;i++){
        this.courses.push(response[i])
      }
      
      
    },
    error:(error)=>{
      //console.log(error.error.text);
      this.course.getToken().subscribe({next:(res:any)=>{
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("Login_Status")
        if(res==="jwt expired"){
          this.route.navigate(['/login'])
          localStorage.clear()
          this.auth.Logout()
          this.course.removeToken()
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
  }

  onChange(search:string){
    const filter:string=search

    if(filter==="Select"){
      return
    }
    if(filter==="All"){
      this.courses=this.allCourses
      return
    }
    this.courses=[]
  //   this.course.filterCourse(filter).subscribe({
  //     next:(response:any)=>{ 
  //     console.log(response);
      
  //       this.courses=[]
  //       for(let i=0;i<response.length;i++){
  //         this.courses.push(response[i])
  //       }
  //       this.allSubCategory=this.courses
  //   },
  //   error:(error)=>{
  //     //console.log(error.error.text);
  //     this.course.getToken().subscribe({next:(res:any)=>{
  //       localStorage.removeItem("TOKEN")
  //       localStorage.removeItem("Login_Status")
  //       if(res==="jwt expired"){
  //         this.route.navigate(['/login'])
  //         localStorage.clear()
  //         this.auth.Logout()
  //         this.course.removeToken()
  //         return
  //       }
  //       let response=JSON.parse(res)
  //       let token=response.token
  //       let role=response.role
  //       localStorage.setItem("TOKEN",token);
  //       localStorage.setItem("Login_Status",role);
  //       console.log(" "+role);
  //       window.location.reload()
  //     }});
      
  //   }
  // })
    this.courses=this.allCourses.filter((fcourse:Course)=>{
      return fcourse.category===search
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
      this.courses=[]
  //     console.log(filter);
      
  //   this.course.filterCourseSub(filter).subscribe({
  //     next:(response:any)=>{
  //       this.courses=[]
  //       for(let i=0;i<response.length;i++){
  //         this.courses.push(response[i])
  //       }
  //   },
  //   error:(error)=>{
  //     //console.log(error.error.text);
  //     this.course.getToken().subscribe({next:(res:any)=>{
  //       localStorage.removeItem("TOKEN")
  //       localStorage.removeItem("Login_Status")
  //       if(res==="jwt expired"){
  //         this.route.navigate(['/login'])
  //         this.auth.Logout()
  //         localStorage.clear()
          
  //         this.course.removeToken().subscribe((res)=>{
          
  //         })
  //         return
  //       }
  //       let response=JSON.parse(res)
  //       let token=response.token
  //       let role=response.role
  //       localStorage.setItem("TOKEN",token);
  //       localStorage.setItem("Login_Status",role);
  //       console.log(" "+role);
        
  //       //this.route.navigate(['/home'])
  //       window.location.reload()
  //     }});
      
  //   }
  // })

      this.courses=this.allCourses.filter((fcourse:Course)=>{
        return fcourse.sub_category===filter
      })
  }

  }

  showOverview(courseName:Course){
    //console.log(courseName);
    
    //this.course.setUpCourse(courseName)
    this.route.navigate(['/courseDetails',{name:courseName.name}])
  }

  



}
