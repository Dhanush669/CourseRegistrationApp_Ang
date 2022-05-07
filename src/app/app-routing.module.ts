import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginModule} from './loginModule/login.module'
import {RegisterModule} from './registerModule/register.module'
import {CoursesModule} from './coursesModule/courses.module'
import {} from './homeModule/home.module'
import { LoginComponent } from './loginModule/login.component';
import { RegisterComponent } from './registerModule/register.component';
import { CoursesComponent } from './coursesModule/courses.component';
import { HomeComponent } from './homeModule/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from './services/http-request.service';
import { CourseDetailsComponent } from './coursesModule/course-details/course-details.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { ProfileComponent } from './profileModule/profile.component';



const routes: Routes = [
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"courses",
    component: CoursesComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path:"home",
    component: HomeComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path:"courseDetails",
    component:CourseDetailsComponent,
    canActivate:[AuthenticationGuard]
  }
  // ,
  // {
  //   path:"profile",
  //   component:ProfileComponent,
  //   canActivate:[AuthenticationGuard]
  // }
  ,
  {
    path:"myEnrollments",
    component:CourseDetailsComponent,
    canActivate:[AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthenticationGuard]
})
export class AppRoutingModule { }
