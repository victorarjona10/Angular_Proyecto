import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { OrderComponent } from '../order/order.component';
import { User } from '../../models/user';
import { Order } from '../../models/order'; // Importa el modelo Order
import { CreateOrderComponent } from '../create-order/create-order.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-profile',
  imports: [ CommonModule, OrderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user: User = new User();

  orders: Order[] = [];

    constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {}
  
    ngOnInit(): void {
      this.loadUser();
      this.loadOrders();
    }
  
    loadUser() {
      const userId = this.route.snapshot.paramMap.get('id');  
      if (userId) {
        this.apiService.getUserById(userId).subscribe({
          next: (data) => {
            this.user = data;
          },
          error: (err) => {
            console.error('Error cargando el usuario', err);
          }
        });
      }
    }
    loadOrders() {
      const userId = this.route.snapshot.paramMap.get('id');  
      if (userId) {
        this.apiService.getOrdersByUserId(userId).subscribe({
          next: (data) => {
            this.orders = data;
            console.log(this.orders);
          },
          error: (err) => {
            console.error('Error cargando los pedidos', err);
          }
        });
      }
    }

    Return()
    {
      window.history.back();
    
    }

    ViewProduct(item: any) {
      this.router.navigate(['/product', item._id]);
    }

    openCreateOrderModal() {
      const dialogRef = this.dialog.open(CreateOrderComponent, {
        width: '600px',
        height: 'auto',
        panelClass: 'custom-dialog-container',
        data: { user_id: this.user._id }
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Orden creada:', result)
        }
      });
    }
}
