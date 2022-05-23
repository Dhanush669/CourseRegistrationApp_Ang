import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { HttpRequestService } from '../services/http-request.service';
import { LoginRoutingModule } from './login-routing.module';
import { ForgorPasswordComponent } from './forgor-password/forgor-password.component';
import { UserService } from '../services/user.service';



@NgModule({
  declarations: [
    LoginComponent,
    ForgorPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoginRoutingModule
  ],
  providers:[LoginService,HttpRequestService,UserService]
})
export class LoginModule { }
