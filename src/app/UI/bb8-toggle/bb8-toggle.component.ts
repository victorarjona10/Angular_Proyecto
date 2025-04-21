import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bb8-toggle',
  imports: [],
  templateUrl: './bb8-toggle.component.html',
  styleUrl: './bb8-toggle.component.css'
})
export class Bb8ToggleComponent {
@Output() toggle = new EventEmitter<boolean>();
onToggle(event: Event): void {
  const isChecked = (event.target as HTMLInputElement).checked;
  this.toggle.emit(isChecked);
}
}
