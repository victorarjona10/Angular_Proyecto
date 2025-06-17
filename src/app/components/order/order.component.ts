import { Component, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { ApiService } from '../../services/api.service';
import { RedComponent } from '../../UI/buttons/red/red.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [ProductComponent, CommonModule, RedComponent],
  standalone: true 
})
export class OrderComponent implements OnInit {
  @Input() order!: Order;

  constructor(private apiService: ApiService) { };
  ngOnInit(): void {
    console.log('OrderComponent initialized with order:', this.order);
  }

  DeleteOrder(id: any): void {
    const confirmation = confirm('¿Seguro que quieres eliminar el pedido?');
    if (confirmation) {
      this.apiService.deleteOrderById(id).subscribe({
        next: (response) => {
          console.log('Orden eliminada:', response);
          window.location.reload();
        },
        error: (err) => { 
          console.error('Error al eliminar la orden:', err);
        }
      });
    } else {
      console.log('Acción cancelada para Order ID:', this.order._id);
    }
  }

}