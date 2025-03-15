import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-user',
  imports: [ FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any = {};

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
        },
        error: (err) => {
          console.error('Error cargando el usuario', err);
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
