import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {} from './homeModule/home.module'
import { CourseDetailsComponent } from './coursesModule/course-details/course-details.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { EnrollMentComponent } from './enrollmentsModule/enrollment/enroll-ment/enroll-ment.component';
import { CommonModule } from '@angular/common';




const routes: Routes = [
  {
    path:"login",
    loadChildren: () => import('./loginModule/login.module').then(m => m.LoginModule)
    // component: LoginComponent
  },
  {
    path:"register",
    loadChildren: () => import('./registerModule/register.module').then(m => m.RegisterModule)
    //component: RegisterComponent
  },
  {
    path:"courses",
    loadChildren: () => import('./coursesModule/courses.module').then(m => m.CoursesModule),
    //component: CoursesComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path:"home",
    loadChildren: () => import('./homeModule/home.module').then(m => m.HomeModule),
    //component: HomeComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path:"courseDetails",
    //loadChildren: () => import('./coursesModule/courses.module').then(m => m.CoursesModule),
    component:CourseDetailsComponent,
    canActivate:[AuthenticationGuard]
  }
  ,
  {
    path:"myEnrollments",
    //loadChildren: () => import('./enrollmentsModule/enrollment/enrollment.module').then(m => m.EnrollmentModule),
    component:EnrollMentComponent,
    canActivate:[AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule],
  providers:[AuthenticationGuard]
})
export class AppRoutingModule { }
