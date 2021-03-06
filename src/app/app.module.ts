import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NavbarModule} from './sharedModule/navbar/navbar.module'
import {NavbarComponent} from './sharedModule/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestService } from './services/http-request.service';

import { CommonModule } from '@angular/common';
import { EnrollMentComponent } from './enrollmentsModule/enrollment/enroll-ment/enroll-ment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './adminModule/homeModule/home/home.component';
import { NewCourseComponent } from './adminModule/add-course/new-course/new-course.component';
import { UserComponent } from './adminModule/all-users/user/user.component';
import { FormsModule } from '@angular/forms';
import { AddCategoriesComponent } from './adminModule/addCategoryModule/add-categories/add-categories.component';
import { ToastrModule } from 'ngx-toastr';
import {MatNativeDateModule} from '@angular/material/core';
import { CookieService } from 'ngx-cookie-service';
import { UserProfileComponent } from './profileModule/user-profile/user-profile.component';
import { OthersProfileComponent } from './profileModule/user-profile/others-profile/others-profile.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HTTPInterceptor } from './interceptors/http.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    EnrollMentComponent,
    HomeComponent,
    NewCourseComponent,
    UserComponent,
    AddCategoriesComponent,
    UserProfileComponent,
    OthersProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatNativeDateModule,
  ],
  providers: [HttpRequestService,CookieService,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true

  },{
    provide: HTTP_INTERCEPTORS,
    useClass: HTTPInterceptor,
    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
