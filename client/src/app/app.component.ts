import { Component } from "@angular/core";
import { AuthenticationService, UserDetails } from "./authentication.service";
import { Router, NavigationEnd } from '@angular/router';
import { isBuffer } from "util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent{
  details:UserDetails;
  constructor(public auth: AuthenticationService, private router: Router) {
    
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
}
