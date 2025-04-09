import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button-blue',
  imports: [CommonModule],
  templateUrl: './blue.component.html',
  styleUrl: './blue.component.css'
})
export class BlueComponent {
// Input para el texto del botón
@Input() text: string = 'Blue Button'; // Texto por defecto
}
