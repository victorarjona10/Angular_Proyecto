import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

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

    Return()
    {
      window.history.back();
    }
}
