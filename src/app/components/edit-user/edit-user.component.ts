import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-edit-user',
  imports: [ FormsModule, CommonModule ], // Agrega CommonModule aquí
  standalone: true,
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user!: User;
  isLoading: boolean = true; // Indicador de carga
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const userId = this.route.snapshot.paramMap.get('id');  
    if (userId) {
      this.apiService.getUserById(userId).subscribe({
        next: (data) => {
          this.user = data;
          this.isLoading = false; // Desactiva el indicador de carga
          console.log('Usuari:', this.user);
        },
        error: (err) => {
          console.error('Error cargando el usuario', err);
          this.isLoading = false; // Desactiva el indicador de carga
        }
      });
    }
  }

  updateUser()
  {
    this.apiService.updateUser(this.user).subscribe({
      next: (data) => {
        console.log('Usuario actualizado:', data);
        alert('Usuari Modificat!');
      },
      error: (err) => {
        console.error('Error actualizando el usuario', err);
        alert('Error');
      }
    });
    window.history.back();
  }

  goBack()
  {
    window.history.back();
  }



}
