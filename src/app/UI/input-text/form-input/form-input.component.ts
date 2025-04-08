import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'input-form',
  imports: [],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css'
})
export class FormInputComponent {
 @Input() text: string = 'Buscar...';
}
