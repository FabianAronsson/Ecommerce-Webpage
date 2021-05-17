import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CartService, UserPayload } from "../cart-service.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent{
  userDetails:UserPayload = {
    _id: "",
    productID: "2376UF",
    productAmount: 1
  }

  constructor(private cart:CartService, public auth: AuthenticationService, private router:Router) { }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  } 

  addToCart(){
    this.userDetails._id = this.auth.getUserDetails()._id;
    this.cart.addToCart(this.userDetails).subscribe(
      () => {
        //success
      },
      err => {
        console.error(err);
      }
    );
  }
}
