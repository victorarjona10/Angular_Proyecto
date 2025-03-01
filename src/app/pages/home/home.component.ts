import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule], // Importa CommonModule aquí
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      console.log('Email de l\'usuari:', email);
      this.apiService.getUserDataByEmail(email).subscribe({
        next: (data) => {
          this.userData = data;
        },
        error: (err) => {
          console.error('Error obtenint les dades de l\'usuari', err);
        }
      });
    } else {
      console.error('No s\'ha trobat l\'email de l\'usuari al localStorage');
    }
  }
}