import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: "",
    name: "",
    lastName: "",
    phone: "",
    password: ""
  };

  showPopup:boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }

  validateForm(){
    if(this.credentials.email.length > 0 && this.credentials.password.length > 0 && this.credentials.name.length > 0 && this.credentials.lastName.length > 0){
      this.register();
    }
    else{
      this.showPopup = true;
    }
  }
}
