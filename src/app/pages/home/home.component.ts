import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, TableComponent], // Importa CommonModule aquí
  styleUrls: ['./home.component.scss']
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
    { key: 'wallet', label: 'Moneder' },
    { key: 'flag', label: 'Flag' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe({
      next: (data) => {
        this.tableData = data; // Asigna los datos de todos los usuarios a la tabla
      },
      error: (err) => {
        console.error('Error obtenint les dades dels usuaris', err);
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