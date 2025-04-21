import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button-red',
  imports: [CommonModule],
  templateUrl: './red.component.html',
  styleUrl: './red.component.css'
})
export class RedComponent {
// Input para el texto del botón
@Input() text: string = 'Red Button'; // Texto por defecto
}
