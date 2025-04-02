import { Component, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [ProductComponent, CommonModule],
  standalone: true 
})
export class OrderComponent implements OnInit {
  ngOnInit(): void {
    console.log('OrderComponent initialized with order:', this.order);
  }
  @Input() order: any;
}