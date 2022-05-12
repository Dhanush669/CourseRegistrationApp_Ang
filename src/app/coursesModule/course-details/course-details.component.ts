import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/models/course.helper';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!:Course
  courseName!:string
  comments:any[]=[]
  uname=""
  newcomment=""
  isEnrolled:boolean=false
  constructor(private selected:CourseService,private router:Router,private auth:AuthService,private rout:ActivatedRoute) {
   
   }

  ngOnInit(): void {
    
    //console.log(this.courseName);
    this.courseName=this.rout.snapshot.paramMap.get('name')||''
    this.selected.getSelectedCourse(this.courseName).subscribe({
      next:(response)=>{
        console.log(response);
        this.course=response
        let arr=this.course.comments.split('@')
        console.log(arr);

        
        for(let i=0;i<arr.length;i++){
          let oneComment=arr[i].split('-')
          let obj={"name":oneComment[0],"comment":oneComment[1]}
          this.comments.push(obj)
        }
      },
      error:(error)=>{
        console.log("insideeeeee "+error);
        if(error==="IV_JWT"){
        this.selected.getToken().subscribe({next:(res:any)=>{
          localStorage.removeItem("TOKEN")
          localStorage.removeItem("Login_Status")
          if(res==="jwt expired"){
            this.router.navigate(['/login'])
            localStorage.clear()
            this.auth.Logout()
            this.selected.removeToken()
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
        alert("something went wrong please try again later")
      }
      }
    })
  }

  enroll(){
    let body={
      //"courses_Enrolled":{"name":this.course.name,"img_thumbnai":this.course.img_thumbnai}
      "name":this.course.name
    }
    this.selected.enrollCourse(body).subscribe({
      next:(res)=>{
        this.selected.increaseEnrollmentCount({"name":this.course.name}).subscribe((res)=>{

        })
      // alert("Sucessfully enrolled the course "+this.course.name)
      // this.router.navigate(['/courses'])
      this.isEnrolled=true
    },
    error:(error)=>{
      //console.log(error.error.text);
      this.selected.getToken().subscribe({next:(res:any)=>{
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("Login_Status")
        if(res==="jwt expired"){
          this.router.navigate(['/login'])
          this.auth.Logout()
          
          
          this.selected.removeToken().subscribe((res)=>{
          
          })
          localStorage.clear()
          return
        }
        
        let response=JSON.parse(res)
        let token=response.token
        let role=response.role
        localStorage.setItem("TOKEN",token);
        localStorage.setItem("Login_Status",role);
        this.selected.increaseEnrollmentCount({"name":this.course.name}).subscribe((res)=>{
          
        })
        console.log(" "+role);
        this.router.navigate(['/courses'])
    }});
      
    }
  })
  // this.selected.increaseEnrollmentCount({"name":this.course.name}).subscribe(
  //   (res)=>{
  //     console.log("poodddaaaa "+res);
      
  //   }
  // )
  }

  addComment(){
    let comment="@"+this.uname+"-"+this.newcomment
    let payload:Object={
      "name":this.courseName,
      "comment":comment
    }
    this.selected.addComments(payload).subscribe({
      next:(response)=>{
        alert("comment successfully added")
        window.location.reload()
      },
      error:(error)=>{
        console.log(error);
        this.selected.getToken().subscribe({next:(res:any)=>{
          localStorage.removeItem("TOKEN")
          localStorage.removeItem("Login_Status")
          if(res==="jwt expired"){
            this.router.navigate(['/login'])
            localStorage.clear()
            this.auth.Logout()
            this.selected.removeToken()
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
        }});
        
      }
    })
  }

  goToCourse(){
    this.router.navigate(['/courses'])
  }

}
