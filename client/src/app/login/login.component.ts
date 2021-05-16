import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: "",
    password: ""
  };

  showPopup:boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/");
      },
      err => {
        console.error(err);
      }
    );
  }


  validateForm(){
    if(this.credentials.email.length > 0 && this.credentials.password.length > 0){
      this.login();
    }
    else{
      this.showPopup = true;
    }
  }
}
