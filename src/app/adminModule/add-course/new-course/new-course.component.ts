import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { TostNotificationService } from 'src/app/services/tost-notification.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  oldCourseName!:string
  cname:string=""
  price!:number
  category:string="Select"
  subCategory:string="Select"
  overview:string=""
  instructor:string=""
  duration:string=""
  syllabus:string[]=[]
  selectedCategory:string=""
  url:string=""
  selectedSubCategory:string=""
  newCourse:any
  oneSyllabus:string=""
  categories:string[]=["Select"]
  subCategories:string[]=["Select"]
  isUpdate:boolean=false

  constructor(private courseHttp:AdminService,private httpCourse:CourseService,private route:Router,private auth:AuthService,private rout:ActivatedRoute,private toast:TostNotificationService) {
    
  }
 
  ngOnInit(): void {
    
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

    let curCour=this.rout.snapshot.paramMap.get('course')||''
    if(curCour===''){
      return
    }
    let updateCourse=JSON.parse(curCour)
    if(updateCourse!==null){
      this.oldCourseName=updateCourse.name
      this.cname=updateCourse.name
      this.price=updateCourse.price
      let cate_posi=this.categories.indexOf(updateCourse.category)
      let subCate_posi=this.subCategories.indexOf(updateCourse.sub_category)
      this.url=updateCourse.img_thumbnai
      this.selectedCategory=this.categories[cate_posi]
      this.selectedSubCategory=this.subCategories[subCate_posi]
      this.category=this.selectedCategory
      this.subCategory=this.selectedSubCategory
      this.syllabus=updateCourse.syllabus
      this.instructor=updateCourse.instructor
      this.overview=updateCourse.overview
      this.duration=updateCourse.duration
      this.isUpdate=true
    }

    
    
  }

  onChange(cate:Event){
    const filter:string=(cate.target as HTMLInputElement).value
    this.category=filter
  }

  onChangeSub(subCate:Event){
    const filter:string=(subCate.target as HTMLInputElement).value
    this.subCategory=filter
  }

  addSyllabus(){
    this.syllabus.push(this.oneSyllabus)
    this.oneSyllabus=""
  }

  removeSyllabus(){
    this.syllabus=this.syllabus.filter((oneSyll:string)=>{
      return oneSyll!==this.oneSyllabus
    })
  }

  onSubmit(){
    if(this.syllabus.length==0){
      alert("please add syllabus")
      return
    }
    if(this.category==="Select"||this.subCategory==="Select"){
      alert("please select category")
      return
    }

    if(this.isUpdate){
      const newCourse={"name":this.cname,"category":this.category,"sub_category":this.subCategory,"duration":this.duration,"img_thumbnai":this.url,"syllabus":this.syllabus,"instructor":this.instructor,
      "overview":this.overview,"no_of_enrollments":0,"price":this.price,"courseName":this.oldCourseName
    }
      this.courseHttp.updateCourse(newCourse).subscribe({
        next:(response)=>{
          this.toast.showSuccess("Course Updated")
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
          }});
        }
        else{
          alert("something went wrong please try again later")
        }
        }

      })
      return
    }
    const newCourse={"name":this.cname,"category":this.category,"sub_category":this.subCategory,"duration":this.duration,"img_thumbnai":this.url,"syllabus":this.syllabus,"instructor":this.instructor,
    "overview":this.overview,"no_of_enrollments":0,"price":this.price
  }
    this.courseHttp.addCourse(newCourse).subscribe({
      next:(response)=>{
        this.toast.showSuccess("Course Added Successfully")
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
          //window.location.reload()
        }});
        
      }
    })
    
    
  }

}
