import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { Router } from '@angular/router';
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


