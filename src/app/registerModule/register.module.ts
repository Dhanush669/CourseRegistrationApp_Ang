import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../services/register.service';
import { HttpRequestService } from '../services/http-request.service';




@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[RegisterService,HttpRequestService]
})
export class RegisterModule { }
