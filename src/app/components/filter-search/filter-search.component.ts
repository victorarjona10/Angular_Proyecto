import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css'],
  imports: [ReactiveFormsModule]
})
export class FilterSearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.searchForm = this.fb.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      wallet: [''],
      flag: ['']
    });
  }

  onSearch() {
    const searchCriteria = this.searchForm.value;
    this.apiService.searchUsers(searchCriteria).subscribe({
      next: (data) => {
        console.log('Usuarios encontrados:', data);
        // Manejar los datos de los usuarios encontrados
      },
      error: (err) => {
        console.error('Error buscando usuarios', err);
      }
    });
  }
}