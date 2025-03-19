import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [],
  standalone: true
})
export class ProductComponent implements OnInit {

  @Input() product: any;
    ngOnInit(): void {  console.log(this.product);}

View()
{console.log(this.product);}

  constructor(private router: Router) { }



}

