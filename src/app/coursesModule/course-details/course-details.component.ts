import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { EnrollMentComponent } from 'src/app/enrollmentsModule/enrollment/enroll-ment/enroll-ment.component';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { TostNotificationService } from 'src/app/services/tost-notification.service';
import { UserService } from 'src/app/services/user.service';
import { Course } from 'src/models/course.helper';
import { User } from 'src/models/user.helper';

declare var Razorpay: any;

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!:Course
  courseName!:string
  comments:any[]=[]
  syllabus:string[]=[]
  currentUser!:User
  uname=""
  newcomment=""
  options!:any
  alreadyEnrolled:boolean=false
  isEnrolled:boolean=false
  isLoaded:boolean=false
  rpay!:any
  isCalled:boolean=false
  constructor(private selected:CourseService,private router:Router,private auth:AuthService,private rout:ActivatedRoute,private user:UserService,private admin:AdminService,private toast:TostNotificationService) {
   
   }



  ngOnInit(): void {
    
    //console.log(this.courseName);
    this.courseName=this.rout.snapshot.paramMap.get('name')||''
    this.selected.getSelectedCourse(this.courseName).subscribe({
      next:(response)=>{
        console.log(response);
        this.course=response
        // let arr=this.course.comments.split('@')
        // console.log(arr);

        
        // for(let i=0;i<arr.length;i++){
        //   let oneComment=arr[i].split('-')
        //   let obj={"name":oneComment[0],"comment":oneComment[1]}
        //   this.comments.push(obj)
        // }
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
        this.toast.showError("something went wrong please try again later")
      }
      },complete:()=>{
        this.isLoaded=true
      }
    })

    this.user.findOneUser().subscribe({
      next:(res:any)=>{
        this.currentUser=res
              
      
      },error:(err)=>{
        this.toast.showError("something went wrong")
      }
    })

    this.selected.getSyllabus(this.courseName).subscribe({
      next:(response)=>{
        console.log(response+" syllabus");
        this.syllabus=response
      },
    })
    console.log("comments");
    
    this.selected.getComments(this.courseName).subscribe({
      next:(response)=>{
        
        for(let i=0;i<response.length;i++){
          let res_obj:any=response[i]
          let oneComment=res_obj.comment.split('-')
          let obj={"name":oneComment[0],"comment":oneComment[1],"uid":res_obj.uid}
          this.comments.push(obj)
        }
      },error:(error)=>{
        console.log(error);
        
      }
    })

    this.user.getMyEnrollments().subscribe({
      next:(response)=>{
        
        let arr=[]
        for(let i=0;i<response.length;i++){
          arr.push(response[i].name)
        }

        console.log(arr);
        
        if(arr.includes(this.course.name)){

          this.alreadyEnrolled=true
        }
      }
    })
    
  }

  

  enroll(){ 
    if(this.alreadyEnrolled){
      return 
    }

    this.isLoaded=false

    const body={
      "price":""+this.course.price
    }
    let response;
    this.selected.getPaymentOrder(body).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.options = {
          "key": "rzp_test_SyMuhwrC3KC8jP",
          "amount": res.amount,
          "currency": "INR",
          "name": "LearnIT",
          "description": "Your Enrollment fee",
           "order_id": res.id,
          "handler": (response:any)=>{
            console.log(response);
            this.isLoaded=false
            const body={
              "payment_id": response.razorpay_payment_id,
              "order_id": response.razorpay_order_id,
              "signature": response.razorpay_signature
            }
            
            this.selected.verifyPayment(body).subscribe({
              next:(res)=>{
                if(res==="PV"){
                  this.toast.showSuccess("Payment Successful")
                  if(!this.isCalled){
                  this.enrollMe()
                  this.isCalled=true
                  }
                }
                
              },error:(err)=>{
                this.toast.showError("Payment Verification Failed")
              },complete:()=>{
                this.isLoaded=true
              }
            })
        },
          "prefill": {
              "name": this.currentUser.firstName,
              "email": this.currentUser.emailId,
              "contact": this.currentUser.phno
          },
          "theme": {
              "color": "#4f3e9d"
          }
      };
    
      var rzp1 = new Razorpay(this.options);
      rzp1.open();


      

      rzp1.on('payment.failed', this.paymentFailureHandler)
        console.log("failed");
        
      
      }
    })

    

  //   let body={
  //     //"courses_Enrolled":{"name":this.course.name,"img_thumbnai":this.course.img_thumbnai}
  //     "name":this.course.name
  //   }
  //   this.selected.enrollCourse(body).subscribe({
  //     next:(res)=>{
  //       this.selected.increaseEnrollmentCount({"name":this.course.name}).subscribe((res)=>{

  //       })
  //     // alert("Sucessfully enrolled the course "+this.course.name)
  //     this.toast.showSuccess("Course Enrolled Successfully")
  //     // this.router.navigate(['/courses'])
  //     this.isEnrolled=true
  //   },
  //   error:(error)=>{
  //     console.log("insideeeeee "+error);
  //     if(error==="IV_JWT"){
  //     this.selected.getToken().subscribe({next:(res:any)=>{
  //       localStorage.removeItem("TOKEN")
  //       localStorage.removeItem("Login_Status")
  //       if(res==="jwt expired"){
  //         this.router.navigate(['/login'])
  //         localStorage.clear()
  //         this.auth.Logout()
  //         this.selected.removeToken()
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
  //   },complete:()=>{
  //     this.isLoaded=true
  //   }
  // })
  // this.selected.increaseEnrollmentCount({"name":this.course.name}).subscribe(
  //   (res)=>{
  //     console.log("poodddaaaa "+res);
      
  //   }
  // )
  }

  enrollMe(){
    let body={
      //"courses_Enrolled":{"name":this.course.name,"img_thumbnai":this.course.img_thumbnai}
      "name":this.courseName
    }
    this.selected.enrollCourse(body).subscribe({
      next:(res)=>{
        this.selected.increaseEnrollmentCount({"name":this.course.name}).subscribe((res)=>{

        })
      // alert("Sucessfully enrolled the course "+this.course.name)
      this.toast.showSuccess("Course Enrolled Successfully")
      // this.router.navigate(['/courses'])
      this.isEnrolled=true
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
    },complete:()=>{
      this.isLoaded=true
      this.selected.increaseEnrollmentCount({"name":this.course.name}).subscribe(
        (res)=>{
          console.log("poodddaaaa "+res);
          
        }
      )
    }
  })
  
  }

  paymentFailureHandler(response:any){
    this.toast.showError("unexpected error orrucred during payment please try again")
  }

  

  update(){
    
    let curCourse={"name":this.course.name,"category":this.course.category,"sub_category":this.course.sub_category,"duration":this.course.duration,"img_thumbnai":this.course.img_thumbnai
    ,"syllabus":this.syllabus,"instructor":this.course.instructor,
    "overview":this.course.overview,"no_of_enrollments":this.course.no_of_enrollments,"price":this.course.price}
    //let curCourse=this.course
    this.router.navigate(['/addCourse',{course:JSON.stringify(curCourse)}])
  }

  delete(){
    this.admin.deleteCourse(this.course.name).subscribe({
      next:(res)=>{
        this.toast.showSuccess("Deleted Successfully")
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
        this.toast.showError("something went wrong please try again later")
      }
      },complete:()=>{
        this.isLoaded=true
      }
      
    })
  }

  isAdmin(){
    if(this.user.getRole()==='admin'){
      return true
    }
    return false
  }

  addComment(){
    let comment=this.uname+"-"+this.newcomment
    let payload:Object={
      "name":this.courseName,
      "comment":comment
    }
    this.selected.addComments(payload).subscribe({
      next:(response)=>{
        this.toast.showSuccess("comment successfully added")
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
        
      },complete:()=>{
        this.isLoaded=true
      }
    })
  }

  goToCourse(){
    this.router.navigate(['/courses'])
  }

  showHim(cmtObj:any){
    this.router.navigate(['/othersProfile',{name:cmtObj.uid}])
  }

}


