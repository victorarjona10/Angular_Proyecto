// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login correcte', res);
        localStorage.setItem('token', res.token); // Guarda el token
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
    this.router.navigate(['/signup']); // Redirigir a la pàgina de registre
  }
}