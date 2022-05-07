import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import {EnrollMentComponent} from './enroll-ment/enroll-ment.component'
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    EnrollMentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class EnrollmentModule { }
