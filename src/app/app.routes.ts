import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EtiquetaMin1Component } from './components/etiqueta-min1/etiqueta-min1.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'createuser', component: CreateUserComponent },
  { path: 'etiquetas/:id', component: EtiquetaMin1Component }, // Nueva ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
