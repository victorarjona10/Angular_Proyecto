import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  standalone: true
})
export class CreateOrderComponent {
  order: { user_id: string; products: { product_id: string; quantity: number }[] } = { user_id: '', products: [] };
  product_id: string = '';
  quantity: number = 1;

  constructor(private dialogRef: MatDialogRef<CreateOrderComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) {
    this.order.user_id = data.user_id;
  }

  addProduct() {
    this.order.products.push({ product_id: '', quantity: 1 });
  }

  removeProduct(index: number) {
    this.order.products.splice(index, 1);
  }

  createOrder() {
    const currentDate = new Date().toISOString().split('T')[0];
    this.order.products = this.order.products.filter(product => product.product_id.trim() !== '');


    this.dialogRef.close(this.order);
    const newOrder: Order = {
      //_id: '', // Si `_id` es requerido, puedes generarlo aquí o dejarlo vacío
      user_id: this.order.user_id,
      products: this.order.products,
      orderDate: new Date(currentDate), // Si `orderDate` es requerido
      status: 'Pendiente' // Si `status` es requerido
    };
      console.log('Orden creada:', newOrder);
    if (newOrder.products.length !== 0) {
    this.apiService.createOrder(newOrder).subscribe({
      next: (response) => {
        console.log('Orden creada exitosamente:', response);
        this.dialogRef.close(newOrder); // Cerrar el diálogo y devolver la orden creada
      },
      error: (err) => {
        console.error('Error al crear la orden:', err);
      }
    });
  }
}
  close() {
    this.dialogRef.close();
  }
}
