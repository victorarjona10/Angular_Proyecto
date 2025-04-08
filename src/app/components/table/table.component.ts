// Angular Core
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Servicios
import { ApiService } from '../../services/api.service';

// Modelos
import { User } from '../../models/user'; 

// Pipes
import { TableFilterPipe } from '../../pipes/table-filter.pipe';
import { ShortStringPipe } from '../../pipes/short-string.pipe';

// Componentes UI
import { CreateUserComponent } from '../create-user/create-user.component';
//import { LightComponent } from '../../UI/buttons/light/light.component';
import { BlueComponent } from '../../UI/buttons/blue/blue.component';
//import { GreenComponent } from '../../UI/buttons/green/green.component';
//import { RedComponent } from '../../UI/buttons/red/red.component';
import { CheckboxComponent } from '../../UI/checkbox/checkbox/checkbox.component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ShortStringPipe , BlueComponent, CheckboxComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {
  // 🔹 Inputs / Outputs
  @Input() set data(value: any[]) {
    this._data = value.map((item, index) => ({ ...item, num: index + 1, flag: item.flag ?? false }));
    this.updatePagination();
  }
  get data() {
    return this._data;
  }
  private _data: User[] = [];

  @Input() columns: { key: string, label: string }[] = []; 
  @Input() isDarkMode: boolean = false; // Controla el modo oscuro o claro
  
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  // 🔹 Constructor
  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  // 🔹 Variables del componente
  searchText: string = '';
  searchKey: string = 'name';
  action: string = 'name';

  currentPage: number = 1;
  rowsPerPage: number = 5;
  rowsPerPageOptions: number[] = [5, 10, 15, 20];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalPages: number = 0;

  // 🔹 Métodos de modal y acciones UI
  openCreateUserModal() {
    this.dialog.open(CreateUserComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'custom-dialog-container'
    });
  }

  copyToClipboard(value: string, event: MouseEvent) {
    event.stopPropagation();
    navigator.clipboard.writeText(value).then(() => {
      this.snackBar.open('ID copiado al portapapeles', 'Cerrar', { duration: 3000, panelClass: ['snackbar-white-background'] });
    }).catch(() => {
      this.snackBar.open('Error al copiar al portapapeles', 'Cerrar', { duration: 3000, panelClass: ['snackbar-white-background'] });
    });
  }

  // 🔹 Navegación
  editUser(item: User) {
    this.router.navigate(['/edit', item._id]);
  }

  ViewProfile(item: User) {
    this.router.navigate(['/profile', item._id], { queryParams: { isDarkTheme: this.isDarkMode } });
  }

  // 🔹 CRUD Flags
  inactivateUser(item: User) {
    this.apiService.inactivateUser(item._id).subscribe({
      next: (data) => {
        console.log('Usuario inactivado:', data);
        item.Flag = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error inactivando el usuario', err);
      }
    });
  }

  activateUser(item: User) {
    this.apiService.activateUser(item._id).subscribe({
      next: (data) => {
        console.log('Usuario activado:', data);
        item.Flag = true;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error activando el usuario', err);
      }
    });
  }

  onFlagChange(item: User): void {
    item.Flag ? this.inactivateUser(item) : this.activateUser(item);
  }

  // 🔹 Eventos del usuario
  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  // 🔹 Ordenamiento y búsqueda
  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  get sortedData() {
    if (!this.sortColumn || this.sortColumn === 'num') {
      return this.data;
    }
    return [...this.data].sort((a, b) => {
      let valueA = a[this.sortColumn] ?? '';
      let valueB = b[this.sortColumn] ?? '';
      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // 🔹 Paginación
  get paginatedData() {
    const filteredData = new TableFilterPipe().transform(this.sortedData, this.searchText, [this.searchKey]);
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    return filteredData.slice(startIndex, startIndex + this.rowsPerPage);
  }

  calculatePageNumbers() {
    return Math.ceil(this.data.length / this.rowsPerPage);
  }

  updatePagination() {
    this.totalPages = this.calculatePageNumbers();
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  changePage(increment: number) {
    if (increment === 1 && this.currentPage === this.totalPages) {
      this.getUsers(this.currentPage + 1, this.rowsPerPage);
    }
    this.currentPage += increment;
  }

  changePageToFirst() {
    this.currentPage = 1;
  }

  changePageToLast() {
    this.currentPage = Math.ceil(this.data.length / this.rowsPerPage);
  }

  changeRowsPerPage(event: any) {
    if (this.currentPage === this.totalPages) {
      this.getUsers(this.currentPage, parseInt(event.target.value, 10));
    }
    this.rowsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePagination();
  }

  // 🔹 Carga de datos desde la API
  getUsers(page: number, limit: number) {
    this.apiService.getAllUsers(page, limit).subscribe({
      next: (data) => {
        console.log('Usuarios cargados:', data);
        const newUsers = data.map((user: User) => ({
          ...user,
          flag: user.Flag ?? false
        }));
        const uniqueUsers = newUsers.filter((newUser: User) => !this._data.some(existingUser => existingUser._id === newUser._id));
        this._data = [...this._data, ...uniqueUsers];
        this._data = this._data.map((item, index) => ({ ...item, num: index + 1 }));
        this.totalPages = Math.ceil(this._data.length / this.rowsPerPage);
      },
      error: (err) => {
        console.error('Error obteniendo los datos de los usuarios', err);
      }
    });
  }
}
