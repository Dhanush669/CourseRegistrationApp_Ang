import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NavbarModule} from './sharedModule/navbar/navbar.module'
import {NavbarComponent} from './sharedModule/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestService } from './services/http-request.service';
import { CourseService } from './services/course.service';
import { AuthenticationGuard } from './services/authentication.guard';
import { HttpErrorInterceptor } from './http-error.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule
  ],
  providers: [HttpRequestService,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
