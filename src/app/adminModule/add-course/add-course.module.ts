import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewCourseComponent } from './new-course/new-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddCourseModule { }
