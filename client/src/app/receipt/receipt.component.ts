import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { CartService, UserPayload } from '../cart-service.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor(public auth:AuthenticationService, private cart:CartService) { }

  userProduct:UserPayload = {
    _id: "",
    productID: "",
    productAmount: 0
  }

  userDetails:UserDetails;

  productInfo = {
    iconPath: "",
    price: 0,
    ID: "",
    name: ""
  }

  counter = 1;
  price = 0;
  showCart = true;
  enableCheckout = true;


   ngOnInit(): void {

    if(this.auth.isLoggedIn()){

      //Get user information if the user is logged in
      this.userProduct._id = this.auth.getUserDetails()._id;
      this.getUserInformation();

      this.cart.showCart(this.userProduct).subscribe(
        cart => {

          this.productInfo = cart;
          
          this.price = cart.price * this.userProduct.productAmount;
          
          //Bit of a janky fix for an unexplainable error. If any value is undefined then the page 
          //is reloaded until the correct values are found. 
          if(this.userProduct.productID === "" && this.userProduct.productAmount == 0){
            window.location.reload();
          }
          
          //Checks so that the user's product is greater than zero, if it is then the counter should have that value.
          if(this.userProduct.productAmount > 1){
            this.counter = this.userProduct.productAmount;
          }

          //If the productID is empty, then that means that the cart is empty.
          if(this.userProduct.productID === ""){
            this.showCart = false;
            this.enableCheckout = false;
            this.price = 0;
          }
        },
        err => {
          console.error(err);
        }
      );
    }
    else{
      this.showCart = false;
    }
  }

  getUserInformation(){
    this.auth.profile().subscribe(
      user => {
        this.userDetails = user;
        this.userProduct.productID = user.productName;
        this.userProduct.productAmount = user.productAmount;
      },
      err => {
        console.error(err);
      }
    );
  }
}
