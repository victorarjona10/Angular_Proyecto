import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../UI/input-text/search/search.component';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css'],
  imports: [FormsModule, SearchComponent],
})
export class TableSearchComponent {
  searchTerm: string = '';
  searchField: string = 'name';

  @Output() searchEvent = new EventEmitter<{ field: string; term: string }>();

  onSearch() {
    this.searchEvent.emit({ field: this.searchField, term: this.searchTerm.trim() });
  }
}
