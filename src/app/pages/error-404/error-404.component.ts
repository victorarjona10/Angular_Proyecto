import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-error-404',
  imports: [],
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.css'
})
export class Error404Component {

  constructor(private router:Router, private location:Location) { }

  goBack() {
    // Redirige a la página anterior
    this.location.back();
  }
  goToHome() {
    // Redirige a la página de inicio
    console.log('Redirigint a la pàgina d\'inici...');
    this.router.navigate(['/home']);
  }
}
