import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [ FormsModule, CommonModule, ReactiveFormsModule ], // Agrega CommonModule aquí
  standalone: true,
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user!: User;
  userId!: string;
  constructor(private apiService: ApiService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: { userId: string }, private router: Router,
      private dialogRef: MatDialogRef<EditUserComponent>) { this.userId = data.userId;}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    
    if (this.userId) {
      this.apiService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.user = data;
          // Desactiva el indicador de carga
          console.log('Usuari:', this.user);
        },
        error: (err) => {
          console.error('Error cargando el usuario', err);
           // Desactiva el indicador de carga
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
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error actualizando el usuario', err);
        alert('Error');
      }
    });
    this.router.navigate(['/home']);
  }


  onCancel() {
    this.dialogRef.close();
  }



}
