import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BackOfficeComponent } from './pages/backoffice/backoffice.component';
import { ProductComponent } from './components/product/product.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { Error404Component } from './pages/error-404/error-404.component';
import { Error401Component } from './pages/error-401/error-401.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'edit/:id', component: EditUserComponent },
  {path: 'profile/:id', component: ProfileComponent},
  { path: 'home', component: BackOfficeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'createuser', component: CreateUserComponent },
  { path: '404', component: Error404Component },
  { path: '401', component: Error401Component },
  { path: '**', redirectTo: '404' }
  // Altres rutes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }