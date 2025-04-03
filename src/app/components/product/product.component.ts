import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() order: any;
    ngOnInit(): void {  console.log(this.product);}

View()
{console.log(this.product);}

  constructor(private router: Router, private apiService: ApiService) { }

  addQuantity()
  {
    this.product.quantity++;
    console.log(this.order);
    this.apiService.updateOrderQuantity(this.order._id, this.product.product_id._id, this.product.quantity).subscribe({
      next: (data) => {
        console.log('Order updated:', data);
      },
      error: (err) => {
        console.error('Error updating order:', err);
      }
    });
  }

  lessQuantity()
  {
    this.product.quantity--;
    if (this.product.quantity === 0)
    {
      this.apiService.deleteProductFromOrderById(this.order._id, this.product.product_id._id).subscribe({
        next: (data) => {
          console.log('Product removed from order:', data);
        },
        error: (err) => { 
          console.error('Error removing product from order:', err);
        }
      });
    }
    else
    {
      this.apiService.updateOrderQuantity(this.order._id, this.product.product_id._id, this.product.quantity).subscribe({
        next: (data) => {
          console.log('Order updated:', data);
        },
        error: (err) => {
          console.error('Error updating order:', err);
        }
      });
    }

  }



}

