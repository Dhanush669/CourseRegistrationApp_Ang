import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './coursesModule/course-details/course-details.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { EnrollMentComponent } from './enrollmentsModule/enrollment/enroll-ment/enroll-ment.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './adminModule/homeModule/home/home.component';
import { NewCourseComponent } from './adminModule/add-course/new-course/new-course.component';
import { UserComponent } from './adminModule/all-users/user/user.component';
import { AddCategoriesComponent } from './adminModule/addCategoryModule/add-categories/add-categories.component';
import { RoleGuardGuard } from './services/role-guard.guard';
import { UserProfileComponent } from './profileModule/user-profile/user-profile.component';
import { OthersProfileComponent } from './profileModule/user-profile/others-profile/others-profile.component';
import { ForgorPasswordComponent } from './loginModule/forgor-password/forgor-password.component';






const routes: Routes = [

  {
    path:"",
    loadChildren: () => import('./homeModule/home.module').then(m => m.HomeModule),
    //component: HomeComponent,
    canActivate:[AuthenticationGuard]
  },

  

  {
    path:"login",
    loadChildren: () => import('./loginModule/login.module').then(m => m.LoginModule)
    // component: LoginComponent
  },
  {
    path:"forgortPassword",
    component:ForgorPasswordComponent
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
    
  },

  {
    path:"profile",
    component:UserProfileComponent,
    canActivate:[AuthenticationGuard]
  },

  {
    path:"othersProfile",
    component:OthersProfileComponent,
    canActivate:[AuthenticationGuard]
  },

  {
    path:"myEnrollments",
    //loadChildren: () => import('./enrollmentsModule/enrollment/enrollment.module').then(m => m.EnrollmentModule),
    component:EnrollMentComponent,
    canActivate:[AuthenticationGuard]
  },

  {
    path:"adminHome",
    //loadChildren: () => import('./adminModule/homeModule/home/home.module').then(m => m.HomeModule),
    component: HomeComponent,
    canActivate:[RoleGuardGuard],
    data: { 
      expectedRole: 'admin'
    }
    
  }
  ,

  {
    path:"addCourse",
    //loadChildren: () => import('./adminModule/homeModule/home/home.module').then(m => m.HomeModule),
    component: NewCourseComponent,
    canActivate:[RoleGuardGuard],
    data: { 
      expectedRole: 'admin'
    }
    
  }
  ,

  {
    path:"allUsers",
    //loadChildren: () => import('./adminModule/homeModule/home/home.module').then(m => m.HomeModule),
    component: UserComponent,
    canActivate:[RoleGuardGuard],
    data: { 
      expectedRole: 'admin'
    }
    
  }
  ,
  {
    path:"addCategory",
    //loadChildren: () => import('./adminModule/homeModule/home/home.module').then(m => m.HomeModule),
    component: AddCategoriesComponent,
    canActivate:[RoleGuardGuard],
    data: { 
      expectedRole: 'admin'
    }
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule],
  providers:[AuthenticationGuard]
})
export class AppRoutingModule { }
