import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TableComponent } from '../../components/table/table.component';
import { FilterSearchComponent } from '../../components/filter-search/filter-search.component';
import { User } from '../../models/user'; 
import { Bb8ToggleComponent } from '../../UI/bb8-toggle/bb8-toggle.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, TableComponent , FilterSearchComponent, Bb8ToggleComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData!: User;
  tableData: User[] = []; // Datos para la tabla
  filteredData: User[] = [];
  tableColumns: { key: string, label: string }[] = [ // Definición de columnas
    { key: 'num', label: 'Num' },
    { key: '_id', label: 'ID' },
    { key: 'email', label: 'Mail' },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'password', label: 'Password' },
    { key: 'wallet', label: 'Wallet' },
    { key: 'flag', label: 'Flag' },
    { key: 'actions', label: 'Actions' }
  ];

  constructor(private apiService: ApiService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
  } 
  isDarkTheme = false; // Variable para controlar el tema actual

  // Función que se ejecuta al cambiar el estado del toggle
  toggleTheme(event: any): void {
    this.isDarkTheme = !!event; // Actualiza el tema según el valor emitido por bb8-toggle
  }

  loadUsers() {
    this.apiService.getAllUsers(1, 5).subscribe({
      next: (data) => {
        console.log('Usuarios cargados:', data);
        this.tableData = data.map((user: User, index: number) => ({
          num: index + 1,
          ...user,
          flag: user.Flag ?? false
        }));
        this.filteredData = [...this.tableData];
        this.cdRef.detectChanges(); // Forzar la detección de cambios
      },
      error: (err) => {
        console.error('Error obteniendo los datos de los usuarios', err);
      }
    });
  }

  // handleSearch(searchData: { field: string; term: string }) {
  //   if (!searchData.term) {
  //     this.filteredData = [...this.tableData]; // 还原所有数据
  //   } else {
  //     this.filteredData = this.tableData.filter(user =>
  //       user[searchData.field]?.toString().toLowerCase().includes(searchData.term.toLowerCase())
  //     );
  //   }
  // }

  onEdit(item: any) {
    console.log('Editar:', item);
  }

  onDelete(item: any) {
    console.log('Eliminar:', item);
  }

  handleSearchResults(data: User[]) {
    console.log('Resultados de búsqueda recibidos:', data);
    this.filteredData = data.map((user, index) => ({
      num: index + 1,
      ...user
    })); // Actualizar los datos filtrados para la tabla
  }
}