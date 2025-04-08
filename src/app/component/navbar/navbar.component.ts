import { Component, Output, EventEmitter } from '@angular/core';
import { Bb8ToggleComponent } from '../../UI/bb8-toggle/bb8-toggle.component';

@Component({
  selector: 'navbar',
  imports: [Bb8ToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    @Output() themeChange = new EventEmitter<boolean>();
    isDarkTheme: boolean = false; // Variable para controlar el tema actual
    // Función que se ejecuta al cambiar el estado del toggle
    toggleTheme(event: any): void {
      this.isDarkTheme = !!event; // Actualiza el tema según el valor emitido por bb8-toggle
      this.themeChange.emit(this.isDarkTheme);
    }
}
