import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NavbarModule} from './sharedModule/navbar/navbar.module'
import {NavbarComponent} from './sharedModule/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from './services/http-request.service';
import { CourseService } from './services/course.service';
import { AuthenticationGuard } from './services/authentication.guard';





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
  providers: [HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
