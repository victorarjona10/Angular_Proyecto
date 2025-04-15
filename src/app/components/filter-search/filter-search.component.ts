import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { BlueComponent } from '../../UI/buttons/blue/blue.component';
import { FormInputComponent } from '../../UI/input-text/form-input/form-input.component';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css'],
  imports: [ReactiveFormsModule, CommonModule, BlueComponent, FormInputComponent],
})
export class FilterSearchComponent {
  isFormVisible: boolean = false;
  searchForm: FormGroup;
  @Output() searchResults = new EventEmitter<User[]>();

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.searchForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }
  @Input() page: number = 1; 
  @Input() limit: number = 5; 

  onSearch() {
    const user: User = new User();
    user.name = this.searchForm.value.name;
    user.email = this.searchForm.value.email;
    user.phone = this.searchForm.value.phone;
    console.log("Usuario:", user);


    const queryParams = {
      name: this.searchForm.value.name,
      email: this.searchForm.value.email,
      phone: this.searchForm.value.phone,

  };
  
  const cleanedParams = this.cleanQueryParams(queryParams);
  
    this.apiService.getUsersByFiltration(cleanedParams, this.page, this.limit).subscribe({
      next: (data) => {
        console.log('Usuarios encontrados:', data);
        const processedData = data.map((user: User) => ({
          ...user,
          flag: user.Flag ?? true, // Inicializa `flag` si no está presente
        }));
        this.searchResults.emit(data);
      },
      error: (err) => {
        console.error('Error buscando usuarios', err);
      }
    });
  }

  resetFilters() {
    this.searchForm.reset(); // Restablece todos los valores del formulario
    this.searchResults.emit([]); // Opcional: Emitir un arreglo vacío para limpiar la tabla
  }

  cleanQueryParams(params: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== '')
    );
}

toggleForm() {
  this.isFormVisible = !this.isFormVisible; // Alterna el estado del formulario
}
}