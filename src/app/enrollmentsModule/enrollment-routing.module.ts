import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrollMentComponent } from './enrollment/enroll-ment/enroll-ment.component';


const routes: Routes = [
  {
    path: '',
    component: EnrollMentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }