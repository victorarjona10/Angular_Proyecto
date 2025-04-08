import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'button-light',
  imports: [CommonModule],
  templateUrl: './light.component.html',
  styleUrl: './light.component.css'
})
export class LightComponent {
// Input para el texto del botón
@Input() text: string = 'Light Button'; // Texto por defecto


}
