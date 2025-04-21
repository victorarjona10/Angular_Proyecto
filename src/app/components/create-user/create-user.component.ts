import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  imports: [ReactiveFormsModule]
}) 
export class CreateUserComponent {
  createUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CreateUserComponent>
  ) {
    this.createUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      wallet: ['', Validators.required],
      flag: [false]
    });
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      this.apiService.createUser(this.createUserForm.value).subscribe({
        next: (data) => {
          console.log('Usuario creado:', data);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error creando el usuario', err);
        }
      });
    }
  }
  onCancel() {
    this.dialogRef.close();
  }

}