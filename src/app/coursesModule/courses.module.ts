import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService } from '../services/http-request.service';
import { FormsModule } from '@angular/forms';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MatRadioModule } from '@angular/material/radio'



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
  ],
  providers: [
    HttpRequestService,
  ]
})
export class CoursesModule { }
