import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/models/course.helper';
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
  categories:string[]=["Select","All","Development","DSA","Testing","Bootcamp","Ago/DSA","Database","Interview Prepration"]
  subCategories:string[]=["Select","All","Mobile Development","Web Development","UI/UX","Fontend","Backend"]
  filter:string=""
  
  constructor(private course:CourseService,private route:Router) { }
  search:string=""
  ngOnInit(): void {
    this.course.getAllCourse().subscribe((response:any)=>{
    
      for(let i=0;i<response.length;i++){
        this.courses.push(response[i])
      }
      this.allCourses=this.courses
      
    })
  }

  searchCourse(){
    if(this.search===""){
      alert("please type something to search..!")
      return
    }
    
    this.course.searchOneCourse(this.search).subscribe((response:any)=>{
      
      
      this.courses=[]
      for(let i=0;i<response.length;i++){
        this.courses.push(response[i])
      }
      
      
    })
  }

  onChange(event:Event){
    const filter:string=(event.target as HTMLInputElement).value

    if(filter==="Select"){
      return
    }
    if(filter==="All"){
      this.courses=this.allCourses
    }
    else{
    this.course.filterCourse(filter).subscribe((response:any)=>{ 
      console.log(response);
      
        this.courses=[]
        for(let i=0;i<response.length;i++){
          this.courses.push(response[i])
        }
        this.allSubCategory=this.courses
    })
  }

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
      console.log(filter);
      
    this.course.filterCourseSub(filter).subscribe((response:any)=>{
        this.courses=[]
        for(let i=0;i<response.length;i++){
          this.courses.push(response[i])
        }
    })
  }

  }

  showOverview(courseName:Course){
    //console.log(courseName);
    
    this.course.setUpCourse(courseName)
    this.route.navigate(['/courseDetails'])
  }

  



}
