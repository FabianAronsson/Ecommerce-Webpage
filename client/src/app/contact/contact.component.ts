import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { CartServiceService, ProductPayload } from '../cart-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  product: ProductPayload = {
    productName: "",
    productPrice: 0,
    productAmount: 0
  };


  details:UserDetails;

  constructor(public auth: AuthenticationService, private router: Router, private cart:CartServiceService,) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { 
        this.auth.profile().subscribe(
          user => {
            this.details = user;
          },
          err => {
            console.error(err);
          }
        );

      }
    });
  }


  addToCart() {
    this.auth.cart().subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }
}
