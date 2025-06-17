import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-401',
  imports: [],
  templateUrl: './error-401.component.html',
  styleUrl: './error-401.component.css'
})
export class Error401Component {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']); // Redirige al componente de login
  }
}
