import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { CartService, UserPayload } from "../cart-service.service";
import { ProductComponent } from '../product/product.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor(public auth:AuthenticationService, private cart:CartService ) { }

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

   ngOnInit(): void {

    if(this.auth.isLoggedIn()){

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

  updateUserCart(){
    this.userProduct._id = this.auth.getUserDetails()._id;
    this.cart.addToCart(this.userProduct).subscribe(
      () => {
        //success
      },
      err => {
        console.error(err);
      }
    );
  }

  //Whether or not to show the cart or not
  updateCartCondition(){
    this.showCart = false;
    this.userProduct.productAmount = 1;
    this.userProduct.productID = "";
    this.price = 0;
    this.updateUserCart();
  }

  incrementCounter(){
    this.counter++;
    this.price = this.productInfo.price * this.counter;
    this.userProduct.productAmount = this.counter;
    this.updateUserCart();
  }

  decrementCounter(){
    if(this.counter > 1){
      this.counter--;
      this.price = this.productInfo.price * this.counter;
      this.userProduct.productAmount = this.counter;
      this.updateUserCart();
    }
  }
}
