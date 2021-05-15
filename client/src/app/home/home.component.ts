import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService, ProductPayload } from '../cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  product: ProductPayload = {
    productName: "",
    productPrice: 0,
    productAmount: 0
  };

  
  

  constructor(private cart:CartServiceService, private router: Router) {}

/*
  addToCart() {
    this.cart.updateCart(this.product).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }
*/
}
