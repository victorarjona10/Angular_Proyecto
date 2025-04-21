import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button-green',
  imports: [CommonModule],
  templateUrl: './green.component.html',
  styleUrl: './green.component.css'
})
export class GreenComponent {
// Input para el texto del botón
@Input() text: string = 'Green Button'; // Texto por defecto
}
