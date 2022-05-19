import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { TostNotificationService } from 'src/app/services/tost-notification.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/models/user.helper';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.css']
})
export class OthersProfileComponent implements OnInit {
  fname:string=""
  phno:string=""
  email:string=""
  isUpdate:boolean=false
  curUser!:User
  enrollments:any[]=[]
  btn_text:string="Edit"
  
  constructor(private userService:UserService,private route:Router, private auth:AuthService,private rout:ActivatedRoute,private selected:CourseService,private toast:TostNotificationService) { }

  ngOnInit(): void {
    let user=this.rout.snapshot.paramMap.get('name')||''
    
      console.log(user);
      
      let obj:string=user
      
      this.userService.findHim(obj).subscribe({
        next:(res:any)=>{
          this.curUser=res.user
          let arr=res.enrollments
          console.log(arr);
        
        for(let i=0;i<arr.length;i++){
          console.log(arr[i]);
          this.enrollments.push(arr[i])
        }
        }
      })
    //}
  }

  goToCourseDet(show:string){
    this.route.navigate(['/courseDetails',{name:show}])
  }

}