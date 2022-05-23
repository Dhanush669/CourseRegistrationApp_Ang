import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/models/course.helper';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { TostNotificationService } from '../services/tost-notification.service';


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
  categories:string[]=["All"]
  subCategories:string[]=["Select","All"]
  filter:string=""
  isLoaded:boolean=false
  
  constructor(private course:CourseService,private route:Router,private auth:AuthService,private toast:TostNotificationService) { }
  search:string=""
  ngOnInit(): void {
    // let tok=localStorage.getItem("TOKEN")||''
    // let c:any=atob(tok.split('.')[1])
    // console.log(JSON.parse(c).user.role);

    this.course.getAllCourse().subscribe({
      next:(response:any)=>{
    
      for(let i=0;i<response.length;i++){
        this.courses.push(response[i])
      }
      this.allCourses=this.courses
      
    },
    error:(error)=>{
      console.log("insideeeeee "+error);
      if(error==="IV_JWT"){
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
    else{
      this.toast.showError("something went wrong please try again later")
    }
    },
    complete:()=>{
      this.isLoaded=true
    }
  })

  this.course.getAllCategory().subscribe({
      next:(response)=>{
        for(let i=0;i<response.length;i++){
          console.log(response[i]);
          
          this.categories.push(response[i])
        }
      }
  })

  this.course.getAllSubCategory().subscribe(
    {
      next:(response)=>{
        for(let i=0;i<response.length;i++){
          this.subCategories.push(response[i])
        }
      }
    }
  )
  
  }

  ronChange(cate:Event){
    const filter:string=(cate.target as HTMLInputElement).value
    this.courses=[]
    this.courses=this.allCourses.filter((fcourse:Course)=>{
      return fcourse.category===filter
    })
    this.allSubCategory=this.courses
  }

  ronChangeSub(subCate:Event){
    const filter:string=(subCate.target as HTMLInputElement).value
    this.courses=[]
    this.courses=this.allCourses.filter((fcourse:Course)=>{
      return fcourse.sub_category===filter
    })
    //this.allSubCategory=this.courses
  }

  searchCourse(){
    if(this.search===""){
      alert("please type something to search..!")
      return
    }
    
  //   this.course.searchCourse(this.search).subscribe({
  //     next:(response:any)=>{
      
      
  //     this.courses=[]
  //     for(let i=0;i<response.length;i++){
  //       this.courses.push(response[i])
  //     }
      
      
  //   },
  //   error:(error)=>{
  //     console.log("insideeeeee "+error);
  //     if(error==="IV_JWT"){
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
        
  //       //this.route.navigate(['/home'])
  //       window.location.reload()
  //     }});
  //   }
  //   else{
  //     alert("something went wrong please try again later")
  //   }
  //   }
  // })

  this.courses=this.allCourses.filter((fcourse:Course)=>{
    let curCourse=fcourse.name.toLowerCase()
    return curCourse.includes(this.search.toLowerCase())
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
    this.courses=this.allCourses.filter((fcourse:Course)=>{
      return fcourse.category===search
    })
    this.allSubCategory=this.courses
  }

  onChangeSub(event:Event){
    const filter:string=(event.target as HTMLInputElement).value
    //const filter=event
    if(filter==="Select"){
      return
    }
    if(filter==="All"){
      this.courses=this.allSubCategory
    }
    else{
      this.courses=[]
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
