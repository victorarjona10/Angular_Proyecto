// login.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = 'pol@example.com';
  password: string = '1234';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.Login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login correcte', res);
        localStorage.setItem('token', res.admin.token); 
        console.log('Token guardat:', res.admin.token);
        localStorage.setItem('refresh_token', res.admin.refreshToken);
        console.log('Refresh Token guardat:', res.admin.refreshToken);
        localStorage.setItem('email', this.email);
        alert('Login correcte!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al login', err);
        alert('Usuari o contrasenya incorrectes!');
      }
    });
  }

  signup() {
    this.router.navigate(['/signup']); 
  }
}