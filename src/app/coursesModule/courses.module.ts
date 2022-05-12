import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../services/http-request.service';
import { FormsModule } from '@angular/forms';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MatRadioModule } from '@angular/material/radio'
import { CourseRoutingModule } from './courses-rounting.module';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatRadioModule,
    CourseRoutingModule
  ],
  providers: [
    HttpRequestService,
  ]
})
export class CoursesModule { }
