// signup.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  wallet: number = 0;

  constructor(private apiservice: ApiService, private router: Router) {}

  signup() {
    const user = { name: this.name, email: this.email, password: this.password, phone: this.phone, wallet: this.wallet };
    this.apiservice.signup(user).subscribe({
      next: (res) => {
        console.log('Signup correcte', res);
        alert('Registre correcte!');
      },
      error: (err) => {
        console.error('Error al registre', err);
        alert('Error al registre!');
      }
    });
  }

  returnToLogin() {
    this.router.navigate(['/login']); // Redirigir a la pàgina de login
  }
}