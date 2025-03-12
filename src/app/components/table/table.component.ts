import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() set data(value: any[]) {
    this._data = value.map((item, index) => ({ ...item, num: index + 1 }));
    this.totalPages = Math.ceil(this._data.length / this.rowsPerPage);
  }
  get data() {
    return this._data;
  }
  private _data: any[] = [];

  @Input() columns: { key: string, label: string }[] = []; // Definición de columnas
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  currentPage: number = 1;
  rowsPerPage: number = 5;
  rowsPerPageOptions: number[] = [5, 10, 15, 20];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  totalPages: number = 0;

  get sortedData() {
  if (!this.sortColumn || this.sortColumn === 'num') {
    return this.data;
  }
  return [...this.data].sort((a, b) => {
    let valueA = a[this.sortColumn] ?? ''; 
    let valueB = b[this.sortColumn] ?? ''; 

    if (typeof valueA === 'string') valueA = valueA.toLowerCase();
    if (typeof valueB === 'string') valueB = valueB.toLowerCase();

    if (valueA < valueB) {
      return this.sortDirection === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return this.sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    return this.sortedData.slice(startIndex, startIndex + this.rowsPerPage);
  }

  // get paginatedDataWithIndex() {
  //   const startIndex = (this.currentPage - 1) * this.rowsPerPage;
  //   return this.paginatedData.map((item, index) => ({
  //     ...item,
  //     num: startIndex + index + 1
  //   }));
  // }
  
  

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  changePage(increment: number) {
    this.currentPage += increment;
  }

  changeRowsPerPage(event: any) {
    this.rowsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1; // Reset to first page
  }

  changePageToFirst() {
    this.currentPage = 1;
  }

  changePageToLast() {
    this.currentPage = Math.ceil(this.data.length / this.rowsPerPage);
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1; // Reset to first page
  }
}