import { Component, OnInit } from "@angular/core";
import { AuthenticationService, UserDetails } from "./authentication.service";
import { Router, NavigationEnd } from '@angular/router';
import * as Aos from "aos";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit{
  constructor(public auth: AuthenticationService, private router: Router) {}
  

  ngOnInit(): void {
    Aos.init();
   }
}


/*this.router.events.subscribe((event) => {
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
    });*/