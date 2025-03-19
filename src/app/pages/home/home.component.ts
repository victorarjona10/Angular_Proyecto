import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TableComponent } from '../../components/table/table.component';
import { FilterSearchComponent } from '../../components/filter-search/filter-search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, TableComponent, FilterSearchComponent], // Importa CommonModule aquí
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: any;
  tableData: any[] = []; // Datos para la tabla
  tableColumns: { key: string, label: string }[] = [ // Definición de columnas
    { key: 'num', label: 'Num' },
    { key: '_id', label: 'ID' },
    { key: 'email', label: 'Mail' },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'password', label: 'Password' },
    { key: 'wallet', label: 'Wallet' },
    { key: 'flag', label: 'Flag' }
  ];

  constructor(private apiService: ApiService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getAllUsers(1,5).subscribe({
      next: (data) => {
        console.log('Usuarios cargados:', data);
        this.tableData = data.map((user: any, index: number) => ({
          num: index + 1,  
          ...user,
          flag: user.flag ?? false  
        }));
        this.cdRef.detectChanges(); 
      },
      error: (err) => {
        console.error('Error obteniendo los datos de los usuarios', err);
      }
    });
  }

  onEdit(item: any) {
    console.log('Editar:', item);
  }

  onDelete(item: any) {
    console.log('Eliminar:', item);
  }
}