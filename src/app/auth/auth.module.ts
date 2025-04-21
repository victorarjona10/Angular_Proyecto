import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SignupComponent,
    LoginComponent
  ]
})
export class AuthModule { }
